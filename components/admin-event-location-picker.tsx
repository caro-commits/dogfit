"use client";

import { useState } from "react";
import { AdminMapPicker } from "@/components/admin-map-picker";

export function AdminEventLocationPicker({
  defaultLatitude,
  defaultLongitude,
}: {
  defaultLatitude?: number | null;
  defaultLongitude?: number | null;
}) {
  const initial =
    defaultLatitude != null && defaultLongitude != null
      ? ({ lat: defaultLatitude, lng: defaultLongitude } as const)
      : null;
  const [position, setPosition] = useState(initial);

  return (
    <div>
      <p className="text-sm font-semibold text-brand-brown">
        Lieu sur la carte{" "}
        <span className="font-normal text-brand-brown/50">(optionnel)</span>
      </p>
      <p className="mt-1 text-xs text-brand-brown/60">
        Clique sur la carte pour indiquer le lieu du stage.
      </p>
      <div className="mt-2">
        <AdminMapPicker
          onPick={(lat, lng) => setPosition({ lat, lng })}
          initialPosition={initial ? [initial.lat, initial.lng] : undefined}
        />
      </div>
      <input type="hidden" name="latitude" value={position?.lat ?? ""} />
      <input type="hidden" name="longitude" value={position?.lng ?? ""} />
    </div>
  );
}
