"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { YogaRetreatField, YogaRetreatGroup, YogaStudioCopy } from "@/content/work";

// Yoga, Zen & Tonic signature — a hardcoded, clickable replica of the client's
// Sanity Studio (yoga repo, studio/). Three panes, one shared state:
//   · Sign-ups   ← components/StatusList.tsx + SignupView.tsx + lib/booked.ts
//                  (a status click recomputes "Booked" on the retreat + the nav badge)
//   · Newsletter ← actions/newsletter.tsx + components/MailPreview.tsx
//                  (write → test → publish → send, live HTML mail preview per language)
//   · Retreat    ← components/PageOverview.tsx + I18nTabs.tsx + InlineFields.tsx
//                  (progress per page part, one-row fields with ⓘ, NL | EN tabs + ✨ translate)
// No @sanity/ui, no network: plain React state + CSS (detail.css .yzs-*), fixed
// light "Studio" palette like the real thing. UI copy comes per locale from
// signatureData.yogaStudio; the client's own content stays NL/EN, as in their Studio.

type Lang = "nl" | "en";
type I18n = Record<Lang, string>;
type Status = "new" | "confirmed" | "waitlist" | "cancelled";
type Pane = "signups" | "newsletter" | "retreat";

const fill = (s: string, v: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (m, k: string) => (k in v ? String(v[k]) : m));
/** "2026-11-06T09:14" → "6 Nov 2026, 09:14" — formatted by hand so server and client markup match. */
const fmtDate = (iso: string, months: string[], time = true) => {
  const [d, t] = iso.split("T");
  const [y, m, day] = d.split("-").map(Number);
  return `${day} ${months[m - 1]} ${y}${time && t ? `, ${t}` : ""}`;
};

// ── the client's data (as it sits in their dataset) ─────────────────────────
const RETREATS = [
  { id: "eifel", title: "Eifel: Yoga & Hike", start: "2026-11-19", end: "2026-11-22", upcoming: true },
  { id: "rochefort", title: "Rochefort: Yoga, pilates and Wellness", start: "2027-03-18", end: "2027-03-21", upcoming: true },
  { id: "dahab", title: "Dahab: Yoga & Freediving", start: "2026-05-09", end: "2026-05-16", upcoming: false },
] as const;
type RetreatId = (typeof RETREATS)[number]["id"];

type Signup = {
  id: string;
  name: string;
  email: string;
  phone: string;
  lang: Lang;
  at: string;
  retreat: RetreatId;
  status: Status;
  room: string;
  diet: string;
  message: string;
  answers: [string, string][];
};
const SIGNUPS: Signup[] = [
  { id: "s1", name: "Anna Peeters", email: "anna.peeters@telenet.be", phone: "0470 12 34 56", lang: "nl", at: "2026-11-06T09:14", retreat: "eifel", status: "new", room: "Gedeelde kamer · € 545", diet: "Vegetarisch", message: "Kan ik ter plaatse een yogamat lenen?", answers: [["Hoe wil je verdergaan?", "Inschrijven"], ["Ervaring met yoga", "1 – 3 jaar"]] },
  { id: "s2", name: "Tom Wouters", email: "tom.wouters@gmail.com", phone: "+32 486 55 01 22", lang: "en", at: "2026-11-05T21:40", retreat: "eifel", status: "new", room: "Single room · € 695", diet: "", message: "Coming by train — is there a pick-up from the station?", answers: [["How would you like to continue?", "Sign up"], ["Yoga experience", "Beginner"]] },
  { id: "s3", name: "Lies Maes", email: "lies.maes@outlook.com", phone: "0495 77 18 40", lang: "nl", at: "2026-11-04T12:02", retreat: "eifel", status: "new", room: "Gedeelde kamer · € 545", diet: "Glutenvrij", message: "", answers: [["Hoe wil je verdergaan?", "Inschrijven"], ["Ervaring met yoga", "Meer dan 3 jaar"]] },
  { id: "s4", name: "Sofie Claes", email: "sofie.claes@skynet.be", phone: "0476 30 90 11", lang: "nl", at: "2026-10-28T18:25", retreat: "eifel", status: "confirmed", room: "Duokamer · € 595", diet: "", message: "Ik kom samen met mijn zus.", answers: [["Hoe wil je verdergaan?", "Inschrijven"], ["Ervaring met yoga", "1 – 3 jaar"]] },
  { id: "s5", name: "Marc Janssens", email: "marc.janssens@proximus.be", phone: "0468 21 43 65", lang: "nl", at: "2026-10-21T08:51", retreat: "eifel", status: "confirmed", room: "Single room · € 695", diet: "", message: "", answers: [["Hoe wil je verdergaan?", "Inschrijven"], ["Ervaring met yoga", "Beginner"]] },
  { id: "s6", name: "Jonas Smet", email: "jonas.smet@gmail.com", phone: "0489 66 12 03", lang: "nl", at: "2026-10-19T20:17", retreat: "eifel", status: "waitlist", room: "Gedeelde kamer · € 545", diet: "Veganistisch", message: "", answers: [["Hoe wil je verdergaan?", "Inschrijven"], ["Ervaring met yoga", "Meer dan 3 jaar"]] },
  { id: "s7", name: "Emma Dubois", email: "emma.dubois@gmail.com", phone: "+33 6 12 45 78 90", lang: "en", at: "2026-03-02T10:33", retreat: "dahab", status: "confirmed", room: "Sea-view room · € 1,290", diet: "Pescatarian", message: "First time freediving!", answers: [["How would you like to continue?", "Sign up"], ["Can you swim 200 m?", "Yes"]] },
  { id: "s8", name: "Nina Verhoeven", email: "nina.verhoeven@telenet.be", phone: "0472 98 76 54", lang: "nl", at: "2026-02-14T16:08", retreat: "dahab", status: "cancelled", room: "Gedeelde kamer · € 1.090", diet: "", message: "", answers: [["Hoe wil je verdergaan?", "Inschrijven"], ["Kan je 200 m zwemmen?", "Ja"]] },
];
const CAPACITY: Record<RetreatId, number> = { eifel: 8, rochefort: 12, dahab: 8 };

