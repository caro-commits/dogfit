"use client";

import { useRef, useState } from "react";

type Annotation = { id: string; timestamp_seconds: number; comment: string };

export function isVideoUrl(url: string) {
  return /\.(mp4|mov|webm|m4v|avi|mkv)(\?|$)/i.test(url);
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [comment, setComment] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  function seekTo(seconds: number) {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  }

  return (
    <div>
      <video
        ref={videoRef}
        controls
        preload="metadata"
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
        className="aspect-video w-full rounded-xl bg-black"
      >
        <source src={url} />
      </video>

      {canEdit && addAction && (
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
