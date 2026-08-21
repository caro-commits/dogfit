"use client";

import { useEffect, useState } from "react";
import { PasswordInput } from "@/components/password-input";

const STORAGE_KEY = "dogfit-remembered-password";

export function RememberedPasswordInput({
  id,
  name,
  required,
}: {
  id: string;
  name: string;
  required?: boolean;
}) {
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) setPassword(saved);
  }, []);

  function handlePasswordChange(value: string) {
    setPassword(value);
    if (remember) window.localStorage.setItem(STORAGE_KEY, value);
  }

  function handleRememberChange(checked: boolean) {
    setRemember(checked);
    if (checked) {
      window.localStorage.setItem(STORAGE_KEY, password);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <>
      <PasswordInput
        id={id}
        name={name}
        required={required}
        autoComplete="current-password"
        value={password}
        onChange={handlePasswordChange}
      />
      <label className="mt-2 flex items-center gap-2 text-sm text-brand-brown">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => handleRememberChange(e.target.checked)}
          className="rounded"
        />
        Se souvenir de mon mot de passe
      </label>
    </>
  );
}
