function toEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtube.com") || parsed.hostname.includes("youtu.be")) {
      const id = parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function VideoEmbed({ url }: { url: string }) {
  const embedUrl = toEmbedUrl(url);

  if (!embedUrl) {
    // Pas YouTube/Vimeo : probablement une vidéo envoyée directement
    // (bibliothèque DOGFIT) — on la lit nativement.
    return (
      <video
        controls
        preload="metadata"
        className="aspect-video w-full rounded-xl bg-black"
      >
        <source src={url} />
        <a href={url} target="_blank" rel="noreferrer" className="text-brand-turquoise-dark underline">
          Voir la vidéo
        </a>
      </video>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <iframe
        src={embedUrl}
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
