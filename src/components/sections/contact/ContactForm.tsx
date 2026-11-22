"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const field =
  "w-full rounded-[5px] border-0 bg-[#f8f8f8] px-[25px] py-3 font-unbounded text-[14px] leading-[1.7143] text-accent outline-none transition-shadow duration-300 placeholder:text-body focus:shadow-[inset_0_0_0_1px_var(--color-accent)]";

type Status = "idle" | "sending" | "sent" | "invalid";

/**
 * Feedback form styled like the theme's Contact Form 7 form.
 * Validation and the success message run in the browser; connect
 * `onSend` to your backend or email service to deliver messages.
 */
export function ContactForm({ onSend }: { onSend?: (data: Record<string, string>) => Promise<void> | void }) {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus("invalid");
      form.reportValidity();
      return;
    }
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    await onSend?.(data);
    setStatus("sent");
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-describedby="contact-form-status">
      <div className="-mx-[10px] mb-5 flex flex-wrap gap-y-5">
        <div className="w-full px-[10px] lg:w-1/3">
          <label htmlFor="contact-name" className="sr-only">Name</label>
          <input id="contact-name" name="name" type="text" required placeholder="Name *" autoComplete="name" className={field} />
        </div>
        <div className="w-full px-[10px] lg:w-1/3">
          <label htmlFor="contact-email" className="sr-only">Email</label>
          <input id="contact-email" name="email" type="email" required placeholder="Email *" autoComplete="email" className={field} />
        </div>
        <div className="w-full px-[10px] lg:w-1/3">
          <label htmlFor="contact-phone" className="sr-only">Phone number</label>
          <input id="contact-phone" name="phone" type="tel" placeholder="Phone number" autoComplete="tel" className={field} />
        </div>
        <div className="w-full px-[10px]">
          <label htmlFor="contact-message" className="sr-only">Message</label>
          <textarea id="contact-message" name="message" rows={8} placeholder="Say something..." className={cn(field, "align-top")} />
        </div>
      </div>

      <div className="text-center md:text-left">
        <button type="submit" disabled={status === "sending"} className="btn disabled:opacity-60">
          <span>submit</span>
          <Icon name="arrow-top-right" />
        </button>
      </div>

      <p
        id="contact-form-status"
        role="status"
        className={cn(
          "m-0 mt-5 rounded-[5px] border px-4 py-2 text-[14px]",
          status === "sent" ? "border-primary text-accent" : status === "invalid" ? "border-[#ffb900] text-accent" : "hidden",
        )}
      >
        {status === "sent" && "Thank you for your message. It has been sent."}
        {status === "invalid" && "One or more fields have an error. Please check and try again."}
      </p>
    </form>
  );
}
