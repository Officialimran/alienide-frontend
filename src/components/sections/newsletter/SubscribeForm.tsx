"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";

/** Email capture styled like the theme's Mailchimp form. Wire `onSubscribe` to a real endpoint. */
export function SubscribeForm({ onSubscribe }: { onSubscribe?: (email: string) => Promise<void> | void }) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setStatus("sending");
    await onSubscribe?.(email);
    setStatus("done");
    form.reset();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="relative z-[5] flex rounded-[5px] border border-line"
        aria-describedby={status === "done" ? `${id}-msg` : undefined}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          placeholder="Email address"
          className="w-full min-w-0 bg-transparent px-5 py-[18px] text-[12px] leading-6 font-light text-accent outline-none placeholder:text-accent"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex shrink-0 items-center px-5 py-[15px] font-anton text-[16px] leading-[26px] text-accent uppercase transition-colors hover:text-primary disabled:opacity-60"
        >
          Subscribe
          <Icon name="arrow-top-right" className="group-hover-rotate mt-[-2px] ml-[10px] text-[14px] text-primary transition-transform duration-300" />
        </button>
      </form>
      <p id={`${id}-msg`} role="status" className="m-0 mt-2 min-h-[1.5em] text-[12px] text-accent">
        {status === "done" ? "Thanks for subscribing!" : ""}
      </p>
    </div>
  );
}
