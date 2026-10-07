"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound as copy } from "@/content/notfound";
import { defaultLocale, isLocale, localizedHref, type Locale } from "@/lib/i18n";
import { Segments } from "@/components/primitives/Segments";
import { Button } from "@/components/primitives/Button";

// three.js + R3F load in their own chunk, client-only.
const SpaceScene = dynamic(() => import("@/components/notfound/SpaceScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// The 404 overlay. global-not-found has no route params, so the locale comes from
// the URL prefix (/fr|/en|/nl, else the default). Copy stays hidden until that's
// known, then rises in — so en/nl visitors never see a flash of French.
export function NotFound() {
  const [state, setState] = useState<{ lang: Locale; path: string; webgl: boolean } | null>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const seg = location.pathname.split("/")[1] ?? "";
    const lang = isLocale(seg) ? seg : defaultLocale;
    document.documentElement.lang = lang;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot read of the URL after mount
    setState({ lang, path: decodeURI(location.pathname), webgl: hasWebGL() });
  }, []);

  const t = copy[state?.lang ?? defaultLocale];
  const lang = state?.lang ?? defaultLocale;

  return (
    <div className="nf" data-ready={!!state} data-lit={lit || state?.webgl === false}>
      {state?.webgl ? <SpaceScene onReady={() => setLit(true)} /> : <div className="dots-bg" aria-hidden="true" />}
      <div className="nf-vignette" aria-hidden="true" />

      <header className="nf-top">
        <Link className="logo" href={localizedHref("/", lang)}>
          <span className="mark" role="img" aria-label="YWdesign" />
        </Link>
        <span className="nf-hint" aria-hidden="true">
          {t.hint}
        </span>
      </header>

      <main className="nf-main">
        {state && (
          <>
            <p className="eyebrow nf-rise" style={{ "--d": 0 } as React.CSSProperties}>
              {t.eyebrow}
            </p>
            <h1 className="nf-h1 nf-rise" style={{ "--d": 1 } as React.CSSProperties}>
              <Segments segs={t.title} />
            </h1>
            <p className="nf-sub nf-rise" style={{ "--d": 2 } as React.CSSProperties}>
              {t.sub}
            </p>
            <p className="nf-path nf-rise" style={{ "--d": 3 } as React.CSSProperties}>
              <span className="p">~{state.path}</span> — {t.missing}
            </p>
            <div className="nf-cta nf-rise" style={{ "--d": 4 } as React.CSSProperties}>
              <Button href={localizedHref("/", lang)} variant="primary">
                {t.home} <span className="arr">→</span>
              </Button>
              <Button href={localizedHref("/work", lang)} variant="ghost">
                {t.work}
              </Button>
              <Button href={localizedHref("/services", lang)} variant="ghost">
                {t.services}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
