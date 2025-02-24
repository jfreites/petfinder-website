import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PetReports } from "@/components/pet-reports";
import banner from "/public/pexels-anastas-20439967.webp";
import { Pagination } from "@/components/pagination";

export default function AllPetsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page) || 1;
  const limit = 12;

  return (
    <main className="flex-1">
      <section
        style={{ backgroundImage: `url(${banner.src})` }}
        className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center bg-no-repeat"
      >
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="max-w-4xl space-y-2">
              <h2 className="text-3xl text-balance text-white/80 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Ayudamos mascotas extraviadas a encontrar el camino a casa
              </h2>
              <p className="mx-auto max-w-[700px] text-white/90 font-medium md:text-xl dark:text-slate-400">
                PetFinder es una plataforma pública creada con el fin de ayudar
                a reunir familias con sus mascotas perdidas.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="/#report">Reportar Mascota</Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="mt-2 md:mt-0"
              >
                <Link href="/how-works">¿Cómo funciona?</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Mascotas reportadas
          </h2>

          <div className="md:max-w-7xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Suspense fallback={<div className="text-purple-600">Cargando...</div>}>
                <PetReports page={page} limit={limit} />
              </Suspense>
            </div>
            <div className="flex justify-center mt-8">
              <Pagination page={page} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
