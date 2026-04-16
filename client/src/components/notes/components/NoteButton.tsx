import type { ButtonHTMLAttributes, ReactNode } from "react";

type NoteButtonVariant = "danger" | "primary" | "secondary";

type NoteButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: NoteButtonVariant;
};

const variantClassName: Record<NoteButtonVariant, string> = {
  danger: "border-rose-400/40 text-rose-100 hover:border-rose-300",
  primary: "border-white bg-white text-black active:opacity-70",
  secondary:
    "border-white/20 text-white/70 hover:border-white/40 hover:text-white",
};

export const NoteButton = ({
  children,
  className = "",
  variant = "secondary",
  ...props
}: NoteButtonProps) => {
  return (
    <button
      className={`rounded-lg border px-4 py-2 active:scale-95 hover:scale-102 transition-all text-sm disabled:cursor-not-allowed disabled:opacity-50 ${variantClassName[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
