type NoteCheckboxProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
};

export const NoteCheckbox = ({
  checked,
  label,
  onChange,
}: NoteCheckboxProps) => {
  return (
    <label className="group inline-flex cursor-pointer items-center gap-2">
      <span className="text-xs text-white/50">{label}</span>
      <input
        checked={checked}
        className="peer sr-only"
        onChange={onChange}
        type="checkbox"
      />
      <span
        aria-hidden="true"
        className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
          checked
            ? "border-cyan-300 bg-cyan-300 text-black"
            : "border-white/20 bg-white/5 text-transparent group-hover:border-white/40 peer-focus-visible:border-cyan-300"
        }`}
      >
        <span className="h-2.5 w-2.5 rounded-sm bg-current" />
      </span>
    </label>
  );
};
