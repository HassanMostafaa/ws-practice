type NotesPaginationDetailsProps = {
  pageNumber: number;
  pageSize: number;
  total: number;
};

export const NotesPaginationDetails = ({
  pageNumber,
  pageSize,
  total,
}: NotesPaginationDetailsProps) => {
  if (total === 0) {
    return <p className="text-sm text-white/60">Showing 0 notes</p>;
  }

  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, total);

  return (
    <p className="text-sm text-white/60">
      Showing {start} to {end} out of {total}
    </p>
  );
};
