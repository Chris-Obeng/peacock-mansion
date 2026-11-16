"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { buildEnquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { Picture } from "./Picture";
import { Reveal } from "./Reveal";

type FieldKey = "name" | "date" | "occasion" | "guests";
type Errors = Partial<Record<FieldKey, string>>;

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function Enquire() {
  const t = site.enquire;
  const uid = useId();
  const id = (k: FieldKey) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});

  function validate(form: HTMLFormElement): { errors: Errors; values: Record<FieldKey, string> } {
    const fd = new FormData(form);
    const values = {
      name: String(fd.get("name") ?? "").trim(),
      date: String(fd.get("date") ?? ""),
      occasion: String(fd.get("occasion") ?? ""),
      guests: String(fd.get("guests") ?? "").trim(),
    };
    const e: Errors = {};
    if (values.name.length < 2) e.name = t.fields.name.error;
    if (values.date && values.date < todayISO()) e.date = t.fields.date.error;
    if (!values.occasion) e.occasion = t.fields.occasion.error;
    const g = Number(values.guests);
    if (!values.guests || !Number.isInteger(g) || g < 1 || g > 500) e.guests = t.fields.guests.error;
    return { errors: e, values };
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const { errors: e, values } = validate(form);
    setErrors(e);
    const first = (Object.keys(e) as FieldKey[])[0];
    if (first) {
      form.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }
    const url = whatsappLink(buildEnquiryMessage(values));
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  }

  function clearError(k: FieldKey) {
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  }

  const describedBy = (k: FieldKey, extra?: string) =>
    [extra, errors[k] ? `${id(k)}-error` : undefined].filter(Boolean).join(" ") || undefined;

  const errorText = (k: FieldKey) =>
    errors[k] ? (
      <p id={`${id(k)}-error`} className="mt-2 text-sm text-[#f2c7ba]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="relative bg-teal py-24 text-ivory md:py-36 lg:py-44">
      <div className="px-page mx-auto grid max-w-[1680px] gap-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
        <Reveal as="header" className="md:col-span-8 lg:col-span-5">
          <p className="label text-gold-light">{t.label}</p>
          <h2 id="enquire-title" className="font-display mt-6 text-[clamp(2.6rem,9vw,5.5rem)] leading-[0.98]">
            {t.heading}
          </h2>
          <p className="mt-8 max-w-[34ch] text-[1.0625rem] leading-relaxed text-ivory-dim">{t.line}</p>
          <Picture
            image={t.image}
            aspect="4 / 3"
            sizes="(min-width:1024px) 22vw, 0px"
            className="mt-14 hidden w-[70%] max-w-sm lg:block"
            decorative
          />
        </Reveal>

        <form
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          className="grid gap-x-8 gap-y-10 md:col-span-8 md:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:self-end"
          aria-describedby={`${uid}-privacy`}
        >
          <div className="md:col-span-2">
            <label htmlFor={id("name")} className="label block text-gold-light">
              {t.fields.name.label}
            </label>
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="next"
              required
              minLength={2}
              maxLength={80}
              className="field mt-2"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              onInput={() => clearError("name")}
            />
            {errorText("name")}
          </div>

          <div>
            <label htmlFor={id("date")} className="label block text-gold-light">
              {t.fields.date.label}
            </label>
            <input
              id={id("date")}
              name="date"
              type="date"
              onFocus={(e) => {
                // Set on the client so the server render never disagrees with the visitor's clock.
                e.currentTarget.min = todayISO();
              }}
              className="field mt-2 [color-scheme:dark]"
              aria-invalid={Boolean(errors.date)}
              aria-describedby={describedBy("date", `${id("date")}-hint`)}
              onInput={() => clearError("date")}
            />
            <p id={`${id("date")}-hint`} className="mt-2 text-sm text-ivory-dim">
              {t.fields.date.hint}
            </p>
            {errorText("date")}
          </div>

          <div>
            <label htmlFor={id("guests")} className="label block text-gold-light">
              {t.fields.guests.label}
            </label>
            <input
              id={id("guests")}
              name="guests"
              type="number"
              inputMode="numeric"
              min={1}
              max={500}
              step={1}
              required
              enterKeyHint="next"
              className="field mt-2"
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={describedBy("guests")}
              onInput={() => clearError("guests")}
            />
            {errorText("guests")}
          </div>

          <div className="md:col-span-2">
            <label htmlFor={id("occasion")} className="label block text-gold-light">
              {t.fields.occasion.label}
            </label>
            <select
              id={id("occasion")}
              name="occasion"
              required
              defaultValue=""
              className="field mt-2 pr-8"
              aria-invalid={Boolean(errors.occasion)}
              aria-describedby={describedBy("occasion")}
              onChange={() => clearError("occasion")}
            >
              <option value="" disabled>
                {t.fields.occasion.placeholder}
              </option>
              {t.occasionOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            {errorText("occasion")}
          </div>

          <div className="flex flex-col gap-5 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <button
              type="submit"
              className="press label inline-flex min-h-14 shrink-0 items-center justify-center gap-4 whitespace-nowrap bg-ivory px-8 text-ink hover:bg-gold-light"
            >
              {t.submit}
              <span aria-hidden className="h-px w-8 bg-ink" />
            </button>
            <p id={`${uid}-privacy`} className="max-w-[36ch] text-sm leading-relaxed text-ivory-dim">
              {t.privacy}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
