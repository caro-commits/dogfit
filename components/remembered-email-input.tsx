"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "dogfit-remembered-email";

export function RememberedEmailInput() {
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setEmail(saved);
  }, []);

  function handleEmailChange(value: string) {
    setEmail(value);
    if (remember) window.localStorage.setItem(STORAGE_KEY, value);
  }

  function handleRememberChange(checked: boolean) {
    setRemember(checked);
    if (checked) {
      window.localStorage.setItem(STORAGE_KEY, email);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <>
      <div>
        <label htmlFor="email" className="text-sm font-semibold text-brand-brown">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-brand-brown/20 px-4 py-2.5 focus:border-brand-turquoise focus:outline-none"
        />
      </div>
      <label className="flex items-center gap-2 text-sm text-brand-brown">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => handleRememberChange(e.target.checked)}
          className="rounded"
        />
        Se souvenir de mon email
      </label>
    </>
  );
}
