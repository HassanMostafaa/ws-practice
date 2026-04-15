type NoteFieldProps = {
  helperText?: string;
  label: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
};

export const NoteField = ({
  helperText,
  label,
  multiline = false,
  onChange,
  placeholder,
  value,
}: NoteFieldProps) => {
  const fieldClassName =
    "mt-2 w-full rounded-lg border border-white/25 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40";

  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      {multiline ? (
        <textarea
          className={`${fieldClassName} min-h-32 resize-y`}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
        />
      ) : (
        <input
          className={`${fieldClassName} min-h-10`}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type="text"
          value={value}
        />
      )}
      {helperText ? (
        <span className="mt-1 block text-xs text-white/40">{helperText}</span>
      ) : null}
    </label>
  );
};
