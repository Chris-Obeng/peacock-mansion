"use client";

import { useId, type FormEvent } from "react";
import { site } from "@/content/site";
import { formatDate, whatsappLink } from "@/lib/whatsapp";
import { Moulding } from "./Moulding";

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/** The first-viewport action in working form: pick a date, ask about it on WhatsApp. */
export function DatePlaque() {
  const t = site.hero.plaque;
  const id = useId();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const date = String(new FormData(e.currentTarget).get("date") ?? "");
    const text = date ? `${t.message} ${formatDate(date)}?` : t.messageNoDate;
    const url = whatsappLink(text);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="settle relative mx-auto w-full max-w-[34rem] bg-lacquer text-ivory notched"
      style={{ ["--r" as string]: "12px" }}
      aria-label="Ask about a date"
    >
      <Moulding lines={[{ inset: 5, radius: 9, width: 0.8 }]} drawOn="mount" duration={1800} className="text-gilt-light" />
      <div className="flex flex-col gap-1 p-3 xs:flex-row xs:items-stretch xs:gap-2 sm:p-3.5">
        <label htmlFor={id} className="relative flex min-h-12 flex-1 items-center gap-3 px-3">
          <span className="shrink-0 text-[0.8125rem] text-mist">{t.label}</span>
          <input
            id={id}
            name="date"
            type="date"
            className="num h-12 w-full min-w-0 bg-transparent text-[1rem] text-ivory [color-scheme:dark] focus:outline-none"
            onFocus={(e) => {
              e.currentTarget.min = todayISO();
            }}
          />
        </label>
        <button
          type="submit"
          className="press min-h-12 shrink-0 bg-gilt-light px-5 text-[0.9375rem] font-medium text-lacquer hover:bg-ivory"
        >
          {t.button}
        </button>
      </div>
    </form>
  );
}
