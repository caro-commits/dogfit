"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

const NOTRE_DAME_DE_COURSON: [number, number] = [48.96, 0.2];
const RADIUS_METERS = 250_000; // ~3h de route

const MARKER_ICON_OPTIONS = {
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
};

type Pin = { id: string; label: string; latitude: number; longitude: number };

export function TravelMap({ pins }: { pins: Pin[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
        ._getIconUrl;
      L.Icon.Default.mergeOptions(MARKER_ICON_OPTIONS);

      const map = L.map(containerRef.current, { scrollWheelZoom: false }).setView(
        NOTRE_DAME_DE_COURSON,
        6,
      );
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      L.circle(NOTRE_DAME_DE_COURSON, {
        radius: RADIUS_METERS,
        color: "#cd5f15",
        fillColor: "#cd5f15",
        fillOpacity: 0.08,
        weight: 1.5,
      }).addTo(map);

      L.marker(NOTRE_DAME_DE_COURSON)
        .addTo(map)
        .bindPopup("Marie — Notre-Dame-de-Courson (base)");

      pins.forEach((pin) => {
        L.marker([pin.latitude, pin.longitude]).addTo(map).bindPopup(pin.label);
      });
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pins]);

  return (
    <div
      ref={containerRef}
      className="h-96 w-full overflow-hidden rounded-2xl shadow-sm"
    />
  );
}
