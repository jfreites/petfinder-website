import { Metadata } from "next";
import { pb } from "@/lib/pocketbase";
import banner from "/public/pexels-beyzaa-yurtkuran-279977530-30845186.webp";
import { RecordModel } from "pocketbase";
import { Calendar, UserPen } from "lucide-react";

export const metadata: Metadata = {
    title: "PetFinder Blog",
    description: "Articulos de interes, tips, recomendaciones y anuncios relacionados con el bienestar de nuestros perros y gatos.",
  };

export default async function BlogPage() {

    let posts: RecordModel[] = [];

    try {
        const records = await pb.collection('posts').getFullList({
            sort: '-created',
            fields: 'title, slug, summary, created',
        })

        posts = records;
        console.log(records);
    } catch (error) {
        console.error(error);
    }

    return (
      <main className="flex-1">
        <section
            style={{ backgroundImage: `url(${banner.src})` }}
            className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center bg-no-repeat bg-opacity-80"
        >
            <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="max-w-4xl space-y-2">
                    <h2 className="text-3xl text-balance text-secondary/90 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        <span className="text-primary/80">Pet</span><span className="text-white">Finder</span> Blog
                    </h2>
                    <p className="mx-auto max-w-[700px] text-white/90 font-medium md:text-xl dark:text-slate-400">
                        Artículos de interés, tips, recomendaciones y anuncios relacionados con el bienestar de nuestros perros y gatos.
                    </p>
                </div>
            </div>
            </div>
        </section>
        <section className="max-w-5xl py-6 mx-auto">
            <ul>
                {posts.length > 0 ? posts.map((post) => (
                    <li key={post.id} className="py-4 border-b border-gray-200">
                        <h2 className="text-3xl"><a href={`/blog/${post.slug}`}>{post.title}</a></h2>
                        <div className="flex items-center text-sm text-gray-500 my-4">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            {post.created}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 my-4">
                            <UserPen className="w-4 h-4 inline mr-2" />
                            <span>Pedro Perez</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: post.summary }} />
                        <div className="mt-4 text-md text-primary">
                            <a href={`/blog/${post.slug}`} className="text-primary">Leer más</a>
                        </div>
                    </li>
                )) : <li>No hay posts</li>}
            </ul>
        </section>
      </main>
    );
};