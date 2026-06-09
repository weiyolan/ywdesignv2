import type { CaseLink as CaseLinkData } from "@/content/home";
import { localizedHref, type Locale } from "@/lib/i18n";

// "CASE: <b>Name</b> — detail ↗" style links used by cards and stack rows.
export function CaseLink({
  data,
  lang,
  className = "c-case",
}: {
  data: CaseLinkData;
  lang: Locale;
  className?: string;
}) {
  const ext = data.external;
  return (
    <a
      className={className}
      href={localizedHref(data.href, lang)}
      {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {data.pre}
      {data.strong ? (
        <>
          {" "}
          <b>{data.strong}</b>
        </>
      ) : null}
      {data.post ? <> {data.post}</> : null}
    </a>
  );
}
