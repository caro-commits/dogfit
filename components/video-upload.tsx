"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/button";

export function VideoUpload() {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileSizeLabel, setFileSizeLabel] = useState("");

  const SIZE_LIMIT_MB = 50;

  function handleFileChange() {
    const file = fileInput.current?.files?.[0];
    if (!file) {
      setFileSizeLabel("");
      return;
    }
    const sizeMb = file.size / (1024 * 1024);
    setFileSizeLabel(
      sizeMb > SIZE_LIMIT_MB
        ? `${sizeMb.toFixed(0)} Mo — dépasse la limite de ${SIZE_LIMIT_MB} Mo, l'envoi échouera. Compressez la vidéo avant de réessayer.`
        : `${sizeMb.toFixed(0)} Mo`
    );
  }

  async function handleUpload() {
    const file = fileInput.current?.files?.[0];
    if (!file || !title.trim()) {
      setStatus("error");
      setErrorMessage("Merci de donner un titre et de choisir un fichier vidéo.");
      return;
    }

    if (file.size > SIZE_LIMIT_MB * 1024 * 1024) {
      setStatus("error");
      setErrorMessage(
        `Cette vidéo fait ${(file.size / (1024 * 1024)).toFixed(0)} Mo, ce qui dépasse la limite de ${SIZE_LIMIT_MB} Mo. Compressez-la (résolution ou durée plus faible) avant de réessayer.`
      );
      return;
    }

    setStatus("uploading");
    setErrorMessage("");

    const supabase = createClient();
    const path = `library/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("course-files")
      .upload(path, file);

    if (uploadError) {
      setStatus("error");
      setErrorMessage(
        /size|large|payload/i.test(uploadError.message)
          ? `Cette vidéo est trop volumineuse pour être envoyée (limite actuelle : ${SIZE_LIMIT_MB} Mo). Compressez-la avant de réessayer.`
          : "Échec de l'envoi : " + uploadError.message
      );
      return;
    }

    const { data: publicUrl } = supabase.storage.from("course-files").getPublicUrl(path);

    const { error: insertError } = await supabase.from("videos").insert({
      title: title.trim(),
      url: publicUrl.publicUrl,
      path,
    });

    if (insertError) {
      setStatus("error");
      setErrorMessage("Vidéo envoyée, mais échec de l'enregistrement : " + insertError.message);
      return;
    }

    setStatus("idle");
    setTitle("");
    if (fileInput.current) fileInput.current.value = "";
    router.refresh();
  }

  return (
    <div className="max-w-xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
      <h2 className="text-base font-bold text-brand-brown">Ajouter une vidéo</h2>
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="video-title" className="text-sm font-semibold text-brand-brown">
            Titre
          </label>
          <input
            id="video-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="video-file" className="text-sm font-semibold text-brand-brown">
            Fichier vidéo
          </label>
          <input
            id="video-file"
            ref={fileInput}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm"
          />
          {fileSizeLabel && (
            <p
              className={`mt-1 text-xs ${
                fileSizeLabel.includes("dépasse") ? "text-red-700" : "text-brand-brown/50"
              }`}
            >
              {fileSizeLabel}
            </p>
          )}
        </div>
        {status === "error" && (
          <p className="text-sm text-red-700">{errorMessage}</p>
        )}
        <Button
          type="button"
          onClick={handleUpload}
          disabled={status === "uploading"}
        >
          {status === "uploading" ? "Envoi en cours..." : "Envoyer la vidéo"}
        </Button>
        <p className="text-xs text-brand-brown/50">
          L&apos;envoi se fait directement depuis votre ordinateur — pas
          besoin de passer par YouTube ou Vimeo. Taille maximale :{" "}
          {SIZE_LIMIT_MB} Mo par vidéo. Selon la taille du fichier et votre
          connexion, l&apos;envoi peut prendre quelques minutes.
        </p>
      </div>
    </div>
  );
}
