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

const IOS_COMPATIBLE_PLAYBACK_CANDIDATES = [
  { FileType: "video", Format: "hls", Codec: "H264", Ssl: "1" },
  { FileType: "video", Format: "mp4", Codec: "H264", Ssl: "1" },
];
const DEFAULT_PLAYBACK_PARAMS = { FileType: "video", Format: "webm", Ssl: "1" };
const DEFAULT_PLAYBACK_CANDIDATES = [
  { FileType: "video", Format: "webm", Ssl: "1" },
  { FileType: "video", Format: "WEBM", Ssl: "1" },
];

function getPlayInfoList(playInfoRes) {
  const playInfoList =
    playInfoRes?.Result?.PlayInfoList || playInfoRes?.PlayInfoList || [];

  return Array.isArray(playInfoList) ? playInfoList : [];
}

function getPlaybackUrl(playInfo) {
  return (
    playInfo?.MainPlayUrl ||
    playInfo?.BackupPlayUrl ||
    playInfo?.Url ||
    playInfo?.PlayUrl ||
    playInfo?.PlayURL ||
    playInfo?.PlayUri ||
    ""
  );
}

async function resolveIOSPlayback(baseParams) {
  for (const candidate of IOS_COMPATIBLE_PLAYBACK_CANDIDATES) {
    try {
      const playInfoRes = await vodService.GetPlayInfo({
        ...baseParams,
        ...candidate,
      });
      const playInfoList = getPlayInfoList(playInfoRes);

      if (playInfoList.length > 0) {
        const selectedPlayInfo = playInfoList[0] || {};
        const playbackUrl = getPlaybackUrl(selectedPlayInfo);

        return {
          params: { ...baseParams, ...candidate },
          playbackUrl,
          streamType: String(candidate.Format || "").toLowerCase(),
          source: {
            requestedFormat: candidate.Format,
            requestedCodec: candidate.Codec,
            selectedFormat: selectedPlayInfo?.Format || "",
            selectedCodec: selectedPlayInfo?.Codec || "",
            selectedDefinition: selectedPlayInfo?.Definition || "",
            availableCount: playInfoList.length,
          },
        };
      }
    } catch (error) {
      console.error("Error resolving BytePlus playback candidate:", {
        vid: baseParams.Vid,
        format: candidate.Format,
        codec: candidate.Codec,
        error,
      });
    }
  }

  return {
    params: {
      ...baseParams,
      ...IOS_COMPATIBLE_PLAYBACK_CANDIDATES[0],
    },
    playbackUrl: "",
    streamType: "hls",
    source: {
      requestedFormat: IOS_COMPATIBLE_PLAYBACK_CANDIDATES[0].Format,
      requestedCodec: IOS_COMPATIBLE_PLAYBACK_CANDIDATES[0].Codec,
      selectedFormat: "",
      selectedCodec: "",
      selectedDefinition: "",
      availableCount: 0,
    },
  };
}

async function resolveDefaultPlayback(baseParams) {
  for (const candidate of DEFAULT_PLAYBACK_CANDIDATES) {
    try {
      const playInfoRes = await vodService.GetPlayInfo({
        ...baseParams,
        ...candidate,
      });

      const playInfoList = getPlayInfoList(playInfoRes);

      if (playInfoList.length > 0) {
        const selectedPlayInfo = playInfoList[0] || {};
        const playbackUrl = getPlaybackUrl(selectedPlayInfo);

        return {
          params: { ...baseParams, ...candidate },
          playbackUrl,
          streamType: "webm",
          source: {
            requestedFormat: candidate.Format,
            requestedCodec: candidate.Codec || "",
            selectedFormat: selectedPlayInfo?.Format || "",
            selectedCodec: selectedPlayInfo?.Codec || "",
            selectedDefinition: selectedPlayInfo?.Definition || "",
            availableCount: playInfoList.length,
          },
        };
      }
    } catch (error) {
      console.error("Error resolving BytePlus default playback candidate:", {
        vid: baseParams.Vid,
        format: candidate.Format,
        error,
      });
    }
  }

  return {
    params: { ...baseParams, ...DEFAULT_PLAYBACK_PARAMS },
    playbackUrl: "",
    streamType: "webm",
    source: {
      requestedFormat: DEFAULT_PLAYBACK_PARAMS.Format,
      requestedCodec: "",
      selectedFormat: "",
      selectedCodec: "",
      selectedDefinition: "",
      availableCount: 0,
    },
  };
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const vid = (searchParams.get("vid") || "").trim();
  const platform = (searchParams.get("platform") || "").trim().toLowerCase();

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

    let subtitles = [];
    const shouldUseIOSPlayback = platform === "ios";
    const defaultPlayback = shouldUseIOSPlayback
      ? null
      : await resolveDefaultPlayback(baseParams);
    const defaultPlaybackParams = shouldUseIOSPlayback
      ? baseParams
      : defaultPlayback.params;
    const playAuthToken = vodService.GetPlayAuthToken(
      defaultPlaybackParams,
      3600,
    );
    const iosPlayback = shouldUseIOSPlayback
      ? await resolveIOSPlayback(baseParams)
      : null;
    const iosPlayAuthToken = iosPlayback
      ? vodService.GetPlayAuthToken(iosPlayback.params, 3600)
      : "";

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
      ...(shouldUseIOSPlayback
        ? {
            iosPlayAuthToken,
            iosPlaybackSource: iosPlayback.source,
            iosPlaybackUrl: iosPlayback.playbackUrl,
            iosPlaybackStreamType: iosPlayback.streamType,
            preferredPlaybackSource: iosPlayback.playbackUrl,
            preferredPlaybackStreamType: iosPlayback.streamType,
          }
        : {
            defaultPlaybackSource: defaultPlayback.source,
            preferredPlaybackSource: defaultPlayback.playbackUrl,
            preferredPlaybackStreamType: defaultPlayback.streamType,
          }),
      playDomain: process.env.BYTEPLUS_VOD_PLAY_DOMAIN || "",
      subtitles,
    });
  } catch (error) {
    console.error("Error generating play auth token:", error);

    return NextResponse.json(
      { error: "Failed to generate play auth token" },
      { status: 500 },
    );
  }
}
