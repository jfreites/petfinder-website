"use client";

export default function ErrorPage({ error }: { error: Error }) {
  return (
    <section className="grid place-content-center min-h-screen">
      <h2 className="text-xl font-bold mb-4">Algo fallo! Intenta de nuevo.</h2>
      {error && <p className="text-red-500 text-center">{error.message}</p>}
    </section>
  );
}
