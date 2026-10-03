import { BookOpen, ScrollText, Gavel, History, GraduationCap, PenLine, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { editorialStatusLabels, type EditorialStatus } from "@/lib/site-config";
import type { SourceType } from "@/lib/types/content";
import { cn } from "@/lib/utils";

const sourceTypeMeta: Record<SourceType, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  coran: { label: "Texte coranique", icon: BookOpen },
  hadith: { label: "Hadith référencé", icon: ScrollText },
  avis_juridique: { label: "Avis juridique attribué", icon: Gavel },
  recit_historique: { label: "Récit historique sourcé", icon: History },
  explication_pedagogique: { label: "Explication pédagogique", icon: GraduationCap },
  contenu_editorial: { label: "Contenu éditorial", icon: PenLine },
};

export function SourceTypeBadge({ type, className }: { type: SourceType; className?: string }) {
  const meta = sourceTypeMeta[type];
  const Icon = meta.icon;
  return (
    <Badge variant="outline" className={cn("gap-1.5", className)}>
      <Icon className="h-3 w-3" />
      {meta.label}
    </Badge>
  );
}

export function ToVerifyBadge({ className }: { className?: string }) {
  return (
    <Badge variant="warning" className={cn("gap-1.5", className)}>
      <AlertTriangle className="h-3 w-3" />
      Référence à vérifier
    </Badge>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <Badge variant="muted" className={className}>
      Contenu de démonstration
    </Badge>
  );
}

const statusVariant: Record<EditorialStatus, "muted" | "warning" | "success" | "default" | "danger"> = {
  brouillon: "muted",
  references_a_completer: "warning",
  en_cours_de_verification: "warning",
  verifie: "success",
  approuve: "success",
  publie: "default",
  a_reviser: "danger",
  archive: "muted",
};

export function EditorialStatusBadge({ status, className }: { status: EditorialStatus; className?: string }) {
  return (
    <Badge variant={statusVariant[status]} className={className}>
      {editorialStatusLabels[status]}
    </Badge>
  );
}
