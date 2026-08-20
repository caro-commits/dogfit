"use client";

import { useState } from "react";

export function VideoUrlField({
  videos,
  name = "video_url",
  defaultUrl = "",
  placeholder = "https://vimeo.com/... (ou choisissez une vidéo ci-dessus)",
}: {
  videos: { id: string; title: string; url: string }[];
  name?: string;
  defaultUrl?: string;
  placeholder?: string;
}) {
  const [url, setUrl] = useState(defaultUrl);

  return (
    <div className="space-y-2">
      {videos.length > 0 && (
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) setUrl(e.target.value);
          }}
          className="w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 text-sm focus:border-brand-turquoise focus:outline-none"
        >
          <option value="">Choisir une vidéo de la bibliothèque…</option>
          {videos.map((video) => (
            <option key={video.id} value={video.url}>
              {video.title}
            </option>
          ))}
        </select>
      )}
      <input
        id={name}
        name={name}
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = e.dataTransfer.getData("text/plain");
          if (dropped) setUrl(dropped);
        }}
        placeholder={placeholder}
        className="w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
      />
    </div>
  );
}