const NEWSLETTER = {
  name: "Nieuwe retreats 2027",
  subject: { nl: "{naam}, de retreats van 2027 staan online", en: "{naam}, the 2027 retreats are live" },
  heading: { nl: "Nieuwe retreats", en: "New retreats" },
  body: {
    nl: "Dag {naam},\n\nDe kalender voor 2027 staat klaar: een lang weekend yoga, pilates en wellness in Rochefort, en in mei opnieuw een week yoga & freediving in Dahab.\n\nKleine groepen, dus wacht niet te lang.",
    en: "Hi {naam},\n\nThe 2027 calendar is ready: a long weekend of yoga, pilates and wellness in Rochefort, and in May another week of yoga & freediving in Dahab.\n\nSmall groups, so don’t wait too long.",
  },
  cards: [
    { img: "/work/yoga-mail-rochefort.jpg", title: { nl: "Rochefort: Yoga, pilates en Wellness", en: "Rochefort: Yoga, pilates and Wellness" }, meta: { nl: "18 – 21 mrt 2027 · België · vanaf € 645", en: "18 – 21 Mar 2027 · Belgium · from € 645" } },
    { img: "/work/yoga-mail-dahab.jpg", title: { nl: "Dahab: Yoga & Freediving", en: "Dahab: Yoga & Freediving" }, meta: { nl: "22 – 29 mei 2027 · Egypte · vanaf € 1.050", en: "22 – 29 May 2027 · Egypt · from € 1,050" } },
  ],
  button: { nl: "Bekijk alle retreats", en: "See all retreats" },
  more: { nl: "Meer info", en: "More info" },
  foot: {
    nl: "Je krijgt deze mail omdat je je inschreef voor de nieuwsbrief van Yoga, Zen & Tonic.",
    en: "You get this mail because you signed up for the Yoga, Zen & Tonic newsletter.",
  },
  unsub: { nl: "Uitschrijven", en: "Unsubscribe" },
} as const;
const PREVIOUS = { name: "Zomer 2026", at: "2026-06-12", count: 128 };
const ME = "philippe@yogazentonic.com";
/** recipients per audience mix (contact book minus unsubscribed): [total, NL] */
const AUDIENCE_COUNT = (a: Set<string>): [number, number] =>
  a.has("contacts") ? [142, 117] : a.has("subscribers") && a.has("participants") ? [118, 97] : a.has("subscribers") ? [96, 79] : a.has("participants") ? [38, 31] : [0, 0];

type FieldKind = "string" | "text" | "date" | "number" | "auto";
const FIELDS: { id: YogaRetreatField; group: YogaRetreatGroup; kind: FieldKind; i18n?: boolean; max?: number }[] = [
  { id: "title", group: "basics", kind: "string", i18n: true, max: 40 },
  { id: "startDate", group: "basics", kind: "date" },
  { id: "endDate", group: "basics", kind: "date" },
  { id: "place", group: "basics", kind: "string", i18n: true },
  { id: "country", group: "basics", kind: "string", i18n: true },
  { id: "capacity", group: "basics", kind: "number" },
  { id: "booked", group: "basics", kind: "auto" },
  { id: "bookedExtra", group: "basics", kind: "number" },
  { id: "nutshellTitle", group: "nutshell", kind: "string", i18n: true, max: 40 },
  { id: "nutshellText", group: "nutshell", kind: "text", i18n: true, max: 400 },
  { id: "highlights", group: "nutshell", kind: "text", i18n: true },
  { id: "placeTitle", group: "place", kind: "string", i18n: true, max: 40 },
  { id: "placeText", group: "place", kind: "text", i18n: true, max: 400 },
  { id: "deposit", group: "practical", kind: "number" },
  { id: "included", group: "practical", kind: "text", i18n: true },
  { id: "notIncluded", group: "practical", kind: "text", i18n: true },
  { id: "closingTitle", group: "closing", kind: "string", i18n: true, max: 40 },
  { id: "closingText", group: "closing", kind: "text", i18n: true, max: 240 },
  { id: "seoTitle", group: "seo", kind: "string", i18n: true, max: 60 },
  { id: "seoDescription", group: "seo", kind: "text", i18n: true, max: 160 },
];
const GROUPS: YogaRetreatGroup[] = ["basics", "nutshell", "place", "practical", "closing", "seo"];
const OPTIONAL: YogaRetreatGroup[] = ["seo"];

