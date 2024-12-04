import { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  PawPrint,
  MessageCircleWarningIcon,
  MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Reporte",
  description: "Reporte de mascotas perdidas",
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function PetReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  const { id } = await params;

  // check localstorage for user with a day of expiration to avoid unnecessary requests

  const { data: reports, error } = await supabaseClient
    .from("reports")
    .select("*")
    .eq("id", id);

  if (error) {
    throw error;
  }

  const pet = reports[0];

  return (
    <main className="flex-1">
      <div className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="my-4">
            <Link href="/" className="flex flex-row">
              <ChevronLeft className="w-4 h-4 mr-2 mt-1" />
              <span>regresar al home</span>
            </Link>
          </div>
          <article key={id}>
            <div className="aspect-square relative mb-4">
              <Image
                src={`${supabaseUrl}/storage/v1/object/public/${pet.photo}`}
                alt=""
                width={100}
                height={100}
                className="object-cover w-full h-full rounded-lg"
              />
              <span
                className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  pet.status === "missing"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {pet.status}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <PawPrint className="w-4 h-4 mr-1" />
              {pet.specie}
            </div>
            <div className="flex items-center text-lg text-gray-800 mb-2">
              <MessageCircleWarningIcon className="w-4 h-4 mr-1" />
              {pet.description}
            </div>
            <div className="flex items-center text-lg text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              {pet.location}
            </div>
            <p className="py-6 text-center">
              {pet.status == "missing"
                ? "Si tienes información del paradero de esta mascota envía un mensaje"
                : "Si esta mascota es tuya o sabes quien la esta buscando, envía un mensaje"}{" "}
              <a className="font-semibold hover:underline" href="#">
                aquí
              </a>
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
