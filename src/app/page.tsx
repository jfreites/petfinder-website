"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PawPrint,
  Search,
  MapPin,
  Phone,
  Camera,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables')
// }

// const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Fluffy",
      species: "cat",
      location: "New York",
      status: "missing",
      image: "https://placehold.co/100x100.svg",
    },
    {
      id: 2,
      name: "Buddy",
      species: "dog",
      location: "Los Angeles",
      status: "found",
      image: "https://placehold.co/100x100.svg",
    },
    {
      id: 3,
      name: "Whiskers",
      species: "cat",
      location: "Chicago",
      status: "missing",
      image: "https://placehold.co/100x100.svg",
    },
  ]);
  const [filter, setFilter] = useState({ species: "all", location: "" });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Handle form submission here
    alert("Pet report submitted!");
  };

  const filteredPets = pets.filter(
    (pet) =>
      (filter.species === "all" || pet.species === filter.species) &&
      (filter.location === "" ||
        pet.location.toLowerCase().includes(filter.location.toLowerCase()))
  );

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Encuentra a tu mascota perdida
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Reporta un mascota perdida o encontrada y busca en nuestro
                catálogo para reunir a las mascotas con sus dueños.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="#report">Reportar una Mascota</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#catalog">Ver Catálogo</Link>
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
            Reportar
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="missing">Perdida</SelectItem>
                  <SelectItem value="found">Encontrada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="species">Especie</Label>
              <Select>
                <SelectTrigger id="species">
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Perro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Vista por última vez</Label>
              <Input id="location" placeholder="Ingresar ubicación" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe a la mascota y cualquier característica distintiva"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input id="photo" type="file" accept="image/*" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter your contact number"
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </section>
      <section id="catalog" className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Catálogo
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPets.map((pet) => (
                <Card key={pet.id}>
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-4">
                      <img
                        src={pet.image}
                        alt={pet.name}
                        className="object-cover w-full h-full rounded-lg"
                      />
                      <span
                        className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
                          pet.status === "missing"
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {pet.status}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{pet.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <PawPrint className="w-4 h-4 mr-1" />
                      {pet.species}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {pet.location}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
