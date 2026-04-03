import HealthCheck from "@/components/health-check/HealthCheck";
import { WSController } from "@/components/ws-controller/WSController";

export default function Home() {
  return (
    <main className="container mx-auto py-10 space-y-10 max-md:px-4">
      <HealthCheck />

      {/* WEBSOCKET TEST */}
      <WSController />
    </main>
  );
}
