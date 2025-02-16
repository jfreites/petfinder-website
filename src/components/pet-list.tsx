import { Card, CardContent } from "@/components/ui/card";
import { PawPrint, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

//const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const storageUrl = 'https://placehold.co/400';

export function PetList({ pets }: { pets: Pet[] | null }) {
  return (
    <>
      {pets?.map((pet) => (
        <Card key={pet.id}>
          <CardContent className="p-4">
            <Link href={`/report/${pet.id}`}>
              <div className="aspect-square relative mb-4">
                <Image
                  src={`${storageUrl}?text=${pet.imagePath}`}
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
                  {pet.status}
                </span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {pet.description.length > 30
                  ? pet.description.substring(0, 30).concat(" ...")
                  : pet.description}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <PawPrint className="w-4 h-4 mr-1" />
                {pet.species}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {pet.location}
              </div>
            </Link>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
