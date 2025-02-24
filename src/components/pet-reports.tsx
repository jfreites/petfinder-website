import { pb } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";
import { Card, CardContent } from "@/components/ui/card";
import { PawPrint, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export async function PetReports({ page, limit }: { page?: number, limit?: number }) {
  page = page || 1;
  limit = limit || 6;

  interface PetReport {
    id: string;
    collectionId: string;
    image: string[];
    description: string;
    status: string;
    species: string;
    location: string;
  }

  let reports: { items: PetReport[] } = { items: [] };

  try {
      const pets = await pb.collection('pet_reports').getList(page, limit, {
          sort: '-created',
      })
      reports = {
        items: pets.items.map((item: RecordModel) => ({
          id: item.id,
          collectionId: item.collectionId,
          image: item.image,
          description: item.description,
          status: item.status,
          species: item.species,
          location: item.location,
        }))
      }
  } catch (error) {
      console.log('error', error);
  }

  return (
    <>
      {reports.items.length > 0  && reports.items.map((pet: PetReport) => (
        <Card key={pet.id}>
          <CardContent className="p-4">
            <Link href={`/report/${pet.id}`}>
              <div className="aspect-square relative mb-4">
                <Image
                  src={`https://pocketbase.dp.ungravity.dev/api/files/${pet.collectionId}/${pet.id}/${pet.image[0]}`}
                  alt={pet.description}
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
              <h3 className="font-semibold text-lg mb-2">
                {pet.description.length > 30
                  ? pet.description.substring(0, 30).concat(" ...")
                  : pet.description}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <PawPrint className="w-4 h-4 mr-1" />
                {pet.species === "dog" ? "Perro" : "Gato"}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <MapPin className="w-4 h-4 mr-1" />
                {pet.location}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <div className="flex items-center mr-4 font-semibold">
                  <span>Compartir en redes sociales</span>
                  <Facebook className="w-6 h-6 mx-2 hover:text-primary" />
                  <Instagram className="w-6 h-6 mx-2 hover:text-primary" />
                  <Twitter className="w-6 h-6 mx-2 hover:text-primary" />
                </div>
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
