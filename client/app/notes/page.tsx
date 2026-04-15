import { Notes } from "@/components/notes/Notes";
import { getAllNotes } from "@/service/notes/getAllNotes.service";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const data = await getAllNotes({});
  const serverData = data?.data;

  return (
    <main className="container mx-auto flex-1 py-10 max-md:px-4">
      <Notes serverData={serverData} />
    </main>
  );
}
