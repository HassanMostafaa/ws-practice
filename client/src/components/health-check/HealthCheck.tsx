import { getServerHealth } from "@/service/health.service";
import { IoShieldOutline } from "react-icons/io5";

export default async function HealthCheck() {
  const data = await getServerHealth({});
  const isHealthy = data.status === "success";

  return (
    <section className="flex-1  max-w-xl flex flex-col  rounded-lg border border-white/25 bg-black/30">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 px-4 py-3">
        <div>
          <p className="text-xs flex gap-1 items-center text-white/60">
            <IoShieldOutline size={20} />
            HTTPS protocol
          </p>
          <h2 className="text-base font-semibold text-white">Health check</h2>
        </div>

        <span className="flex items-center gap-2 rounded-lg border border-white/20 px-2 py-1 text-xs text-white/70">
          <span
            className={`h-2 w-2  rounded-full ${
              isHealthy ? "bg-emerald-400" : "bg-rose-400"
            }`}
            aria-hidden="true"
          />
          {isHealthy ? "Healthy" : "Error"}
        </span>
      </header>

      <div
        className={`m-4 flex-1  rounded-lg border px-3  py-2 text-sm ${
          isHealthy
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
            : "border-rose-400/40 bg-rose-400/10 text-rose-100"
        }`}
        role={isHealthy ? "status" : "alert"}
      >
        {data.message || "No health response received."}
      </div>
    </section>
  );
}
