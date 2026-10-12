import { team, type MemberId, type TeamMember } from "../config/content";
import ResumeButton from "./ui/ResumeButton";
import SectionHeading from "./ui/SectionHeading";
import { MemberLinks } from "./ui/SocialIcons";

function hire(id: MemberId) {
  window.dispatchEvent(new CustomEvent<MemberId>("hire-member", { detail: id }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

function MemberCard({ member }: { member: TeamMember }) {
  const { education } = member;
  return (
    <article className="glass flex h-full flex-col rounded-3xl p-6 sm:p-8">
      <header className="flex items-center gap-4">
        <span
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink/10 font-display text-lg font-bold"
        >
          <span className="gradient-text">{member.initials}</span>
        </span>
        <div>
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-sm text-blue">{member.role}</p>
        </div>
      </header>

      <p className="mt-5 leading-relaxed text-muted">{member.bio}</p>

      <dl className="mt-6 space-y-1 border-t border-soft pt-5">
        <dt className="text-sm font-medium">Education</dt>
        <dd className="text-muted">
          <span className="block text-ink">{education.degree}</span>
          <span className="block text-sm">
            {education.institution}, {education.location}
          </span>
          <span className="block text-sm">
            {[education.duration, education.status].filter(Boolean).join(" · ")}
          </span>
        </dd>
      </dl>

      {member.experience.length > 0 && (
        <div className="mt-5 border-t border-soft pt-5">
          <h4 className="text-sm font-medium">Experience</h4>
          <ul className="mt-3 space-y-4">
            {member.experience.map((e) => (
              <li key={`${e.organization}-${e.title}`}>
                <p className="text-ink">
                  {e.title}, {e.organization}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{e.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ul className="mt-5 flex flex-wrap gap-2 border-t border-soft pt-5" aria-label={`${member.shortName}'s focus areas`}>
        {member.focus.map((f) => (
          <li key={f} className="chip">
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
        <button type="button" onClick={() => hire(member.id)} className="btn-primary">
          Hire {member.shortName}
        </button>
        <ResumeButton resume={member.resume} />
        <MemberLinks member={member} />
      </div>
    </article>
  );
}

export default function TeamSection() {
  return (
    <section id="team" aria-labelledby="team-title" className="section">
      <SectionHeading
        id="team-title"
        title="Meet the team"
        description="Two B.Tech students at Lakireddy Bali Reddy College of Engineering. Each project is built by one or both of us."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {team.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
    </section>
  );
}
