import Link from "next/link";

export function Pagination({ page }: { page: number }) {
  return (
    <div>
      {page > 1 && <Link href={`?page=${page - 1}`}>Anterior</Link>}
      <Link href={`?page=${page + 1}`}>Siguiente</Link>
    </div>
  );
}