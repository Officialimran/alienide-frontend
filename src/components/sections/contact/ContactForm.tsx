"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { ApiError } from "@/lib/api/client";
import { submitSuggestion } from "@/lib/api/forms";
import { cn } from "@/lib/cn";

const field =
  "w-full rounded-[5px] border-0 bg-[#f8f8f8] px-[25px] py-3 font-unbounded text-[14px] leading-[1.7143] text-accent outline-none transition-shadow duration-300 placeholder:text-body focus:shadow-[inset_0_0_0_1px_var(--color-accent)] aria-[invalid=true]:shadow-[inset_0_0_0_1px_#e73a2b]";

type Status = "idle" | "sending" | "sent" | "invalid" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "phone" | "address" | "remarks", string>>;

const FALLBACK_ERROR = "Something went wrong. Please try again in a moment.";

/**
 * Feedback form styled like the theme's Contact Form 7 form.
 * Submits to POST /v1/suggests; the backend validates, stores the message
 * and emails it to the site owner.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setErrors({});

    if (!form.checkValidity()) {
      setStatus("invalid");
      setMessage("One or more fields have an error. Please check and try again.");
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    setStatus("sending");
    try {
      const res = await submitSuggestion({
        name: value("name"),
        email: value("email"),
        phone: value("phone"),
        remarks: value("remarks") || undefined,
      });
      setStatus("sent");
      setMessage(res.message || "Thank you for your message. It has been sent.");
      form.reset();
    } catch (error) {
      if (error instanceof ApiError && error.status === 422) {
        const fieldErrors = Object.fromEntries(
          Object.entries(error.errors).map(([key, messages]) => [key, messages[0]]),
        ) as FieldErrors;
        setErrors(fieldErrors);
        setStatus("invalid");
        setMessage(error.message || "One or more fields have an error. Please check and try again.");
      } else if (error instanceof ApiError && error.status === 429) {
        setStatus("error");
        setMessage("Too many messages were sent. Please wait a minute and try again.");
      } else {
        setStatus("error");
        setMessage(error instanceof ApiError && error.status < 500 ? error.message : FALLBACK_ERROR);
      }
    }
  };

  const fieldProps = (name: keyof FieldErrors) => ({
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const FieldError = ({ name }: { name: keyof FieldErrors }) =>
    errors[name] ? (
      <p id={`contact-${name}-error`} className="m-0 mt-2 text-[12px] text-badge">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="contact-form-status">
      <div className="-mx-[10px] mb-5 flex flex-wrap gap-y-5">
        <div className="w-full px-[10px] lg:w-1/3">
          <label htmlFor="contact-name" className="sr-only">Name</label>
          <input id="contact-name" type="text" required maxLength={255} placeholder="Name *" autoComplete="name" className={field} {...fieldProps("name")} />
          <FieldError name="name" />
        </div>
        <div className="w-full px-[10px] lg:w-1/3">
          <label htmlFor="contact-email" className="sr-only">Email</label>
          <input id="contact-email" type="email" required maxLength={255} placeholder="Email *" autoComplete="email" className={field} {...fieldProps("email")} />
          <FieldError name="email" />
        </div>
        <div className="w-full px-[10px] lg:w-1/3">
          <label htmlFor="contact-phone" className="sr-only">Phone number</label>
          <input id="contact-phone" type="tel" required maxLength={20} placeholder="Phone number *" autoComplete="tel" className={field} {...fieldProps("phone")} />
          <FieldError name="phone" />
        </div>
        <div className="w-full px-[10px]">
          <label htmlFor="contact-remarks" className="sr-only">Message</label>
          <textarea id="contact-remarks" rows={8} maxLength={2000} placeholder="Say something..." className={cn(field, "align-top")} {...fieldProps("remarks")} />
          <FieldError name="remarks" />
        </div>
      </div>

      <div className="text-center md:text-left">
        <button type="submit" disabled={status === "sending"} className="btn disabled:opacity-60">
          <span>{status === "sending" ? "sending…" : "submit"}</span>
          <Icon name="arrow-top-right" />
        </button>
      </div>

      <p
        id="contact-form-status"
        role="status"
        className={cn(
          "m-0 mt-5 rounded-[5px] border px-4 py-2 text-[14px] text-accent",
          status === "sent" ? "border-primary" : status === "invalid" ? "border-[#ffb900]" : status === "error" ? "border-badge" : "hidden",
        )}
      >
        {status !== "idle" && status !== "sending" ? message : ""}
      </p>
    </form>
  );
}
