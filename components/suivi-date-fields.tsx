"use client";

import { useState } from "react";

function addDays(dateStr: string, days: number) {
  const date = new Date(dateStr + "T00:00:00");
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function SuiviDateFields({
  defaultStartDate = "",
  defaultEndDate = "",
  defaultPaid = false,
}: {
  defaultStartDate?: string;
  defaultEndDate?: string;
  defaultPaid?: boolean;
}) {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [endTouched, setEndTouched] = useState(Boolean(defaultEndDate));

  function handleStartChange(value: string) {
    setStartDate(value);
    if (!endTouched && value) {
      setEndDate(addDays(value, 31));
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="start_date" className="text-sm font-semibold text-brand-brown">
          Début du suivi
        </label>
        <input
          id="start_date"
          name="start_date"
          type="date"
          value={startDate}
          onChange={(e) => handleStartChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="end_date" className="text-sm font-semibold text-brand-brown">
          Fin du suivi{" "}
          <span className="font-normal text-brand-brown/50">(31 jours, ajustable)</span>
        </label>
        <input
          id="end_date"
          name="end_date"
          type="date"
          value={endDate}
          onChange={(e) => {
            setEndTouched(true);
            setEndDate(e.target.value);
          }}
          className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-brand-brown sm:col-span-2">
        <input type="checkbox" name="paid" defaultChecked={defaultPaid} className="rounded" />
        Suivi payé
      </label>
    </div>
  );
}
