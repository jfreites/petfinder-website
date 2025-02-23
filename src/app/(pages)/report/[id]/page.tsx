import { Metadata } from "next";
import { pb } from "@/lib/pocketbase";
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

type Pet = {
  id: string;
  name?: string;
  description: string;
  status: string;
  location: string;
  images?: string[];
  species: string;
  contactNumber?: string;
};

export default async function PetReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // create a client component in order to use localstorage to save the data and avoid extra charges in Turso
  const pet: Pet = {
    id: '',
    description: '',
    status: '',
    location: '',
    species: '',
    images: [],
  };

  let collectionId = '';

  try {
    console.log(id);
    const report = await pb.collection('pet_reports').getOne(id)
    console.log(report);

    collectionId = report.collectionId;

    if (report) {
      if (report.id !== null) {
        pet.id = String(report.id);
      }
      if (report.description !== null) {
        pet.description = String(report.description);
      }
      if (report.image !== null) {
        pet.images = report.image;
      }
      if (report.status !== null) {
        pet.status = String(report.status);
      }
      if (report.species !== null) {
        pet.species = String(report.species);
      }
      if (report.location !== null) {
        pet.location = String(report.location);
      }
    }
  } catch (error) {
    throw error;
  }

  return (
    <main className="flex-1">
      <div className="py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <section className="max-w-5xl mx-auto space-y-8">
          <div className="my-4">
            <Link href="/all-pets" className="flex flex-row">
              <ChevronLeft className="w-4 h-4 mr-2 mt-1" />
              <span>regresar al listado</span>
            </Link>
          </div>
          <article key={id} data-id={id}>
            <div className="aspect-square relative mb-4">
              <Image
                src={`https://pocketbase.dp.ungravity.dev/api/files/${collectionId}/${pet.id}/${pet.images?.[0] || ''}`}
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
                {pet.status === "missing" ? "Perdido" : "Encontrado"}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <PawPrint className="w-4 h-4 mr-1" />
              {pet.species === "dog" ? "Perro" : "Gato"}
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
