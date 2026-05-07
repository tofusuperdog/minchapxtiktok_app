import { NextResponse } from "next/server";
import vod from "@byteplus/vcloud-sdk-nodejs";

export const runtime = "nodejs";

const vodService = vod.vodOpenapi.defaultService;

function getSubtitleProxyUrl(subtitleUrl) {
  return `/api/vod/subtitle?url=${encodeURIComponent(subtitleUrl)}`;
}

function getSubtitleLabel(sub, idx) {
  const languageId = Number(sub.LanguageId);

  if (languageId === 30) return "Thai";
  if (languageId === 1) return "Chinese";

  return sub.Language || sub.Title || sub.Tag || `Subtitle ${idx + 1}`;
}

function getSubtitleLanguage(sub) {
  const languageId = Number(sub.LanguageId);

  if (languageId === 30) return "th";
  if (languageId === 1) return "zh";

  return String(sub.Language || sub.LanguageId || "");
}

function dedupeSubtitles(subtitleList) {
  const seen = new Set();

  return subtitleList.filter((sub) => {
    const key = [
      sub.SubtitleId || "",
      sub.SubtitleUrl ||
        sub.Url ||
        sub.MainUrl ||
        sub.BackupUrl ||
        sub.FileUrl ||
        "",
      sub.LanguageId || sub.Language || "",
    ].join("|");

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}

function getSubtitleListForVid(subtitleRes, vid) {
  const directSubtitleList =
    subtitleRes?.Result?.SubtitleInfoList ||
    subtitleRes?.Result?.SubtitleInfoListForVid ||
    subtitleRes?.SubtitleInfoList;

  if (Array.isArray(directSubtitleList) && directSubtitleList.length > 0) {
    return directSubtitleList;
  }

  const fileSubtitleInfoList = subtitleRes?.Result?.FileSubtitleInfoList || [];
  const matchingFileSubtitleInfo = fileSubtitleInfoList.find(
    (fileSubtitleInfo) => fileSubtitleInfo?.FileId === vid,
  );

  if (matchingFileSubtitleInfo?.SubtitleInfoList?.length > 0) {
    return matchingFileSubtitleInfo.SubtitleInfoList;
  }

  return fileSubtitleInfoList.flatMap(
    (fileSubtitleInfo) => fileSubtitleInfo?.SubtitleInfoList || [],
  );
}

function normalizePlaybackSources(playInfoRes) {
  const playbackInfoList =
    playInfoRes?.Result?.PlayInfoList ||
    playInfoRes?.Result?.PlayInfoListForVid ||
    playInfoRes?.PlayInfoList ||
    [];

  return playbackInfoList
    .map((item) => {
      const url =
        item?.Url || item?.PlayUrl || item?.PlayURL || item?.PlayUri || "";
      return {
        url: String(url).trim(),
        isHls:
          String(item?.Definition || item?.Format || item?.Type || "")
            .toLowerCase()
            .includes("hls") || /\.m3u8(\?|$)/i.test(String(url)),
        isMp4:
          String(item?.Definition || item?.Format || item?.Type || "")
            .toLowerCase()
            .includes("mp4") || /\.mp4(\?|$)/i.test(String(url)),
        isWebm:
          String(item?.Definition || item?.Format || item?.Type || "")
            .toLowerCase()
            .includes("webm") || /\.webm(\?|$)/i.test(String(url)),
      };
    })
    .filter((item) => item.url);
}

function pickPreferredPlaybackSource(playbackSources, userAgent = "") {
  const sources = Array.isArray(playbackSources) ? playbackSources : [];
  const isIOS = /iPad|iPhone|iPod/i.test(userAgent);

  if (isIOS) {
    return sources.find((source) => source.isHls) || sources[0] || null;
  }

  return sources.find((source) => source.isMp4) || sources[0] || null;
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const vid = (searchParams.get("vid") || "").trim();
  const userAgent = request.headers.get("user-agent") || "";

  if (!vid) {
    return NextResponse.json(
      { error: "Missing vid parameter" },
      { status: 400 },
    );
  }

  const accessKeyId =
    process.env.BYTEPLUS_ACCESS_KEY_ID || process.env.AccessKeyId;
  const secretAccessKey =
    process.env.BYTEPLUS_SECRET_ACCESS_KEY || process.env.SecretAccessKey;
  const spaceName =
    process.env.BYTEPLUS_VOD_SPACE_NAME ||
    process.env.VOD_SPACE_NAME ||
    "minchapxtiktok";

  if (!accessKeyId || !secretAccessKey) {
    return NextResponse.json(
      { error: "BytePlus credentials are not configured" },
      { status: 500 },
    );
  }

  vodService.setAccessKeyId(accessKeyId);
  vodService.setSecretKey(secretAccessKey);

  try {
    const baseParams = {
      Vid: vid,
      ...(spaceName ? { SpaceName: spaceName } : {}),
    };

    const playAuthToken = vodService.GetPlayAuthToken(baseParams, 3600);
    let subtitles = [];
    let playbackSources = [];
    let preferredSource = null;

    try {
      const playInfoRes = await vodService.GetPlayInfo(baseParams);
      playbackSources = normalizePlaybackSources(playInfoRes);
      preferredSource = pickPreferredPlaybackSource(playbackSources, userAgent);
    } catch (playInfoError) {
      console.error("Error fetching play info from BytePlus:", playInfoError);
    }

    try {
      const subtitleRes = await vodService.GetSubtitleInfoList({
        ...baseParams,
        Ssl: "1",
      });
      const subtitleList = getSubtitleListForVid(subtitleRes, vid);

      subtitles = dedupeSubtitles(subtitleList)
        .filter((sub) => {
          const status = String(sub.Status || "").toLowerCase();

          if (!status) return true;

          return (
            status === "enable" ||
            status === "enabled" ||
            status === "published"
          );
        })
        .map((sub, idx) => {
          const subtitleUrl =
            sub.SubtitleUrl ||
            sub.Url ||
            sub.MainUrl ||
            sub.BackupUrl ||
            sub.FileUrl ||
            "";
          const proxiedSubtitleUrl = getSubtitleProxyUrl(subtitleUrl);

          return {
            id: String(idx),
            url: proxiedSubtitleUrl,
            src: proxiedSubtitleUrl,
            text: getSubtitleLabel(sub, idx),
            language: getSubtitleLanguage(sub),
            format: "webvtt",
            isDefault: idx === 0,
            default: idx === 0,
          };
        })
        .filter((sub) => Boolean(sub.src && sub.src.trim()));
    } catch (subError) {
      console.error("Error fetching subtitles from BytePlus:", subError);
    }

    return NextResponse.json({
      playAuthToken,
      playDomain: "",
      subtitles,
      playbackSources,
      preferredPlaybackSource: preferredSource?.url || "",
    });
  } catch (error) {
    console.error("Error generating play auth token:", error);

    return NextResponse.json(
      { error: "Failed to generate play auth token" },
      { status: 500 },
    );
  }
}
