import { getServerLocation } from "@/service/server-location.service";

export const ServerLocation = async () => {
  const { data, message, status } = await getServerLocation();
  const hasLocation = status === "success" && Boolean(data?.location);

  return (
    <section className="flex-1  max-w-xl overflow-hidden rounded-lg border border-white/25 bg-black/30">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 px-4 py-3">
        <div>
          <p className="text-xs text-white/60">API origin</p>
          <h2 className="text-base font-semibold text-white">
            Server location
          </h2>
        </div>

        <span className="flex items-center gap-2 rounded-lg border border-white/20 px-2 py-1 text-xs text-white/70">
          <span
            className={`h-2 w-2 rounded-full ${
              hasLocation ? "bg-cyan-300" : "bg-rose-400"
            }`}
            aria-hidden="true"
          />
          {hasLocation ? "Resolved" : "Unavailable"}
        </span>
      </header>

      <div
        className={`m-4 rounded-lg border px-3 py-2 text-sm ${
          hasLocation
            ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-50"
            : "border-rose-400/40 bg-rose-400/10 text-rose-100"
        }`}
        role={hasLocation ? "status" : "alert"}
      >
        <p className="text-xs font-semibold uppercase">Location</p>
        <p className="mt-1 break-words">
          {data?.location || message || "Unknown location."}
        </p>
      </div>
    </section>
  );
};