type Values = Partial<Record<YogaRetreatField, I18n | string>>;
const INITIAL: Values = {
  title: { nl: "Eifel: Yoga & Hike", en: "Eifel: Yoga & Hike" },
  startDate: "2026-11-19",
  endDate: "2026-11-22",
  place: { nl: "Belgische Eifel", en: "Belgian Eifel" },
  country: { nl: "België", en: "" },
  capacity: "8",
  bookedExtra: "2",
  nutshellTitle: { nl: "Onze klassieker.", en: "" },
  nutshellText: {
    nl: "Dagen vol yoga, stevige hikes door eindeloos groen, en avonden bij de sauna en whirlpool. Een lang weekend om je hoofd leeg te maken en op te laden in de natuur.",
    en: "",
  },
  highlights: { nl: "Dagelijks pilates & yoga\nHikes door de Eifel\nSauna & whirlpool", en: "Daily pilates & yoga\nHikes through the Eifel\nSauna & hot tub" },
  placeTitle: { nl: "Een vakantiehuis in het groen", en: "A holiday home in the green" },
  placeText: { nl: "", en: "" },
  deposit: "150",
  included: { nl: "Verblijf (3 nachten)\nAlle maaltijden\nYoga & pilates", en: "" },
  notIncluded: { nl: "", en: "" },
  closingTitle: { nl: "Kom je mee?", en: "Coming along?" },
  closingText: { nl: "", en: "" },
  seoTitle: { nl: "", en: "" },
  seoDescription: { nl: "", en: "" },
};
/** What ✨ returns for the untouched Dutch texts (the real one calls Gemini through /api/ai). */
const TRANSLATIONS: Partial<Record<YogaRetreatField, string>> = {
  country: "Belgium",
  nutshellTitle: "Our classic.",
  nutshellText:
    "Days full of yoga, proper hikes through endless green, and evenings by the sauna and hot tub. A long weekend to clear your head and recharge in nature.",
  included: "Stay (3 nights)\nAll meals\nYoga & pilates",
};

const isI18n = (v: unknown): v is I18n => typeof v === "object" && v !== null;
const has = (s?: string) => !!s && s.trim() !== "";

// ── small icons (stroke, 20×20) ─────────────────────────────────────────────
const ICON: Record<string, ReactNode> = {
  signups: <><circle cx="8" cy="7" r="3" /><path d="M2.5 17c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" /><path d="M14 9.5l1.6 1.6L18.5 8" /></>,
  messages: <path d="M3.5 4.5h13v9h-7l-4 3v-3h-2z" />,
  contacts: <><rect x="4" y="3" width="12" height="14" rx="1.5" /><circle cx="10" cy="8.5" r="2" /><path d="M7 13.5c.5-1.4 1.6-2 3-2s2.5.6 3 2" /></>,
  newsletters: <><rect x="2.5" y="4.5" width="15" height="11" rx="1.5" /><path d="M3 5.5l7 5.5 7-5.5" /></>,
  retreats: <><circle cx="10" cy="10" r="3.2" /><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" /></>,
  forms: <><rect x="4" y="2.5" width="12" height="15" rx="1.5" /><path d="M7 7h6M7 10.5h6M7 14h3.5" /></>,
  mails: <><path d="M2.5 9.5L17.5 3l-4 14-4-5.5z" /><path d="M9.5 11.5L17.5 3" /></>,
  pages: <><path d="M5 2.5h7l3.5 3.5v11.5H5z" /><path d="M12 2.5V6h3.5" /></>,
  media: <><rect x="2.5" y="4" width="15" height="12" rx="1.5" /><circle cx="7" cy="8.2" r="1.4" /><path d="M3 14.5l4.2-3.7 3 2.6 2.6-2.2 4.2 3.3" /></>,
  sparkle: <path d="M10 2.5l1.6 4.4 4.4 1.6-4.4 1.6L10 14.5l-1.6-4.4L4 8.5l4.4-1.6zM15.5 13l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />,
  check: <path d="M4.5 10.5l3.5 3.5 7.5-8" />,
  card: <><rect x="3" y="4" width="14" height="12" rx="1.5" /><path d="M3 10h14" /></>,
  button: <><rect x="2.5" y="6.5" width="15" height="7" rx="3.5" /><path d="M7 10h6" /></>,
  star: <path d="M10 2.8l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5L2.8 8l5-.6z" />,
};
function Ico({ name, className }: { name: string; className?: string }) {
  return (
    <svg className={className ?? "yzs-ico"} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICON[name]}
    </svg>
  );
}

/** ⓘ after a field title — help on hover (desktop) and on tap/focus (phone), as in InlineFields.tsx. */
function Help({ text }: { text: string }) {
  return (
    <span className="yzs-help" tabIndex={0} aria-label={text}>
      <span aria-hidden="true">i</span>
      <span className="yzs-tip" role="tooltip">{text}</span>
    </span>
  );
}

const TONE: Record<Status, string> = { new: "blue", confirmed: "green", waitlist: "amber", cancelled: "red" };
const STATUSES: Status[] = ["new", "confirmed", "waitlist", "cancelled"];

