"use client";

import { useEffect } from "react";

/** Shown when a page cannot be rendered (e.g. the CMS API is unreachable). */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-dark pt-[200px] pb-[150px]">
      <div className="site-container text-center">
        <h1 className="m-0 mb-5 font-anton text-[48px] leading-[1.1] font-normal text-white uppercase md:text-[80px]">
          Something went wrong
        </h1>
        <p className="m-0 mb-10 font-unbounded text-[16px] leading-[1.7] text-muted md:text-[18px]">
          We couldn&apos;t load this page right now. Please try again in a moment.
        </p>
        <button type="button" onClick={reset} className="btn">
          <span>try again</span>
        </button>
      </div>
    </section>
  );
}
