interface SegmentedOption<T extends string | number> {
  value: T;
  label: string;
}

interface SegmentedProps<T extends string | number> {
  options: SegmentedOption<NoInfer<T>>[];
  value: T;
  onChange: (value: NoInfer<T>) => void;
  ariaLabel: string;
  dark?: boolean;
  className?: string;
}

/** Apple-style segmented control, exposed as a radio group. */
function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  ariaLabel,
  dark = false,
  className = "",
}: SegmentedProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`inline-flex flex-wrap gap-0.5 rounded-full p-1 ${dark ? "bg-white/10" : "bg-apple-fill"} ${className}`}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`min-h-10 rounded-full px-5 text-[15px] font-semibold transition-all ${
              selected
                ? dark
                  ? "bg-white text-apple-ink shadow"
                  : "bg-white text-apple-ink shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
                : dark
                  ? "text-white/60 hover:text-white"
                  : "text-apple-secondary hover:text-apple-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default Segmented;
