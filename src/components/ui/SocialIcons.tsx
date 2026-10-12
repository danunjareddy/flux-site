import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { studio, teamEmails, type TeamMember } from "../../config/content";

interface Item {
  label: string;
  href: string;
  icon: typeof Mail;
  external: boolean;
}

const linkClass =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full px-3 text-muted transition hover:bg-ink/10 hover:text-ink";

function List({ items, className, showLabels }: { items: Item[]; className: string; showLabels: boolean }) {
  if (items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={linkClass}
          >
            <Icon size={18} aria-hidden />
            {showLabels && <span className="text-sm">{label.replace(/^\S+ (GitHub|LinkedIn)$/, "$1")}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

interface Props {
  className?: string;
  showLabels?: boolean;
}

/** Studio-level links (email to the whole team, WhatsApp). Shows only what is configured. */
export default function SocialLinks({ className = "", showLabels = false }: Props) {
  const whatsappDigits = studio.whatsapp.replace(/\D/g, "");
  const items: Item[] = [
    {
      label: "Email us",
      href: teamEmails.length > 0 ? `mailto:${teamEmails.join(",")}` : "",
      icon: Mail,
      external: false,
    },
    {
      label: "WhatsApp",
      href: whatsappDigits ? `https://wa.me/${whatsappDigits}` : "",
      icon: MessageCircle,
      external: true,
    },
  ].filter((i) => i.href);
  return <List items={items} className={className} showLabels={showLabels} />;
}

/** A team member's own GitHub and LinkedIn. Shows only what is configured. */
export function MemberLinks({ member, className = "" }: { member: TeamMember; className?: string }) {
  const items: Item[] = [
    { label: `${member.shortName} GitHub`, href: member.github, icon: Github, external: true },
    { label: `${member.shortName} LinkedIn`, href: member.linkedin, icon: Linkedin, external: true },
  ].filter((i) => i.href);
  return <List items={items} className={className} showLabels={false} />;
}
