"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../i18n/LanguageProvider";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const { t } = useLang();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-contact='badge'], [data-contact='title'], [data-contact='desc']",
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 70%" },
        }
      );

      gsap.fromTo(
        "[data-contact='panel-left'], [data-contact='panel-right']",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    const arrow = arrowRef.current;
    if (!btn || !arrow) return;

    const onEnter = () => {
      gsap.to(arrow, { x: 6, duration: 0.25, ease: "power2.out" });
      gsap.to(btn, { scale: 1.01, duration: 0.25, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.out" });
      gsap.to(btn, { scale: 1, duration: 0.25, ease: "power2.out" });
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMsg("");

    const form = new FormData(e.currentTarget);
    const payload = {
      subject: String(form.get("subject") || ""),
      userEmail: String(form.get("userEmail") || ""),
      message: String(form.get("message") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) throw new Error(data?.error || "Failed to send");

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-dvh flex items-center bg-[color:var(--bg)]"
    >
      {/* Soft background tint */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_70%_25%,rgba(76,92,120,0.14),transparent_60%)] dark:bg-[radial-gradient(900px_420px_at_70%_25%,rgba(138,151,166,0.10),transparent_60%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          {/* <div
            data-contact="badge"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur"
          > */}
            {/* <span className="h-2 w-2 rounded-full bg-[color:var(--ui-accent)]" /> */}
            {/* <p className="text-sm sm:text-2xl font-semibold tracking-wide text-[color:var(--text)]">
              {t<string>("contact.badge")}
            </p> */}
          {/* </div> */}

          <h2
            data-contact="title"
            className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight text-[color:var(--text)]"
          >
            {t<string>("contact.title")}
          </h2>

          <p
            data-contact="desc"
            className="mt-4 text-base sm:text-lg text-[color:var(--text-secondary)]"
          >
            {t<string>("contact.subtitle")}
          </p>
        </div>

        {/* Main panels */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Left panel */}
          <div
            data-contact="panel-left"
            className="rounded-2xl border border-[color:var(--ui-border)] bg-[color:var(--surface)] backdrop-blur p-6 sm:p-7"
          >
            <h3 className="text-lg font-semibold text-[color:var(--text)]">
               {t<string>("contact.leftTitle")}
            </h3>

            <p className="mt-3 text-[color:var(--text-secondary)] leading-relaxed">
              {t<string>("contact.leftDesc")}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Freelance", "Contract", "Remote", "UI Engineering", "Fullstack"].map((x) => (
                <span
                  key={x}
                  className="rounded-full border border-[color:var(--ui-border)] bg-[color:var(--bg)] px-3 py-1 text-xs text-[color:var(--text-secondary)]"
                >
                  {x}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-3">
              <a
                className="group flex items-center justify-between rounded-xl border border-[color:var(--ui-border)] bg-[color:var(--bg)] px-4 py-3 hover:bg-[color:var(--bg-secondary)] transition cursor-pointer"
                href="mailto:sutrishendra07@email.com"
              >
                <div>
                  <p className="text-sm font-medium text-[color:var(--text)]">Email</p>
                  <p className="text-xs text-[color:var(--text-secondary)]">
                    sutrishendra07@email.com
                  </p>
                </div>
                <span className="text-[color:var(--text-secondary)] group-hover:text-[color:var(--ui-accent)] transition">
                  ↗
                </span>
              </a>

              <a
                className="group flex items-center justify-between rounded-xl border border-[color:var(--ui-border)] bg-[color:var(--bg)] px-4 py-3 hover:bg-[color:var(--bg-secondary)] transition cursor-pointer"
                href="https://linkedin.com/in/hendrasutrisno"
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <p className="text-sm font-medium text-[color:var(--text)]">LinkedIn</p>
                  <p className="text-xs text-[color:var(--text-secondary)]">
                    Connect professionally
                  </p>
                </div>
                <span className="text-[color:var(--text-secondary)] group-hover:text-[color:var(--ui-accent)] transition">
                  ↗
                </span>
              </a>

              <a
                className="group flex items-center justify-between rounded-xl border border-[color:var(--ui-border)] bg-[color:var(--bg)] px-4 py-3 hover:bg-[color:var(--bg-secondary)] transition cursor-pointer"
                href="https://github.com/hendsuuu"
                target="_blank"
                rel="noreferrer"
              >
                <div>
                  <p className="text-sm font-medium text-[color:var(--text)]">GitHub</p>
                  <p className="text-xs text-[color:var(--text-secondary)]">
                    Code & repos
                  </p>
                </div>
                <span className="text-[color:var(--text-secondary)] group-hover:text-[color:var(--ui-accent)] transition">
                  ↗
                </span>
              </a>
            </div>

          </div>

          {/* Right panel (Form) */}
          <div
            data-contact="panel-right"
            className="rounded-2xl border border-[color:var(--ui-border)] bg-[color:var(--surface)] backdrop-blur p-6 sm:p-7"
          >
            <h3 className="text-lg font-semibold text-[color:var(--text)]">
                {t<string>("contact.formTitle")}
            </h3>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-[color:var(--text)]">
                    {t<string>("contact.yourEmail")}
                  </label>
                  <input
                    name="userEmail"
                    type="email"
                    required
                    placeholder={t<string>("contact.placeholderEmail")}
                    className="
                      mt-2 w-full rounded-xl
                      border border-[color:var(--ui-border)]
                      bg-[color:var(--bg)]
                      px-4 py-3
                      text-sm
                      text-[color:var(--text)]
                      placeholder:text-[color:var(--text-secondary)]
                      outline-none
                      focus:border-[color:var(--ui-accent)]
                      transition
                    "
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[color:var(--text)]">
                    {t<string>("contact.subject")}
                  </label>
                  <input
                    name="subject"
                    required
                    placeholder={t<string>("contact.placeholderSubject")}
                    className="
                      mt-2 w-full rounded-xl
                      border border-[color:var(--ui-border)]
                      bg-[color:var(--bg)]
                      px-4 py-3
                      text-sm
                      text-[color:var(--text)]
                      placeholder:text-[color:var(--text-secondary)]
                      outline-none
                      focus:border-[color:var(--ui-accent)]
                      transition
                    "
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[color:var(--text)]">
                    {t<string>("contact.message")}
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  placeholder={t<string>("contact.placeholderMessage")}
                  className="
                    mt-2 w-full rounded-xl
                    border border-[color:var(--ui-border)]
                    bg-[color:var(--bg)]
                    px-4 py-3
                    text-sm
                    text-[color:var(--text)]
                    placeholder:text-[color:var(--text-secondary)]
                    outline-none
                    focus:border-[color:var(--ui-accent)]
                    transition
                    resize-none
                  "
                />
              </div>

              <button
                ref={btnRef}
                type="submit"
                disabled={loading}
                className="
                  w-full inline-flex items-center justify-center gap-2
                  rounded-xl
                  bg-[color:var(--ui-accent)]
                  px-6 py-3
                  text-sm sm:text-base
                  font-medium
                  dark:text-white
                  cursor-pointer
                  shadow-sm
                  hover:bg-[color:var(--ui-accent-hover)]
                  transition
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {loading ? t<string>("contact.sending") : t<string>("contact.send")}
                <span ref={arrowRef} className="inline-flex" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {/* status messages */}
              {status === "success" && (
                <div className="rounded-xl border border-[color:var(--ui-border)] bg-[color:var(--bg)] px-4 py-3 text-sm text-[color:var(--text)]">
                  {t<string>("contact.success")}
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                  ❌ {errorMsg}
                </div>
              )}
            </form>

          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-48"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--bg) 60%, transparent) 60%, var(--bg) 100%)",
        }}
      />
    </section>
  );
}