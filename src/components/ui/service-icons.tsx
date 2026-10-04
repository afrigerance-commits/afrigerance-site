import {
  Building2,
  Cable,
  Cctv,
  Clock,
  DatabaseBackup,
  Fingerprint,
  Flame,
  GraduationCap,
  HardHat,
  Headset,
  House,
  Landmark,
  MonitorCog,
  Network,
  PhoneCall,
  ScanSearch,
  Server,
  ShieldCheck,
  Store,
  type LucideIcon,
} from "lucide-react";

/** Pictogramme de chaque prestation (identifiants de src/content/services.ts). */
const prestationIcons: Record<string, LucideIcon> = {
  parc: MonitorCog,
  support: Headset,
  infrastructures: Server,
  cybersecurite: ShieldCheck,
  telephonie: PhoneCall,
  sauvegardes: DatabaseBackup,
  audit: ScanSearch,
  cablage: Cable,
  videosurveillance: Cctv,
  "controle-acces": Fingerprint,
  pointage: Clock,
  incendie: Flame,
};

/** Pictogramme de chaque public (identifiants de src/content/home.ts). */
const audienceIcons: Record<string, LucideIcon> = {
  pme: Building2,
  education: GraduationCap,
  administrations: Landmark,
  commerces: Store,
  btp: HardHat,
  particuliers: House,
};

/** Pictogramme de chaque pôle. */
const poleIcons: Record<string, LucideIcon> = {
  infogerance: Server,
  integration: Network,
};

type IconProps = { id: string; className?: string; strokeWidth?: number };

function render(map: Record<string, LucideIcon>, fallback: LucideIcon, { id, className, strokeWidth = 1.6 }: IconProps) {
  const Icon = map[id] ?? fallback;
  return <Icon aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}

export function PrestationIcon(props: IconProps) {
  return render(prestationIcons, ShieldCheck, props);
}

export function AudienceIcon(props: IconProps) {
  return render(audienceIcons, Building2, props);
}

export function PoleIcon(props: IconProps) {
  return render(poleIcons, Server, props);
}
