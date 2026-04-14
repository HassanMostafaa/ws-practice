import HealthCheck from "@/components/health-check/HealthCheck";
import { ServerLocation } from "@/components/server-location/ServerLocation";
import { WSController } from "@/components/ws-controller/WSController";

export default function Home() {
  return (
    <main className="container mx-auto py-10 space-y-10 max-md:px-4">
      <div className="flex md:flex-row flex-wrap gap-2">
        <HealthCheck />

        {/* SERVER LOCATION  */}
        <ServerLocation />
      </div>

      {/* WEBSOCKET TEST */}
      <WSController />
    </main>
  );
}
