"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import LanguageToggle from "./i18n/LanguageToggle";

function getInitialDark() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("theme");
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return stored ? stored === "dark" : prefersDark;
}

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function ThemeToggle({
  isDark,
  onToggle,
  mounted,
}: {
  isDark: boolean;
  onToggle: () => void;
  mounted: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className="cursor-pointer grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--text)] hover:bg-[color:var(--bg-secondary)] transition"
    >
      {!mounted ? (
        <span className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 12.8A8.5 8.5 0 0 1 11.2 3a6.8 6.8 0 1 0 9.8 9.8Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] hover:bg-[color:var(--bg-secondary)] transition">
      <div className="relative h-4 w-4">
        <span
          className={[
            "absolute left-0 top-1/2 h-[2px] w-full bg-[color:var(--text)] transition",
            open ? "rotate-45" : "-translate-y-[6px]",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-0 top-1/2 h-[2px] w-full bg-[color:var(--text)] transition",
            open ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-0 top-1/2 h-[2px] w-full bg-[color:var(--text)] transition",
            open ? "-rotate-45" : "translate-y-[6px]",
          ].join(" ")}
        />
      </div>
    </div>
  );
}

function NavInner({
  seamless,
  isDark,
  onToggleTheme,
  mounted,
}: {
  seamless?: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  mounted: boolean;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0, y: -6 },
        { height: "auto", opacity: 1, y: 0, duration: 0.22, ease: "power2.out" }
      );
    } else {
      gsap.to(panel, { height: 0, opacity: 0, y: -6, duration: 0.18, ease: "power2.in" });
    }
  }, [open]);

  const close = () => setOpen(false);

  const wrapClass = seamless
    ? "rounded-2xl border border-transparent bg-transparent shadow-none"
    : "rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-[0_10px_30px_rgba(0,0,0,0.10)] backdrop-blur";

  return (
    <div className={["mt-4 px-4 py-3", wrapClass].join(" ")}>
      {/* TOP ROW */}
      <div className="flex items-center justify-between gap-3">
        {/* Logo */}
        <Link
          href="/"
          onClick={close}
          className="inline-flex items-center gap-1 rounded-xl px-2 py-1 text-sm font-semibold tracking-tight text-[color:var(--text)] hover:bg-[color:var(--bg-secondary)] transition"
        >
          <span className="opacity-90">Hendra</span>
          <span className="opacity-50">.sutrisno</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center gap-1 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-1 py-1">
            <a
              href="#projects"
              className="rounded-lg px-3 py-2 text-sm text-[color:var(--text)] opacity-85 hover:opacity-100 hover:bg-[color:var(--bg-secondary)] transition"
            >
              Projects
            </a>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-sm text-[color:var(--text)] opacity-85 hover:opacity-100 hover:bg-[color:var(--bg-secondary)] transition"
            >
              About
            </Link>
            <a
              href="#contact"
              className="rounded-lg px-3 py-2 text-sm text-[color:var(--text)] opacity-85 hover:opacity-100 hover:bg-[color:var(--bg-secondary)] transition"
            >
              Contact
            </a>
          </div>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
        <LanguageToggle />
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} mounted={mounted} />

          <button
            type="button"
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Hamburger open={open} />
          </button>
        </div>
      </div>

      {/* MOBILE PANEL */}
      <div ref={panelRef} className="md:hidden overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div className="mt-3 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2">
          <a
            href="#projects"
            onClick={close}
            className="block rounded-lg px-3 py-2 text-sm text-[color:var(--text)] hover:bg-[color:var(--bg-secondary)] transition"
          >
            Projects
          </a>
          <Link
            href="/about"
            onClick={close}
            className="block rounded-lg px-3 py-2 text-sm text-[color:var(--text)] hover:bg-[color:var(--bg-secondary)] transition"
          >
            About
          </Link>
          <a
            href="#contact"
            onClick={close}
            className="block rounded-lg px-3 py-2 text-sm text-[color:var(--text)] hover:bg-[color:var(--bg-secondary)] transition"
          >
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Nav() {
  const floatingRef = useRef<HTMLElement | null>(null);
  const defaultRef = useRef<HTMLElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // init theme ONCE
  useEffect(() => {
    const initial = getInitialDark();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(initial);
    applyTheme(initial);
    setMounted(true);

    // sync antar tab
    const onStorage = (e: StorageEvent) => {
      if (e.key !== "theme") return;
      const next = e.newValue === "dark";
      setIsDark(next);
      applyTheme(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  };

  // floating transition
  useEffect(() => {
    const floating = floatingRef.current;
    const normal = defaultRef.current;
    if (!floating || !normal) return;

    gsap.set(floating, { y: -16, opacity: 0, pointerEvents: "none" });
    gsap.set(normal, { opacity: 1 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
    tl.to(normal, { opacity: 0, duration: 0.15 }, 0);
    tl.to(floating, { y: 0, opacity: 1, duration: 0.28, pointerEvents: "auto" }, 0);

    const FLOAT_AT = 72;
    const onScroll = () => {
      const shouldFloat = window.scrollY > FLOAT_AT;
      if (shouldFloat) tl.play();
      else tl.reverse();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      tl.kill();
    };
  }, []);

  const containerClass = useMemo(
    () => "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8",
    []
  );

  // biar tidak “kedip” saat hydration
  const safeIsDark = isDark;

  return (
    <>
      {/* DEFAULT */}
      <header ref={defaultRef} className="relative z-20 w-full">
        <div className={containerClass}>
          <NavInner seamless isDark={safeIsDark} onToggleTheme={toggleTheme} mounted={mounted} />
        </div>
      </header>

      {/* FLOATING */}
      <header ref={floatingRef} className="fixed left-0 top-0 z-50 w-full">
        <div className={containerClass}>
          <NavInner isDark={safeIsDark} onToggleTheme={toggleTheme} mounted={mounted} />
        </div>
      </header>
    </>
  );
}