export const ProjectHeader = () => {
  return (
    <section className="w-full max-w-3xl rounded-lg border border-white/25 bg-black/30 px-4 py-5">
      <p className="text-xs font-semibold uppercase text-white/60">
        Practice workspace
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white max-sm:text-2xl">
        Full-stack project refresher
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
        Next.js, React, Tailwind CSS, Express, WebSockets, and PostgreSQL in
        one project. The API health check confirms the server is running, the
        server location request reads from Postgres, and the WebSocket test
        echoes user messages through a live connection.
      </p>
    </section>
  );
};
