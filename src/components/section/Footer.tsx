"use client";

import Link from "next/link";
import { SiGithub, SiX, SiYoutube, SiDiscord } from "react-icons/si";
import { useLang } from "../i18n/LanguageProvider";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/hendra", // ganti
    icon: SiGithub,
  },
  {
    label: "X",
    href: "https://x.com/hendra", // ganti
    icon: SiX,
  },
  {
    label: "YouTube",
    href: "https://youtube.com", // optional
    icon: SiYoutube,
  },
  {
    label: "Discord",
    href: "https://discord.com", // optional
    icon: SiDiscord,
  },
];
const footerCols = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/#about" },
      { label: "Projects", href: "/#projects" },
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Case Studies", href: "/#projects" },
      { label: "Services", href: "/#contact" },
      { label: "Availability", href: "/#contact" },
      { label: "Resume", href: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/hendsuuu", external: true },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/hendrasutrisno",
        external: true,
      },
      {
        label: "Email",
        href: "mailto:sutrishendra07@email.com",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://instagram.com/hendsuuuu",
        external: true,
      },
    ],
  },
];

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M10 7h7v7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();

  return (
    <footer className="relative bg-[color:var(--bg)]">
      {/* Top area */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="grid justify-between gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Left: small brand + socials + meta */}
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border)] bg-[color:var(--surface)] px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]" />
              <p className="text-sm font-medium tracking-wide text-[color:var(--text)]">
                Hendra Sutrisno
              </p>
            </div>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-[color:var(--text-secondary)]">
              {t("footer.tagline")}
            </p>

            {/* Social row (mirip laravel: icon-only, subtle) */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="
        group
        grid h-10 w-10 place-items-center
        rounded-xl
        text-[color:var(--text-secondary)]
        hover:text-[color:var(--ui-accent)]
        transition
        cursor-pointer
      "
                >
                  <Icon
                    size={16}
                    className="
          transition
          group-hover:scale-110
        "
                  />
                </Link>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-[color:var(--text-secondary)]">
              <span>© {year} Hendra</span>
              {/* <span className="opacity-40">•</span>
              <Link
                className="hover:text-[color:var(--text)] transition"
                href="/about">
                Legal
              </Link>
              <span className="opacity-40">•</span>
              <a
                className="hover:text-[color:var(--text)] transition"
                href="#contact">
                Status
              </a> */}
            </div>
          </div>

          {/* Right: columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerCols.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-semibold text-[color:var(--text)]">
                  {col.title}
                </p>

                <ul className="mt-4 space-y-2">
                  {col.links.map((l) => {
                    const cls =
                      "inline-flex items-center gap-2 text-sm text-[color:var(--text-secondary)] hover:text-[color:var(--text)] transition cursor-pointer";
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if ((l as any).external) {
                      return (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className={cls}
                          >
                            {l.label}
                            <span className="opacity-70">
                              <ExternalIcon />
                            </span>
                          </a>
                        </li>
                      );
                    }

                    // internal
                    const isHash = l.href.startsWith("#");
                    return (
                      <li key={l.label}>
                        {isHash ? (
                          <a href={l.href} className={cls}>
                            {l.label}
                          </a>
                        ) : (
                          <Link href={l.href} className={cls}>
                            {l.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Big wordmark (Laravel-like) */}
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-14 sm:mt-16 border-t border-[color:var(--ui-border)] pt-10 sm:pt-12">
          <div className="relative overflow-hidden">
            {/* Wordmark besar — ganti teksnya sesuai kamu */}
            <p
              className="
                text-center
                select-none
                leading-[0.85]
                tracking-tight
                font-semibold
                text-[color:var(--text)]
                text-[clamp(72px,16vw,220px)]
                font-display
              "
              aria-hidden="true"
            >
              HendSuuu
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade (optional, biar halus) */}
      {/* <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--bg) 75%, transparent) 70%, var(--bg) 100%)",
        }}
      /> */}
    </footer>
  );
}
