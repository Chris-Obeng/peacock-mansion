"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/content/site";
import { buildEnquiryMessage, whatsappLink, type Enquiry } from "@/lib/whatsapp";
import { Moulding } from "./Moulding";

type FieldKey = keyof Enquiry;
type Errors = Partial<Record<FieldKey, string>>;

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(v: Enquiry, t: typeof site.enquire): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = t.fields.name.error;
  if (v.date && v.date < todayISO()) e.date = t.fields.date.error;
  if (!v.occasion) e.occasion = t.fields.occasion.error;
  const g = Number(v.guests);
  if (!v.guests || !Number.isInteger(g) || g < 1 || g > 500) e.guests = t.fields.guests.error;
  return e;
}

/**
 * Four answers on the curtain-teal wall. Each field is a small panel whose gilt
 * moulding closes once it is answered, and the WhatsApp message writes itself
 * beside the form as you go.
 */
export function Enquire() {
  const t = site.enquire;
  const uid = useId();
  const id = (k: FieldKey) => `${uid}-${k}`;
  const [values, setValues] = useState<Enquiry>({ name: "", date: "", occasion: "", guests: "" });
  const [errors, setErrors] = useState<Errors>({});

  const set = (k: FieldKey, v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate(values, t);
    setErrors(e);
    const first = (Object.keys(e) as FieldKey[])[0];
    if (first) {
      document.getElementById(id(first))?.focus();
      return;
    }
    const url = whatsappLink(buildEnquiryMessage(values));
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  }

  const describedBy = (k: FieldKey, extra?: string) =>
    [extra, errors[k] ? `${id(k)}-error` : undefined].filter(Boolean).join(" ") || undefined;

  const field = (k: FieldKey, label: string, control: ReactNode, opts: { span?: boolean; hint?: string } = {}) => {
    const answered = Boolean(values[k]) && !errors[k];
    return (
      <div className={opts.span ? "sm:col-span-2" : undefined}>
        <label htmlFor={id(k)} className="block text-[0.875rem] text-gilt-light">
          {label}
        </label>
        <div className="field-wrap relative mt-2 transition-colors duration-300">
          {control}
          <Moulding lines={[{ inset: 0.5, radius: 8, opacity: 0.4, width: 1 }, { inset: 0.5, radius: 8, opacity: 1, width: 1.2 }]} closed={answered} className={errors[k] ? "text-[#f2c7ba]" : "text-gilt-light"} />
        </div>
        {opts.hint && (
          <p id={`${id(k)}-hint`} className="mt-2 text-[0.8125rem] text-mist">
            {opts.hint}
          </p>
        )}
        {errors[k] && (
          <p id={`${id(k)}-error`} className="mt-2 text-[0.875rem] text-[#f2c7ba]">
            {errors[k]}
          </p>
        )}
      </div>
    );
  };

  const preview = buildEnquiryMessage({
    name: values.name || "…",
    occasion: values.occasion || "…",
    date: values.date,
    guests: values.guests || "…",
  });

  return (
    <section id="enquire" aria-labelledby="enquire-title" className="relative bg-teal py-24 text-ivory md:py-32 lg:py-40">
      <div className="px-page mx-auto grid max-w-[1720px] gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <h2 id="enquire-title" className="font-display text-[clamp(2.25rem,8.4vw,3.25rem)] leading-[1.04] md:text-[clamp(2.75rem,4.6vw,4.75rem)]">
            {t.heading}
          </h2>
          <p className="mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed text-mist">{t.line}</p>

          <figure className="notched relative mt-12 hidden max-w-md bg-plaster p-7 text-ink lg:block" style={{ ["--r" as string]: "14px" }} aria-live="polite">
            <Moulding lines={[{ inset: 7, radius: 11, width: 0.8 }]} className="text-gilt" />
            <figcaption className="text-[0.8125rem] text-gilt-text">
              {t.preview} to {site.contact.phoneDisplay}
            </figcaption>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-[0.9375rem] leading-relaxed text-ink">{preview}</pre>
          </figure>
        </div>

        <form noValidate onSubmit={onSubmit} className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:self-center" aria-describedby={`${uid}-privacy`}>
          {field(
            "name",
            t.fields.name.label,
            <input
              id={id("name")}
              name="name"
              type="text"
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="next"
              required
              maxLength={80}
              value={values.name}
              onChange={(e) => set("name", e.target.value)}
              className="field"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
            />,
            { span: true },
          )}
          {field(
            "date",
            t.fields.date.label,
            <input
              id={id("date")}
              name="date"
              type="date"
              value={values.date}
              onChange={(e) => set("date", e.target.value)}
              onFocus={(e) => {
                e.currentTarget.min = todayISO();
              }}
              className="field num [color-scheme:dark]"
              aria-invalid={Boolean(errors.date)}
              aria-describedby={describedBy("date", `${id("date")}-hint`)}
            />,
            { hint: t.fields.date.hint },
          )}
          {field(
            "guests",
            t.fields.guests.label,
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
              value={values.guests}
              onChange={(e) => set("guests", e.target.value)}
              className="field num"
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={describedBy("guests")}
            />,
          )}
          {field(
            "occasion",
            t.fields.occasion.label,
            <select
              id={id("occasion")}
              name="occasion"
              required
              value={values.occasion}
              onChange={(e) => set("occasion", e.target.value)}
              className="field"
              aria-invalid={Boolean(errors.occasion)}
              aria-describedby={describedBy("occasion")}
            >
              <option value="" disabled>
                {t.fields.occasion.placeholder}
              </option>
              {t.occasionOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>,
            { span: true },
          )}

          <figure className="notched relative bg-plaster p-6 text-ink sm:col-span-2 lg:hidden" style={{ ["--r" as string]: "12px" }}>
            <Moulding lines={[{ inset: 6, radius: 9, width: 0.8 }]} className="text-gilt" />
            <figcaption className="text-[0.8125rem] text-gilt-text">
              {t.preview} to {site.contact.phoneDisplay}
            </figcaption>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-[0.9375rem] leading-relaxed text-ink">{preview}</pre>
          </figure>

          <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="press min-h-14 shrink-0 bg-gilt-light px-9 text-[1rem] font-medium text-lacquer hover:bg-ivory"
            >
              {t.submit}
            </button>
            <p id={`${uid}-privacy`} className="max-w-[38ch] text-[0.875rem] leading-relaxed text-mist">
              {t.privacy}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
