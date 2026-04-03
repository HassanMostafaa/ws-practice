import { getServerHealth } from "@/service/health.service";

export default async function HealthCheck() {
  const data = await getServerHealth({});

  return (
    <div className="rounded-xl  bg-green-800 p-4 text-green-100">
      {data.message}
    </div>
  );
}
