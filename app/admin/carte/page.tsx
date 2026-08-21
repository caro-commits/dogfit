import { getMapPins } from "@/lib/data/public-content";
import { AdminAddPinForm } from "@/components/admin-add-pin-form";
import { addMapPin, deleteMapPin } from "./actions";

export const metadata = { title: "Admin — Carte" };

export default async function AdminCartePage() {
  const pins = await getMapPins();

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-brand-brown">
        Carte des déplacements
      </h1>
      <p className="mt-1 text-sm text-brand-brown/60">
        Ces points s&apos;affichent sur la carte de la page Prestations,
        section Stages.
      </p>

      <div className="mt-8 max-w-2xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-brand-brown/5">
        <h2 className="text-base font-bold text-brand-brown">
          Ajouter un point
        </h2>
        <div className="mt-4">
          <AdminAddPinForm addMapPin={addMapPin} />
        </div>
      </div>

      <div className="mt-8 max-w-2xl space-y-3">
        {pins.length === 0 ? (
          <p className="text-sm text-brand-brown/60">
            Aucun point pour l&apos;instant.
          </p>
        ) : (
          pins.map((pin) => {
            const removeAction = deleteMapPin.bind(null, pin.id);
            return (
              <div
                key={pin.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-brown/5"
              >
                <span className="text-sm font-semibold text-brand-brown">
                  {pin.label}
                </span>
                <form action={removeAction}>
                  <button className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-100">
                    Retirer
                  </button>
                </form>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
