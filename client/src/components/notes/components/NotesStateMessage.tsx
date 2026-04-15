type NotesStateTone = "error" | "muted";

type NotesStateMessageProps = {
  message: string;
  title: string;
  tone?: NotesStateTone;
};

const toneClassName: Record<NotesStateTone, string> = {
  error: "border-rose-400/40 bg-rose-400/10 text-rose-100",
  muted: "border-white/20 bg-black/30 text-white/70",
};

export const NotesStateMessage = ({
  message,
  title,
  tone = "muted",
}: NotesStateMessageProps) => {
  return (
    <div className={`rounded-lg border p-4 ${toneClassName[tone]}`}>
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
};
