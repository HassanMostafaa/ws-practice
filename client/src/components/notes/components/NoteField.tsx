type NoteFieldProps = {
  helperText?: string;
  label: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
  required?: boolean;
  name: string;
  errorText?: string;
};

const Astrisk = () => <span className="ms-1 text-base text-red-400">*</span>;

export const NoteField = ({
  helperText,
  label,
  multiline = false,
  onChange,
  placeholder,
  value,
  required,
  name,
  errorText,
}: NoteFieldProps) => {
  const fieldClassName = `mt-2 w-full rounded-lg border  bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/40 ${errorText ? "border-red-400" : "border-white/25"}`;

  return (
    <label className="block">
      <span className="text-sm text-white/70">
        {label}
        {required ? <Astrisk /> : ""}
      </span>
      {multiline ? (
        <textarea
          className={`${fieldClassName} min-h-32 resize-y`}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          value={value}
          name={name}
        />
      ) : (
        <input
          className={`${fieldClassName} min-h-10`}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type="text"
          value={value}
          name={name}
        />
      )}
      {!errorText && helperText ? (
        <span className="mt-1 block text-xs text-white/40">{helperText}</span>
      ) : null}

      {errorText ? (
        <span className="mt-1 block text-xs text-red-400">{errorText}</span>
      ) : null}
    </label>
  );
};
