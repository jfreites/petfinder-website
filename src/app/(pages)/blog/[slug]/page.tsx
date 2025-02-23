import { Metadata } from "next";

export const metadata: Metadata = {
    title: "PetFinder Blog - Esto es una prueba",
    description: "Articulos de interes, tips, recomendaciones y anuncios relacionados con el bienestar de nuestros perros y gatos.",
  };

export default async function BlogPostPage() {
    return (
      <main className="flex-1">
        <section
            className="w-full py-12 md:py-24 lg:py-32 xl:py-48 h-36 bg-teal-600"
        >
            <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="max-w-4xl space-y-2">
                <h2 className="text-3xl text-balance text-secondary/90 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Esto es una prueba
                </h2>
                </div>
            </div>
            </div>
        </section>
      </main>
    );
};