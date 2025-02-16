import { turso } from "@/lib/turso";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PetList } from "@/components/pet-list";
import ReportForm from "@/components/report-form";
import banner from "../../public/banner-petfinder.webp";

type Pet = {
  id: number;
  name?: string;
  description: string;
  status: string;
  location: string;
  imagePath?: string;
  species: string;
  contactNumber?: string;
};

export default async function Home() {
  //await turso.sync();
  await turso.batch([
    "CREATE TABLE IF NOT EXISTS pet_reports (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, status TEXT, location TEXT, image_path TEXT NULL, species TEXT, contact_number TEXT NULL)",
    ], "write",
  );

  const { rows } = await turso.execute("SELECT * FROM pet_reports ORDER BY id DESC");
  const pets: Pet[] = rows.map((row: any) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    status: row.status,
    location: row.location,
    imagePath: row.image_path,
    species: row.species,
    contactNumber: row.contact_number,
  }));

  return (
    <main className="flex-1">
      <section
        style={{ backgroundImage: `url(${banner.src})` }}
        className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center bg-no-repeat"
      >
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="max-w-4xl space-y-2">
              <h1 className="text-3xl text-balance text-primary/80 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Ayudamos mascotas extraviadas a encontrar el camino a casa
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-900 font-medium md:text-xl dark:text-slate-400">
                PetFinder es una plataforma pública creada con el fin de ayudar
                a reunir familias con sus mascotas perdidas.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link href="#report">Reportar Mascota</Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="mt-2 md:mt-0"
              >
                <Link href="#catalog">Mascotas reportadas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="report"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
      >
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Reporta una mascota
          </h2>
          <ReportForm />
        </div>
      </section>
      <section id="catalog" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Mascotas reportadas
          </h2>
          <div className="md:max-w-7xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <PetList pets={pets} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
