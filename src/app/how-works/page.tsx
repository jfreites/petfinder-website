import { Metadata } from "next";
import banner from "../../../public/pexels-egorov-10159624.webp";

export const metadata: Metadata = {
    title: "¿Cómo funciona PetFinder",
    description: "Aprende como funciona la plataforma, como reportar mascotas perdidas o encontradas, como usamos la información y que datos se comparten.",
  };

export default async function HowWorksPage() {
    return (
      <main className="flex-1">
              <section
        style={{ backgroundImage: `url(${banner.src})` }}
        className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center bg-no-repeat"
      >
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="max-w-4xl space-y-2">
              <h2 className="text-3xl text-balance text-secondary/90 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                ¿Como funciona <span className="text-primary/80">Pet</span><span className="text-white">Finder</span>?
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="px-4 md:px-6">
          <h2 className="text-md font-bold tracking-tighter sm:text-lg md:text-xl mb-8 text-center">
            Pasos para reportar a una mascota <span className="text-primary/80">perdida</span>
          </h2>
          <p>Pronto...</p>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="px-4 md:px-6">
          <h2 className="text-md font-bold tracking-tighter sm:text-lg md:text-xl mb-8 text-center">
            Pasos para reportar a una mascota <span className="text-primary/80">encontrada</span>
          </h2>
          <p>Pronto...</p>
        </div>
      </section>
      </main>
    );
};