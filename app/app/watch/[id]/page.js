"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useLanguage } from "../../LanguageContext";
import { useParams, useRouter } from "next/navigation";

const SUPABASE_URL = "https://vxskkaxvlgycokdtuocj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_EulroVhS18qjuuQ31ERKig_0memrNhJ";
const BYTEPLUS_LICENSE =
  process.env.NEXT_PUBLIC_BYTEPLUS_LICENSE ||
  "https://sf16-vod-license-multi.byteplusvod.com/obj/vod-license-sgcom/l-1122314769-ch-vod-a-1006938.lic";
const SUBTITLE_OFFSET_BOTTOM_PERCENT = 25;

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

const getSubtitleId = (sub, idx) =>
  String(sub?.id || sub?.language || sub?.text || idx);

const getSubtitleLabel = (sub, idx) => {
  const language = String(sub?.language || "").toLowerCase();

  if (language === "th") return "TH";
  if (language === "zh" || language === "cn") return "CN";
  if (language === "en") return "EN";
  if (language === "jp" || language === "ja") return "JP";

  return sub?.text || `Subtitle ${idx + 1}`;
};

const normalizeSubtitle = (sub, idx) => ({
  id: getSubtitleId(sub, idx),
  src: (sub.src || sub.url).trim(),
  text: getSubtitleLabel(sub, idx),
  language: sub.language || getSubtitleLabel(sub, idx).toLowerCase(),
  default: Boolean(sub.default || sub.isDefault) || idx === 0,
});

const disabledAdaptiveBitrateConfig = {
  enable: false,
  abr: false,
  showRealDefinition: false,
};

const isKnownVePlayerDevWarning = (value) => {
  const message =
    typeof value === "string"
      ? value
      : value?.message || value?.stack || String(value || "");

  return (
    message.includes("getPrivateDrmInfo is not a function") ||
    message.includes("Cannot read properties of undefined (reading 'abr')") ||
    message.includes('Cannot read properties of undefined (reading "abr")')
  );
};

function getLabels(language) {
  switch (language) {
    case "EN":
      return {
        loading: "Loading video",
        missing: "No video available",
        tokenError: "Unable to load video",
        back: "Back",
      };
    case "JP":
      return {
        loading: "動画を読み込み中",
        missing: "動画がありません",
        tokenError: "動画を読み込めません",
        back: "戻る",
      };
    case "CN":
      return {
        loading: "正在加载视频",
        missing: "暂无视频",
        tokenError: "无法加载视频",
        back: "返回",
      };
    default:
      return {
        loading: "กำลังโหลดวิดีโอ",
        missing: "ยังไม่มีวิดีโอ",
        tokenError: "ไม่สามารถโหลดวิดีโอได้",
        back: "ย้อนกลับ",
      };
  }
}

