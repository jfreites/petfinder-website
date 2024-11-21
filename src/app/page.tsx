"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { PawPrint, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ReportForm from "@/components/report-form";
import banner from "../../public/banner-petfinder.webp";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  interface Pet {
    id: number;
    description: string;
    specie: string;
    location: string;
    status: string;
    photo: string;
  }

  const [pets, setPets] = useState<Pet[]>([]);
  const [filter, setFilter] = useState({ species: "all", location: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPets = async () => {
    try {
      setIsLoading(true);
      let query = supabase.from("reports").select("*");

      if (filter.species !== "all") {
        query = query.eq("specie", filter.species);
      }
      if (filter.location) {
        query = query.ilike("location", `%${filter.location}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (!data) {
        throw new Error("No data returned from query");
      }

      setPets(data);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setError(
        `Failed to fetch pets: ${(err as Error).message || "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPets = pets.filter(
    (pet) =>
      (filter.species === "all" || pet.specie === filter.species) &&
      (filter.location === "" ||
        pet.location.toLowerCase().includes(filter.location.toLowerCase()))
  );

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
          <ReportForm onSubmitSuccess={fetchPets} />
        </div>
      </section>
      <section id="catalog" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Mascotas reportadas
          </h2>

          <div className="md:max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
              <Select
                value={filter.species}
                onValueChange={(value) =>
                  setFilter({ ...filter, species: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por especie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="dog">Perros</SelectItem>
                  <SelectItem value="cat">Gatos</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Filtrar por ubicación"
                value={filter.location}
                onChange={(e) =>
                  setFilter({ ...filter, location: e.target.value })
                }
                className="w-full md:w-auto"
              />
            </div>
            {isLoading ? (
              <p className="text-center">Cargando mascotas...</p>
            ) : error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPets.map((pet) => (
                  <Card key={pet.id}>
                    <CardContent className="p-4">
                      <div className="aspect-square relative mb-4">
                        <Image
                          src={pet.photo || "https://placehold.co/100x100.svg"}
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
                          ? pet.description.substring(0, 35).concat(" ...")
                          : pet.description}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <PawPrint className="w-4 h-4 mr-1" />
                        {pet.specie}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {pet.location}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
