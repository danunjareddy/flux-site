import { team, type PersonFilterValue } from "../../config/content";

interface Props {
  value: PersonFilterValue;
  onChange: (value: PersonFilterValue) => void;
  label: string;
}

export default function PersonFilter({ value, onChange, label }: Props) {
  const options: { id: PersonFilterValue; name: string }[] = [
    { id: "all", name: "Everyone" },
    ...team.map((m) => ({ id: m.id as PersonFilterValue, name: m.shortName })),
  ];
  return (
    <div role="group" aria-label={label} className="mb-8 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={`min-h-[44px] rounded-full px-4 text-sm transition ${
            value === o.id ? "bg-ink text-bg" : "border-soft border text-muted hover:text-ink"
          }`}
        >
          {o.name}
        </button>
      ))}
    </div>
  );
}