const VePlayerComponent = forwardRef(function VePlayerComponent(
  { vid, playAuthToken, playDomain, subtitles },
  ref,
) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const subtitlePluginRef = useRef(null);
  const pendingSubtitleRef = useRef(undefined);

  const resolveSubtitlePlugin = () => {
    if (subtitlePluginRef.current) return subtitlePluginRef.current;

    const player = playerRef.current;
    if (!player) return null;

    const plugin =
      player.getPlugin?.("Subtitle") ||
      player.getPlugin?.("subtitle") ||
      player.getPlugin?.("subTitle") ||
      Object.values(player.plugins || {}).find(
        (item) =>
          item &&
          typeof item === "object" &&
          (typeof item.switchSubTitle === "function" ||
            typeof item.switchOffSubtitle === "function"),
      ) ||
      null;

    subtitlePluginRef.current = plugin;
    return plugin;
  };

  const applySubtitle = (subtitle) => {
    const subtitlePlugin = resolveSubtitlePlugin();

    if (!subtitlePlugin) {
      pendingSubtitleRef.current = subtitle;
      return false;
    }

    if (!subtitle) {
      subtitlePlugin.switchOffSubtitle?.();
      subtitlePlugin.noShowSubtitle?.();
      return true;
    }

    const list =
      (typeof subtitlePlugin.getList === "function"
        ? subtitlePlugin.getList()
        : subtitlePlugin.curList || subtitlePlugin.list || []) || [];
    const pluginSubtitle = Array.isArray(list)
      ? list.find(
          (item) =>
            String(item?.id) === String(subtitle.id) ||
            String(item?.language) === String(subtitle.language),
        )
      : null;

    subtitlePlugin.openSubtitle?.();
    subtitlePlugin.switchSubTitle?.(pluginSubtitle || subtitle);
    return true;
  };

  useImperativeHandle(ref, () => ({
    switchSubtitle(subtitle) {
      applySubtitle(subtitle);
    },
  }));

  useEffect(() => {
    if (!containerRef.current || !vid || !playAuthToken) return;

    let cancelled = false;
    let restoreConsoleError = null;
    let removeDevErrorListeners = null;

    if (process.env.NODE_ENV === "development") {
      const originalConsoleError = console.error;

      const patchedConsoleError = (...args) => {
        if (args.some(isKnownVePlayerDevWarning)) return;

        originalConsoleError(...args);
      };

      console.error = patchedConsoleError;

      restoreConsoleError = () => {
        if (console.error !== patchedConsoleError) return;
        console.error = originalConsoleError;
      };

      const handleError = (event) => {
        if (
          isKnownVePlayerDevWarning(event.message) ||
          isKnownVePlayerDevWarning(event.error)
        ) {
          event.preventDefault();
        }
      };
      const handleUnhandledRejection = (event) => {
        if (isKnownVePlayerDevWarning(event.reason)) {
          event.preventDefault();
        }
      };

      window.addEventListener("error", handleError);
      window.addEventListener("unhandledrejection", handleUnhandledRejection);
      removeDevErrorListeners = () => {
        window.removeEventListener("error", handleError);
        window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      };
    }

    async function initPlayer() {
      try {
        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null;
        }

        containerRef.current.innerHTML = "";

        const VePlayerModule = await import("@byteplus/veplayer");
        const VePlayer = VePlayerModule.default || VePlayerModule;
        const playerId = `veplayer-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 9)}`;

        containerRef.current.id = playerId;

        if (BYTEPLUS_LICENSE && typeof VePlayer.setLicenseConfig === "function") {
          await VePlayer.setLicenseConfig({ license: BYTEPLUS_LICENSE });
        }

        if (cancelled) return;

        const normalizedSubtitles = Array.isArray(subtitles)
          ? subtitles
              .filter(
                (sub) =>
                  sub &&
                  typeof (sub.url || sub.src) === "string" &&
                  (sub.url || sub.src).trim().length > 0,
              )
              .map(normalizeSubtitle)
          : [];

        const playerConfig = {
          id: playerId,
          vid,
          getVideoByToken: {
            playAuthToken,
            ...(playDomain ? { playDomain } : {}),
          },
          lang: "en",
          width: "100%",
          height: "100%",
          license: BYTEPLUS_LICENSE,
          disableVodLogOptsCheck: true,
          autoBitrateOpts: disabledAdaptiveBitrateConfig,
          adaptRange: {
            enable: false,
          },
          DASHPlugin: {
            abr: false,
            autoBitrateOpts: disabledAdaptiveBitrateConfig,
            adaptRange: {
              enable: false,
            },
          },
          HLSPlugin: {
            abr: false,
            autoBitrateOpts: disabledAdaptiveBitrateConfig,
          },
          Mp4EncryptPlayer: {
            abr: false,
            autoBitrateOpts: disabledAdaptiveBitrateConfig,
          },
          autoplay: true,
          enableMenu: true,
          controls: true,
          controlBar: {
            visible: true,
          },
        };

        if (normalizedSubtitles.length > 0 && VePlayer.Subtitle) {
          playerConfig.plugins = [VePlayer.Subtitle];
          playerConfig.Subtitle = {
            isDefaultOpen: true,
            list: normalizedSubtitles,
            style: {
              offsetBottom: SUBTITLE_OFFSET_BOTTOM_PERCENT,
            },
          };
        }

        playerRef.current = new VePlayer(playerConfig);
        subtitlePluginRef.current = null;
      } catch (error) {
        console.error("Failed to initialize BytePlus player:", error);
      }
    }

    initPlayer();

    return () => {
      cancelled = true;

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      subtitlePluginRef.current = null;
      removeDevErrorListeners?.();
      restoreConsoleError?.();
    };
  }, [vid, playAuthToken, playDomain, subtitles]);

  return (
    <div
      ref={containerRef}
      className="veplayer-raised-subtitle h-full w-full bg-black"
    />
  );
});

export default function WatchPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const params = useParams();
  const labels = getLabels(language);
  const seriesId = params?.id;

  const [episode, setEpisode] = useState(null);
  const [playAuthToken, setPlayAuthToken] = useState("");
  const [playDomain, setPlayDomain] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!seriesId) return;

    async function fetchPlayerData() {
      setLoading(true);
      setError("");

      try {
        const episodeResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/episode?select=id,series_id,episode_no,video_url&series_id=eq.${encodeURIComponent(seriesId)}&order=episode_no.asc&limit=1`,
          { headers },
        );
        const episodeData = await episodeResponse.json();
        const firstEpisode = episodeData?.[0] || null;
        const vid = firstEpisode?.video_url?.trim();

        setEpisode(firstEpisode);

        if (!vid) {
          setError(labels.missing);
          return;
        }

        const playAuthResponse = await fetch(
          `/api/vod/playauth?vid=${encodeURIComponent(vid)}`,
        );
        const playAuthData = await playAuthResponse.json();

        if (!playAuthResponse.ok || !playAuthData.playAuthToken) {
          setError(playAuthData.error || labels.tokenError);
          return;
        }

        setPlayAuthToken(playAuthData.playAuthToken);
        setPlayDomain(playAuthData.playDomain || "");
        setSubtitles(Array.isArray(playAuthData.subtitles) ? playAuthData.subtitles : []);
      } catch (err) {
        console.error("Failed to load player data:", err);
        setError(labels.tokenError);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerData();
  }, [seriesId, labels.missing, labels.tokenError]);

  const showPlayer = episode?.video_url && playAuthToken && !error;

  return (
    <div
      className="fixed inset-0 z-[100] flex bg-black text-white"
      onContextMenu={(event) => event.preventDefault()}
    >
      <button
        type="button"
        onClick={() => router.back()}
        aria-label={labels.back}
        className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {loading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#BF8EFF] border-t-transparent" />
          <p className="text-sm text-white/60">{labels.loading}</p>
        </div>
      ) : showPlayer ? (
        <VePlayerComponent
          vid={episode.video_url.trim()}
          playAuthToken={playAuthToken}
          playDomain={playDomain}
          subtitles={subtitles}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="text-lg font-bold">{error || labels.missing}</p>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full bg-[#7B1ED6] px-6 py-2.5 text-sm font-bold text-white"
          >
            {labels.back}
          </button>
        </div>
      )}
    </div>
  );
}