export function YogaStudio({ copy: c }: { copy: YogaStudioCopy }) {
  const [pane, setPane] = useState<Pane>("signups");
  const [toast, setToast] = useState<{ msg: string; n: number } | null>(null);
  const say = (msg: string) => setToast((t) => ({ msg, n: (t?.n ?? 0) + 1 }));
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  // shared: sign-up statuses ↔ "Booked" on the retreat
  const [status, setStatus] = useState<Record<string, Status>>(() => Object.fromEntries(SIGNUPS.map((s) => [s.id, s.status])));
  const [values, setValues] = useState<Values>(INITIAL);
  const extra = Number(values.bookedExtra) || 0;
  const capacity = (id: RetreatId) => (id === "eifel" ? Number(values.capacity) || 0 : CAPACITY[id]);
  const booked = (id: RetreatId) =>
    SIGNUPS.filter((s) => s.retreat === id && status[s.id] === "confirmed").length + (id === "eifel" ? extra : 0);
  const newCount = Object.values(status).filter((s) => s === "new").length;

  const nav: { id: Pane | null; key: keyof YogaStudioCopy["nav"]; count?: number }[][] = [
    [
      { id: "signups", key: "signups", count: newCount },
      { id: null, key: "messages" },
      { id: null, key: "contacts" },
      { id: "newsletter", key: "newsletters" },
    ],
    [
      { id: "retreat", key: "retreats" },
      { id: null, key: "forms" },
      { id: null, key: "mails" },
      { id: null, key: "pages" },
      { id: null, key: "media" },
    ],
  ];

  return (
    <div className="yzs">
      <div className="yzs-app">
        <div className="yzs-top">
          <span className="yzs-logo" aria-hidden="true">&amp;</span>
          <b>Yoga, Zen &amp; Tonic</b>
          <span className="yzs-hint">{c.hint}</span>
          <span className="yzs-avatars" aria-hidden="true">
            <i>R</i>
            <i>P</i>
          </span>
        </div>
        <div className="yzs-body">
          <nav className="yzs-nav" aria-label="Studio">
            {nav.map((grp, gi) => (
              <div className="yzs-navgrp" key={gi}>
                <div className="yzs-divider">{gi === 0 ? c.groups.contact : c.groups.content}</div>
                {grp.map((it) =>
                  it.id ? (
                    <button
                      type="button"
                      key={it.key}
                      className={"yzs-navit" + (pane === it.id ? " on" : "")}
                      aria-pressed={pane === it.id}
                      onClick={() => setPane(it.id as Pane)}
                    >
                      <Ico name={it.key} />
                      <span>{c.nav[it.key]}</span>
                      {it.count ? <span className="yzs-count">{it.count}</span> : null}
                    </button>
                  ) : (
                    <span key={it.key} className="yzs-navit off" title={c.soon}>
                      <Ico name={it.key} />
                      <span>{c.nav[it.key]}</span>
                    </span>
                  ),
                )}
              </div>
            ))}
          </nav>
          {pane === "signups" ? (
            <SignupsPane c={c} status={status} setStatus={setStatus} booked={booked} capacity={capacity} say={say} />
          ) : pane === "newsletter" ? (
            <NewsletterPane c={c} say={say} />
          ) : (
            <RetreatPane c={c} values={values} setValues={setValues} booked={booked("eifel")} say={say} />
          )}
        </div>
        <div className="yzs-toast" role="status" aria-live="polite">
          {toast ? (
            <span key={toast.n}>
              <Ico name="check" /> {toast.msg}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

// ── Pane 1 · Sign-ups ───────────────────────────────────────────────────────
function SignupsPane({
  c,
  status,
  setStatus,
  booked,
  capacity,
  say,
}: {
  c: YogaStudioCopy;
  status: Record<string, Status>;
  setStatus: (f: (s: Record<string, Status>) => Record<string, Status>) => void;
  booked: (id: RetreatId) => number;
  capacity: (id: RetreatId) => number;
  say: (m: string) => void;
}) {
  const t = c.signups;
  const [filter, setFilter] = useState<Status | "all">("all");
  const [retreat, setRetreat] = useState<RetreatId | "">("");
  const [open, setOpen] = useState("s1");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [mailed, setMailed] = useState<Record<string, boolean>>({});

  const inRetreat = SIGNUPS.filter((s) => !retreat || s.retreat === retreat);
  const shown = inRetreat.filter((s) => filter === "all" || status[s.id] === filter);
  const doc = SIGNUPS.find((s) => s.id === open)!;
  const r = RETREATS.find((x) => x.id === doc.retreat)!;
  const cap = capacity(r.id);
  const b = booked(r.id);
  const left = cap - b;
  const label = (s: Status) => t.statuses[s];

  return (
    <>
      <div className="yzs-list" data-lenis-prevent>
        <div className="yzs-ph">{c.nav.signups}</div>
        <div className="yzs-chips">
          {(["all", ...STATUSES] as const).map((f) => (
            <button type="button" key={f} className={"yzs-chip" + (filter === f ? " on" : "")} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {f === "all" ? t.all : label(f)} ({f === "all" ? inRetreat.length : inRetreat.filter((s) => status[s.id] === f).length})
            </button>
          ))}
        </div>
        <select className="yzs-select" value={retreat} onChange={(e) => setRetreat(e.currentTarget.value as RetreatId | "")} aria-label={t.allRetreats}>
          <option value="">{t.allRetreats}</option>
          {RETREATS.filter((x) => x.id !== "rochefort").map((x) => (
            <option key={x.id} value={x.id}>
              {x.title} · {x.start.slice(0, 7)}
            </option>
          ))}
        </select>
        <div className="yzs-rows">
          {shown.length ? (
            shown.map((s) => (
              <button type="button" key={s.id} className={"yzs-row" + (open === s.id ? " on" : "")} onClick={() => setOpen(s.id)}>
                <span className="yzs-row-main">
                  <b>{s.name}</b>
                  <small>
                    {RETREATS.find((x) => x.id === s.retreat)!.title} · {fmtDate(s.at, c.months, false)}
                  </small>
                </span>
                <span className={`yzs-badge ${TONE[status[s.id]]}`}>{label(status[s.id])}</span>
              </button>
            ))
          ) : (
            <p className="yzs-empty">{t.empty}</p>
          )}
        </div>
      </div>
      <div className="yzs-doc">
        <div className="yzs-scroll" data-lenis-prevent>
          <div className="yzs-sv">
            <div className="yzs-sv-head">
              <h3>{doc.name}</h3>
              <span className={`yzs-badge ${TONE[status[doc.id]]}`}>{label(status[doc.id])}</span>
            </div>
            <p className="yzs-muted">
              {fill(t.signedUpOn, { date: fmtDate(doc.at, c.months) })} · {doc.lang.toUpperCase()}
            </p>
            <div className="yzs-retreat-card">
              <span>
                <b>{r.title}</b>
                <small>
                  {fmtDate(r.start, c.months, false)} – {fmtDate(r.end, c.months, false)}
                </small>
              </span>
              <span className={"yzs-booked" + (left < 1 ? " full" : "")}>
                {fill(t.booked, { n: b, cap })} · {left > 0 ? fill(t.left, { n: left }) : t.full}
                <i style={{ width: `${Math.min(100, (b / (cap || 1)) * 100)}%` }} />
              </span>
            </div>
            <div className="yzs-lbl">{t.status}</div>
            <div className="yzs-status">
              {STATUSES.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`yzs-btn ${TONE[s]}` + (status[doc.id] === s ? " on" : "")}
                  aria-pressed={status[doc.id] === s}
                  onClick={() => {
                    if (status[doc.id] === s) return;
                    setStatus((st) => ({ ...st, [doc.id]: s }));
                    say(fill(t.statusToast, { s: label(s) }));
                  }}
                >
                  {label(s)}
                </button>
              ))}
            </div>
            {status[doc.id] !== "confirmed" && left < 1 ? <p className="yzs-warn">⚠ {t.fullWarn}</p> : null}
            <div className="yzs-answers">
              <div className="yzs-ans">
                <span>{t.email}</span>
                <b>{doc.email}</b>
              </div>
              <div className="yzs-ans">
                <span>{t.phone}</span>
                <b>{doc.phone}</b>
              </div>
              <div className="yzs-ans">
                <span>{t.room}</span>
                <b>{doc.room}</b>
              </div>
              {doc.answers.map(([q, a]) => (
                <div className="yzs-ans" key={q}>
                  <span>{q}</span>
                  <b>{a}</b>
                </div>
              ))}
              <div className="yzs-ans">
                <span>{t.diet}</span>
                <b>{doc.diet || "-"}</b>
              </div>
              <div className="yzs-ans wide">
                <span>{t.message}</span>
                <b>{doc.message || "-"}</b>
              </div>
              <div className="yzs-ans wide">
                <span>{t.consent}</span>
                <b>
                  {t.yes} · {t.yes}
                </b>
              </div>
            </div>
            <label className="yzs-lbl" htmlFor="yzs-note">
              {t.note}
            </label>
            <textarea
              id="yzs-note"
              className="yzs-input"
              rows={2}
              placeholder={t.notePh}
              value={notes[doc.id] ?? ""}
              onChange={(e) => {
                const v = e.currentTarget.value;
                setNotes((n) => ({ ...n, [doc.id]: v }));
              }}
            />
          </div>
        </div>
        <div className="yzs-actions">
          <button
            type="button"
            className="yzs-btn primary solid"
            disabled={mailed[doc.id]}
            onClick={() => {
              setMailed((m) => ({ ...m, [doc.id]: true }));
              say(fill(t.mailSent, { name: doc.name.split(" ")[0] }));
            }}
          >
            <Ico name="newsletters" /> {t.confirmMail}
            {mailed[doc.id] ? " ✓" : ""}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Pane 2 · Newsletter ─────────────────────────────────────────────────────
function NewsletterPane({ c, say }: { c: YogaStudioCopy; say: (m: string) => void }) {
  const t = c.newsletter;
  const [tab, setTab] = useState<"content" | "send">("content");
  const [subject, setSubject] = useState<I18n>({ ...NEWSLETTER.subject });
  const [heading, setHeading] = useState<I18n>({ ...NEWSLETTER.heading });
  const [body, setBody] = useState<I18n>({ ...NEWSLETTER.body });
  const [audience, setAudience] = useState<Set<string>>(() => new Set(["subscribers", "participants"]));
  const [lang, setLang] = useState<Lang>("nl");
  const [tested, setTested] = useState(false);
  const [published, setPublished] = useState(false);
  const [sent, setSent] = useState<number | null>(null);
  const [dialog, setDialog] = useState(false);
  const [total, nl] = AUDIENCE_COUNT(audience);

  const edit = (set: (f: (v: I18n) => I18n) => void) => (l: Lang, v: string) => {
    set((o) => ({ ...o, [l]: v }));
    setPublished(false);
  };
  const steps = [true, tested, published, sent !== null];
  const name = "Anna";
  const naam = (s: string) => s.replaceAll("{naam}", name);

  return (
    <>
      <div className="yzs-list" data-lenis-prevent>
        <div className="yzs-ph">{c.nav.newsletters}</div>
        <div className="yzs-rows">
          <button type="button" className="yzs-row on">
            <span className="yzs-row-main">
              <b>{NEWSLETTER.name}</b>
              <small>{sent !== null ? fill(t.sent, { date: fmtDate("2026-11-08", c.months, false), n: sent }) : published ? c.published : c.draft}</small>
            </span>
            <span className={"yzs-badge " + (sent !== null ? "green" : published ? "green" : "amber")}>{sent !== null ? "✓" : published ? c.published : c.draft}</span>
          </button>
          <div className="yzs-row muted" title={c.soon}>
            <span className="yzs-row-main">
              <b>{PREVIOUS.name}</b>
              <small>{fill(t.sent, { date: fmtDate(PREVIOUS.at, c.months, false), n: PREVIOUS.count })}</small>
            </span>
            <span className="yzs-badge green">✓</span>
          </div>
        </div>
      </div>
      <div className="yzs-doc">
        <div className="yzs-nl" data-lenis-prevent>
          <div className="yzs-scroll" data-lenis-prevent>
            <ol className="yzs-steps">
              {t.steps.map((s, i) => (
                <li key={s} className={steps[i] ? "done" : steps.slice(0, i).every(Boolean) ? "cur" : ""}>
                  <span>{steps[i] ? <Ico name="check" /> : i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="yzs-tabs" role="tablist">
              {(["content", "send"] as const).map((k) => (
                <button type="button" role="tab" key={k} aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>
                  {k === "content" ? t.tabContent : t.tabSend}
                </button>
              ))}
            </div>
            {tab === "content" ? (
              <div className="yzs-form">
                <Row label={t.name.label} help={t.name.help}>
                  <input className="yzs-input" value={NEWSLETTER.name} readOnly />
                </Row>
                <I18nRow f={t.subject} value={subject} onChange={edit(setSubject)} />
                <I18nRow f={t.heading} value={heading} onChange={edit(setHeading)} />
                <I18nRow f={t.body} value={body} onChange={edit(setBody)} multiline />
                <div className="yzs-field">
                  <div className="yzs-flabel">
                    {t.blocks.label}
                    <Help text={t.blocks.help} />
                  </div>
                  <div className="yzs-blocks">
                    {NEWSLETTER.cards.map((k) => (
                      <div className="yzs-block" key={k.img}>
                        <Ico name="card" />
                        <span>
                          <b>{k.title.nl}</b>
                          <small>{t.blockCard}</small>
                        </span>
                      </div>
                    ))}
                    <div className="yzs-block">
                      <Ico name="button" />
                      <span>
                        <b>{NEWSLETTER.button.nl}</b>
                        <small>{t.blockButton} · /retreats</small>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="yzs-form">
                <div className="yzs-field">
                  <div className="yzs-flabel">
                    {t.audience.label}
                    <Help text={t.audience.help} />
                  </div>
                  {(["subscribers", "participants", "contacts"] as const).map((a) => (
                    <label className="yzs-check" key={a}>
                      <input
                        type="checkbox"
                        checked={audience.has(a)}
                        onChange={() => {
                          setAudience((s) => {
                            const n = new Set(s);
                            if (n.has(a)) n.delete(a);
                            else n.add(a);
                            return n;
                          });
                          setPublished(false);
                        }}
                      />
                      <span>
                        <b>{t.audiences[a].label}</b>
                        <small>{t.audiences[a].help}</small>
                      </span>
                    </label>
                  ))}
                  <p className="yzs-muted">{fill(t.recipients, { n: total, nl, en: total - nl })}</p>
                </div>
                <Row label={t.sentOn} help={t.recipientsNote}>
                  <input className="yzs-input" readOnly value={sent !== null ? fmtDate("2026-11-08T10:00", c.months) : ""} />
                </Row>
              </div>
            )}
          </div>
          <aside className="yzs-inspector" data-lenis-prevent>
            <div className="yzs-insp-head">
              <span>{t.preview}</span>
              <span className="yzs-tabs mini">
                {(["nl", "en"] as const).map((l) => (
                  <button type="button" key={l} className={lang === l ? "on" : ""} aria-pressed={lang === l} onClick={() => setLang(l)}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </span>
            </div>
            <div className="yzs-mail-subject">{naam(subject[lang] || subject.nl)}</div>
            <div className="yzs-mail">
              <div className="yzs-mail-logo">
                Yoga, Zen <i>&amp;</i> Tonic
              </div>
              <div className="yzs-mail-card">
                <div className="yzs-mail-hero">
                  <Image src="/work/yoga-mail-hero.jpg" alt="" fill sizes="320px" />
                </div>
                <div className="yzs-mail-in">
                  {heading[lang] || heading.nl ? <h4>{heading[lang] || heading.nl}</h4> : null}
                  {naam(body[lang] || body.nl)
                    .split(/\n{2,}/)
                    .map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  {NEWSLETTER.cards.map((k) => (
                    <div className="yzs-mail-rc" key={k.img}>
                      <div className="yzs-mail-rc-img">
                        <Image src={k.img} alt="" fill sizes="280px" />
                      </div>
                      <b>{k.title[lang]}</b>
                      <small>{k.meta[lang]}</small>
                      <u>{NEWSLETTER.more[lang]} →</u>
                    </div>
                  ))}
                  <span className="yzs-mail-btn">{NEWSLETTER.button[lang]}</span>
                </div>
              </div>
              <p className="yzs-mail-foot">
                {NEWSLETTER.foot[lang]} <u>{NEWSLETTER.unsub[lang]}</u>
              </p>
            </div>
            <button
              type="button"
              className="yzs-btn ghost full"
              onClick={() => {
                setTested(true);
                say(fill(t.testSent, { email: ME }));
              }}
            >
              <Ico name="newsletters" /> {t.test}
            </button>
          </aside>
        </div>
        <div className="yzs-actions">
          {sent !== null ? (
            <span className="yzs-muted">{fill(t.sent, { date: fmtDate("2026-11-08", c.months, false), n: sent })}</span>
          ) : published ? (
            <button type="button" className="yzs-btn primary solid" disabled={!total} onClick={() => setDialog(true)}>
              <Ico name="newsletters" /> {t.sendBtn}
            </button>
          ) : (
            <button
              type="button"
              className="yzs-btn green solid"
              onClick={() => {
                setPublished(true);
                say(t.publishedToast);
              }}
            >
              {c.publish}
            </button>
          )}
        </div>
        {dialog ? (
          <div className="yzs-dialog-bg" onClick={() => setDialog(false)}>
            <div className="yzs-dialog" role="dialog" aria-modal="true" aria-label={fill(t.dialogTitle, { name: NEWSLETTER.name })} onClick={(e) => e.stopPropagation()}>
              <h4>{fill(t.dialogTitle, { name: NEWSLETTER.name })}</h4>
              <b>{fill(t.recipients, { n: total, nl, en: total - nl })}</b>
              <p className="yzs-muted">{t.recipientsNote}</p>
              {!tested ? <p className="yzs-muted">{t.tip}</p> : null}
              <div className="yzs-dialog-act">
                <button type="button" className="yzs-btn ghost" onClick={() => setDialog(false)}>
                  {t.cancel}
                </button>
                <button
                  type="button"
                  className="yzs-btn primary solid"
                  onClick={() => {
                    setSent(total);
                    setDialog(false);
                    say(fill(t.sentToast, { n: total }));
                  }}
                >
                  {fill(t.sendTo, { n: total })}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

// ── shared field rows (InlineFields.tsx + I18nTabs.tsx) ─────────────────────
function Row({ label, help, children, wide }: { label: string; help: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={"yzs-field" + (wide ? "" : " inline")}>
      <div className="yzs-flabel">
        {label}
        <Help text={help} />
      </div>
      {children}
    </div>
  );
}

function I18nRow({
  f,
  value,
  onChange,
  multiline,
  onTranslate,
  translateLabel,
  busy,
  max,
}: {
  f: { label: string; help: string };
  value: I18n;
  onChange: (l: Lang, v: string) => void;
  multiline?: boolean;
  onTranslate?: () => void;
  translateLabel?: string;
  busy?: boolean;
  max?: number;
}) {
  const [l, setL] = useState<Lang>("nl");
  const v = value[l] ?? "";
  const over = max && v.length > max;
  const tabs = (
    <span className="yzs-i18n">
      <span className="yzs-tabs mini">
        {(["nl", "en"] as const).map((x) => (
          <button type="button" key={x} className={(l === x ? "on" : "") + (has(value[x]) ? "" : " dot")} aria-pressed={l === x} onClick={() => setL(x)}>
            {x.toUpperCase()}
          </button>
        ))}
      </span>
      {onTranslate ? (
        <button type="button" className={"yzs-ai" + (busy ? " busy" : "")} title={translateLabel} aria-label={translateLabel} onClick={onTranslate} disabled={busy}>
          <Ico name="sparkle" />
        </button>
      ) : null}
    </span>
  );
  const input = multiline ? (
    <textarea className={"yzs-input" + (busy && l === "en" ? " shimmer" : "")} rows={4} value={v} onChange={(e) => onChange(l, e.currentTarget.value)} />
  ) : (
    <input className={"yzs-input" + (busy && l === "en" ? " shimmer" : "")} value={v} onChange={(e) => onChange(l, e.currentTarget.value)} />
  );
  return (
    <div className={"yzs-field" + (multiline ? "" : " inline")}>
      <div className="yzs-flabel">
        {f.label}
        <Help text={f.help} />
        {multiline ? tabs : null}
      </div>
      <div className="yzs-frow">
        {input}
        {multiline ? null : tabs}
      </div>
      {over ? (
        <small className="yzs-soft-warn">
          {v.length} / {max}
        </small>
      ) : null}
    </div>
  );
}

// ── Pane 3 · Retreat ────────────────────────────────────────────────────────
function RetreatPane({
  c,
  values,
  setValues,
  booked,
  say,
}: {
  c: YogaStudioCopy;
  values: Values;
  setValues: (f: (v: Values) => Values) => void;
  booked: number;
  say: (m: string) => void;
}) {
  const t = c.retreat;
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("all");
  const [group, setGroup] = useState<YogaRetreatGroup>("basics");
  const [busy, setBusy] = useState<YogaRetreatField[]>([]);
  const [published, setPublished] = useState(false);
  const shown = RETREATS.filter((r) => filter === "all" || (filter === "upcoming") === r.upcoming);

  const set = (id: YogaRetreatField, v: I18n | string) => {
    setValues((o) => ({ ...o, [id]: v }));
    setPublished(false);
  };

  const status = useMemo(
    () =>
      GROUPS.map((g) => {
        const fs = FIELDS.filter((f) => f.group === g && f.kind !== "auto");
        const done = fs.filter((f) => {
          const v = values[f.id];
          return isI18n(v) ? has(v.nl) : has(v);
        });
        const noEn = fs.filter((f) => {
          const v = values[f.id];
          return f.i18n && isI18n(v) && has(v.nl) && !has(v.en);
        });
        return { g, fs, done, noEn, optional: OPTIONAL.includes(g) };
      }),
    [values],
  );
  const counted = status.filter((s) => !s.optional);
  const total = counted.reduce((n, s) => n + s.fs.length, 0);
  const done = counted.reduce((n, s) => n + s.done.length, 0);
  const noEn = status.flatMap((s) => s.noEn);
  const pct = Math.round((done / total) * 100);

  const translate = (ids: YogaRetreatField[]) => {
    const ok = ids.filter((id) => {
      const v = values[id];
      return isI18n(v) && TRANSLATIONS[id] !== undefined && v.nl === (INITIAL[id] as I18n).nl;
    });
    if (ok.length < ids.length && ids.length === 1) {
      say(t.translateEdited);
      return;
    }
    if (!ok.length) return;
    setBusy((b) => [...b, ...ok]);
    setTimeout(() => {
      setValues((o) => {
        const n = { ...o };
        ok.forEach((id) => (n[id] = { ...(o[id] as I18n), en: TRANSLATIONS[id]! }));
        return n;
      });
      setBusy((b) => b.filter((x) => !ok.includes(x)));
      setPublished(false);
      say(fill(t.translated, { n: ok.length }));
    }, 900);
  };

  return (
    <>
      <div className="yzs-list" data-lenis-prevent>
        <div className="yzs-ph">{c.nav.retreats}</div>
        <div className="yzs-row muted single" title={c.soon}>
          <Ico name="pages" />
          <span className="yzs-row-main">
            <b>{t.page}</b>
            <small>{t.pageSub}</small>
          </span>
        </div>
        <hr className="yzs-hr" />
        <div className="yzs-chips">
          {(["upcoming", "past", "all"] as const).map((f) => (
            <button type="button" key={f} className={"yzs-chip" + (filter === f ? " on" : "")} aria-pressed={filter === f} onClick={() => setFilter(f)}>
              {t[f]}
            </button>
          ))}
        </div>
        <div className="yzs-rows">
          {shown.map((r) =>
            r.id === "eifel" ? (
              <button type="button" key={r.id} className="yzs-row on">
                <span className="yzs-row-main">
                  <b>{(values.title as I18n).nl || r.title}</b>
                  <small>{fmtDate(String(values.startDate || r.start), c.months, false)}</small>
                </span>
              </button>
            ) : (
              <div key={r.id} className="yzs-row muted" title={c.soon}>
                <span className="yzs-row-main">
                  <b>
                    {r.title}
                    {r.id === "rochefort" ? <Ico name="star" className="yzs-star" /> : null}
                  </b>
                  <small>
                    {fmtDate(r.start, c.months, false)}
                    {r.id === "rochefort" ? ` · ${t.featured}` : ""}
                  </small>
                </span>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="yzs-doc">
        <div className="yzs-scroll" data-lenis-prevent>
          <div className={"yzs-overview" + (pct === 100 ? " full" : "")}>
            <div className="yzs-ov-top">
              <b>
                {fill(t.progress, { pct })}
                {noEn.length ? ` · ${fill(t.noEn, { n: noEn.length })}` : ""}
              </b>
              {noEn.length ? (
                <button type="button" className="yzs-btn ghost small" onClick={() => translate(noEn.map((f) => f.id))} disabled={busy.length > 0}>
                  <Ico name="sparkle" /> {t.translateAll}
                </button>
              ) : null}
            </div>
            <div className="yzs-bar">
              <i style={{ width: `${pct}%` }} />
            </div>
            <div className="yzs-tiles">
              {status.map((s) => {
                const full = s.done.length === s.fs.length;
                const empty = s.done.length === 0;
                const ok = full || (s.optional && !empty);
                const missing = s.fs.filter((f) => !s.done.includes(f)).map((f) => t.fields[f.id].label);
                return (
                  <button type="button" key={s.g} className={"yzs-tile" + (group === s.g ? " on" : "")} onClick={() => setGroup(s.g)}>
                    <span className={"yzs-dotst" + (ok ? " ok" : empty ? "" : " wip")}>{ok ? <Ico name="check" /> : null}</span>
                    <span>
                      <b>
                        {t.groups[s.g].t}{" "}
                        <small>
                          {s.optional ? (empty ? t.standard : t.custom) : `${s.done.length}/${s.fs.length}`}
                          {s.noEn.length ? ` · ${fill(t.noEn, { n: s.noEn.length })}` : ""}
                        </small>
                      </b>
                      <small>{t.groups[s.g].where}</small>
                      {!s.optional && missing.length && !empty ? (
                        <small className="blue">
                          {t.stillEmpty} {missing.join(", ")}
                        </small>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="yzs-tabs groups" role="tablist">
            {GROUPS.map((g) => (
              <button type="button" role="tab" key={g} aria-selected={group === g} className={group === g ? "on" : ""} onClick={() => setGroup(g)}>
                {t.groups[g].t}
              </button>
            ))}
          </div>
          <div className="yzs-form">
            {FIELDS.filter((f) => f.group === group).map((f) => {
              const fc = t.fields[f.id];
              const v = values[f.id];
              if (f.kind === "auto")
                return (
                  <Row key={f.id} label={fc.label} help={fc.help}>
                    <input className="yzs-input ro" readOnly value={`${booked} · ${t.auto}`} />
                  </Row>
                );
              if (f.i18n && isI18n(v))
                return (
                  <I18nRow
                    key={f.id}
                    f={fc}
                    value={v}
                    max={f.max}
                    multiline={f.kind === "text"}
                    onChange={(l, x) => set(f.id, { ...v, [l]: x })}
                    onTranslate={() => translate([f.id])}
                    translateLabel={t.translate}
                    busy={busy.includes(f.id)}
                  />
                );
              return (
                <Row key={f.id} label={fc.label} help={fc.help}>
                  <input
                    className="yzs-input"
                    type={f.kind === "date" ? "date" : f.kind === "number" ? "number" : "text"}
                    min={f.kind === "number" ? 0 : undefined}
                    value={String(v ?? "")}
                    onChange={(e) => set(f.id, e.currentTarget.value)}
                  />
                </Row>
              );
            })}
          </div>
        </div>
        <div className="yzs-actions">
          <span className="yzs-muted">{published ? c.published : c.draft}</span>
          <button
            type="button"
            className="yzs-btn green solid"
            disabled={published}
            onClick={() => {
              setPublished(true);
              say(c.published);
            }}
          >
            {c.publish}
          </button>
        </div>
      </div>
    </>
  );
}
