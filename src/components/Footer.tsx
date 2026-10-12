import { navItems, site } from "../config/content";
import SocialLinks from "./ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-soft border-t">
      <div className="mx-auto flex max-w-page flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-xl font-bold">
            <span className="inline-flex items-center gap-2">
            <img src="/logo-mark.png" alt="" width={28} height={28} className="h-7 w-7" />
            {site.name}
          </span>
          </p>
          <p className="mt-2 text-sm text-muted">{site.tagline}</p>
          <SocialLinks className="-ml-3 mt-4" />
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:grid-cols-3">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="inline-flex min-h-[44px] items-center text-sm text-muted transition hover:text-ink"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="border-soft border-t px-5 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
