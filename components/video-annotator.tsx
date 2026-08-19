"use client";

import { useEffect, useId, useRef, useState } from "react";

type Annotation = { id: string; timestamp_seconds: number; comment: string };

declare global {
  interface Window {
    YT?: {
      Player: new (elementId: string, options: Record<string, unknown>) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
    Vimeo?: { Player: new (elementId: string, options: Record<string, unknown>) => VimeoPlayer };
  }
}

type YTPlayer = {
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  playVideo: () => void;
};

type VimeoPlayer = {
  getCurrentTime: () => Promise<number>;
  setCurrentTime: (seconds: number) => Promise<number>;
  play: () => Promise<void>;
};

export function isVideoUrl(url: string) {
  return /\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i.test(url);
}

function getYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1) || null;
    if (parsed.hostname.includes("youtube.com")) return parsed.searchParams.get("v");
  } catch {
    // ignore
  }
  return null;
}

function getVimeoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("vimeo.com")) {
      return parsed.pathname.split("/").filter(Boolean)[0] || null;
    }
  } catch {
    // ignore
  }
  return null;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function loadScriptOnce(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  document.body.appendChild(script);
}

export function VideoAnnotator({
  url,
  annotations,
  canEdit,
  addAction,
  deleteAction,
}: {
  url: string;
  annotations: Annotation[];
  canEdit: boolean;
  addAction?: (formData: FormData) => void;
  deleteAction?: (annotationId: string) => void;
}) {
  const containerId = `player-${useId().replace(/[:]/g, "")}`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytPlayerRef = useRef<YTPlayer | null>(null);
  const vimeoPlayerRef = useRef<VimeoPlayer | null>(null);
  const [comment, setComment] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  const youTubeId = getYouTubeId(url);
  const vimeoId = !youTubeId ? getVimeoId(url) : null;
  const kind = isVideoUrl(url) ? "file" : youTubeId ? "youtube" : vimeoId ? "vimeo" : "other";

  // YouTube : charge l'API IFrame et instancie le lecteur
  useEffect(() => {
    if (kind !== "youtube" || !youTubeId) return;
    let interval: ReturnType<typeof setInterval> | undefined;

    function createPlayer() {
      ytPlayerRef.current = new window.YT!.Player(containerId, {
        videoId: youTubeId,
        events: {
          onReady: () => {
            interval = setInterval(() => {
              if (ytPlayerRef.current) {
                setCurrentTime(ytPlayerRef.current.getCurrentTime());
              }
            }, 500);
          },
        },
      });
    }

    if (window.YT?.Player) {
      createPlayer();
    } else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        createPlayer();
      };
      loadScriptOnce("https://www.youtube.com/iframe_api", "youtube-iframe-api");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [kind, youTubeId, containerId]);

  // Vimeo : charge le SDK et instancie le lecteur
  useEffect(() => {
    if (kind !== "vimeo" || !vimeoId) return;
    let interval: ReturnType<typeof setInterval> | undefined;

    function createPlayer() {
      const player = new window.Vimeo!.Player(containerId, { id: Number(vimeoId) });
      vimeoPlayerRef.current = player;
      interval = setInterval(() => {
        player.getCurrentTime().then(setCurrentTime).catch(() => {});
      }, 500);
    }

    if (window.Vimeo?.Player) {
      createPlayer();
    } else {
      const script = document.createElement("script");
      script.src = "https://player.vimeo.com/api/player.js";
      script.onload = createPlayer;
      document.body.appendChild(script);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [kind, vimeoId, containerId]);

  function seekTo(seconds: number) {
    if (kind === "file" && videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    } else if (kind === "youtube" && ytPlayerRef.current) {
      ytPlayerRef.current.seekTo(seconds, true);
      ytPlayerRef.current.playVideo();
    } else if (kind === "vimeo" && vimeoPlayerRef.current) {
      vimeoPlayerRef.current.setCurrentTime(seconds).then(() => vimeoPlayerRef.current?.play());
    }
  }

  return (
    <div>
      {kind === "file" && (
        <video
          ref={videoRef}
          controls
          preload="metadata"
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
          className="aspect-video w-full rounded-xl bg-black"
        >
          <source src={url} />
        </video>
      )}
      {(kind === "youtube" || kind === "vimeo") && (
        <div id={containerId} className="aspect-video w-full overflow-hidden rounded-xl bg-black" />
      )}
      {kind === "other" && (
        <a href={url} target="_blank" rel="noreferrer" className="font-semibold text-brand-turquoise-dark underline">
          Voir la vidéo
        </a>
      )}

      {canEdit && addAction && kind !== "other" && (
        <form
          action={(formData) => {
            addAction(formData);
            setComment("");
          }}
          className="mt-4 flex items-end gap-3"
        >
          <input type="hidden" name="timestamp_seconds" value={currentTime} />
          <div className="flex-1">
            <label className="text-xs font-semibold text-brand-brown/70">
              Note à {formatTime(currentTime)}
            </label>
            <input
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Ce que vous observez à cet instant..."
              className="mt-1 w-full rounded-lg border border-brand-brown/20 px-3 py-2 text-sm focus:border-brand-turquoise focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-full bg-brand-turquoise px-4 py-2 text-xs font-semibold text-white hover:bg-brand-turquoise-dark"
          >
            Ajouter
          </button>
        </form>
      )}

      {annotations.length > 0 && (
        <ul className="mt-4 space-y-2">
          {annotations.map((a) => (
            <li
              key={a.id}
              className="flex items-start justify-between gap-3 rounded-lg bg-brand-cream-dark px-3 py-2 text-sm"
            >
              <button type="button" onClick={() => seekTo(a.timestamp_seconds)} className="text-left">
                <span className="font-semibold text-brand-turquoise-dark">
                  {formatTime(a.timestamp_seconds)}
                </span>{" "}
                <span className="text-brand-brown/80">{a.comment}</span>
              </button>
              {canEdit && deleteAction && (
                <button
                  type="button"
                  onClick={() => deleteAction(a.id)}
                  className="shrink-0 text-xs text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
