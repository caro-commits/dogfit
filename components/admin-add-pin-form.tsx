"use client";

import { useState } from "react";
import { AdminMapPicker } from "@/components/admin-map-picker";
import { Button } from "@/components/button";

export function AdminAddPinForm({
  addMapPin,
}: {
  addMapPin: (formData: FormData) => void;
}) {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  return (
    <form action={addMapPin} className="space-y-4">
      <p className="text-xs text-brand-brown/60">
        Clique sur la carte à l&apos;endroit du stage pour placer un point.
      </p>
      <AdminMapPicker onPick={(lat, lng) => setPosition({ lat, lng })} />
      <input type="hidden" name="latitude" value={position?.lat ?? ""} />
      <input type="hidden" name="longitude" value={position?.lng ?? ""} />
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="label" className="text-xs font-semibold text-brand-brown/70">
            Nom du lieu
          </label>
          <input
            id="label"
            name="label"
            required
            placeholder="Ex : Stage à Rouen"
            className="mt-1 block rounded-lg border border-brand-brown/20 px-3 py-2 text-sm focus:border-brand-turquoise focus:outline-none"
          />
        </div>
        <Button type="submit" className="text-xs" disabled={!position}>
          Ajouter le point
        </Button>
      </div>
      {!position && (
        <p className="text-xs text-brand-brown/50">
          Sélectionne d&apos;abord un point sur la carte.
        </p>
      )}
    </form>
  );
}
