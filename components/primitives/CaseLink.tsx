import type { CaseLink as CaseLinkData } from "@/content/home";

// "CASE: <b>Name</b> — detail ↗" style links used by cards and stack rows.
export function CaseLink({
  data,
  className = "c-case",
}: {
  data: CaseLinkData;
  className?: string;
}) {
  const ext = data.external;
  return (
    <a
      className={className}
      href={data.href}
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
