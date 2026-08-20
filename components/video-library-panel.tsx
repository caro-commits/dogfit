"use client";

export function VideoLibraryPanel({
  videos,
}: {
  videos: { id: string; title: string; url: string }[];
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
      <h2 className="text-base font-bold text-brand-brown">Vidéothèque</h2>
      <p className="mt-1 text-xs text-brand-brown/50">
        Glissez une vidéo directement sur le champ « Vidéo de démonstration ».
      </p>
      {videos.length === 0 ? (
        <p className="mt-4 text-sm text-brand-brown/60">
          Aucune vidéo pour l&apos;instant.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {videos.map((video) => (
            <li
              key={video.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", video.url);
                e.dataTransfer.effectAllowed = "copy";
              }}
              className="cursor-grab rounded-lg bg-brand-cream-dark px-3 py-2 text-sm font-medium text-brand-brown active:cursor-grabbing"
              title="Glisser vers le champ vidéo"
            >
              🎬 {video.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
