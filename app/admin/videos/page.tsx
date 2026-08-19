import { getVideos } from "@/lib/data/admin";
import { VideoUpload } from "@/components/video-upload";
import { deleteVideo } from "./actions";

export const metadata = { title: "Admin — Vidéothèque" };

export default async function AdminVideosPage() {
  const videos = await getVideos();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">Vidéothèque</h1>
      <p className="mt-2 max-w-xl text-sm text-brand-brown/60">
        Envoyez une vidéo une seule fois ici, puis choisissez-la depuis la
        bibliothèque en créant une leçon dans n&apos;importe quel cours —
        plus besoin de la ré-envoyer pour chaque élève.
      </p>

      <div className="mt-8 divide-y divide-brand-brown/10 rounded-2xl bg-white shadow-sm ring-1 ring-brand-brown/5">
        {videos.length === 0 && (
          <p className="px-6 py-6 text-sm text-brand-brown/60">
            Aucune vidéo pour l&apos;instant.
          </p>
        )}
        {videos.map((video) => {
          const deleteAction = deleteVideo.bind(null, video.id, video.path);
          return (
            <div
              key={video.id}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div>
                <p className="font-semibold text-brand-brown">{video.title}</p>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand-turquoise-dark hover:underline"
                >
                  Voir la vidéo
                </a>
              </div>
              <form action={deleteAction}>
                <button className="text-xs font-medium text-red-600 hover:underline">
                  Supprimer
                </button>
              </form>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <VideoUpload />
      </div>
    </div>
  );
}
