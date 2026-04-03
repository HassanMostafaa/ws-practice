import HealthCheck from "@/components/health-check/HealthCheck";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center p-16 bg-white dark:bg-black gap-6">
        <HealthCheck />
      </main>
    </div>
  );
}
