import { ExternalLink } from "lucide-react";
import { SourceTypeBadge, ToVerifyBadge } from "@/components/islamic/reliability-badge";
import type { SourceReference } from "@/lib/types/content";

export function SourceReferenceCard({ source }: { source: SourceReference }) {
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        <SourceTypeBadge type={source.type} />
        {source.aVerifier && <ToVerifyBadge />}
      </div>
      <p className="text-sm font-medium text-foreground">
        {source.auteur ? `${source.auteur}, ` : ""}
        {source.titre}
        {source.edition ? ` — ${source.edition}` : ""}
      </p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted sm:grid-cols-3">
        {source.sourate && (
          <div>
            <dt className="inline font-medium">Sourate : </dt>
            <dd className="inline">{source.sourate}</dd>
          </div>
        )}
        {source.verset && (
          <div>
            <dt className="inline font-medium">Verset : </dt>
            <dd className="inline">{source.verset}</dd>
          </div>
        )}
        {source.numeroHadith && (
          <div>
            <dt className="inline font-medium">Hadith n° : </dt>
            <dd className="inline">{source.numeroHadith}</dd>
          </div>
        )}
        {source.volume && (
          <div>
            <dt className="inline font-medium">Volume : </dt>
            <dd className="inline">{source.volume}</dd>
          </div>
        )}
        {source.page && (
          <div>
            <dt className="inline font-medium">Page : </dt>
            <dd className="inline">{source.page}</dd>
          </div>
        )}
        {source.chapitre && (
          <div>
            <dt className="inline font-medium">Chapitre : </dt>
            <dd className="inline">{source.chapitre}</dd>
          </div>
        )}
        {source.gradeAuthenticite && (
          <div className="col-span-full">
            <dt className="inline font-medium">Authenticité : </dt>
            <dd className="inline">{source.gradeAuthenticite}</dd>
          </div>
        )}
      </dl>
      {source.lienExterne && (
        <a
          href={source.lienExterne}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          Consulter la source <ExternalLink className="h-3 w-3" />
        </a>
      )}
      {source.verificateur && (
        <p className="text-xs text-muted">
          Vérifié par {source.verificateur}
          {source.dateVerification ? ` le ${source.dateVerification}` : ""}.
        </p>
      )}
    </li>
  );
}

export function SourceReferenceList({ sources }: { sources: SourceReference[] }) {
  if (sources.length === 0) return null;
  return (
    <ul className="flex flex-col gap-3">
      {sources.map((source) => (
        <SourceReferenceCard key={source.id} source={source} />
      ))}
    </ul>
  );
}
