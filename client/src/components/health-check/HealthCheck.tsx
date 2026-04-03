import { getServerHealth } from "@/service/health.service";

export default async function HealthCheck() {
  const data = await getServerHealth({ fail: true });
  console.log("Health check data:", data);

  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
      ✅ {data.message}
    </div>
  );
}
