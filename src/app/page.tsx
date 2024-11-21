"use client";

import { useState, useEffect } from "react";
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
import { PawPrint, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  const [formData, setFormData] = useState({
    status: "",
    specie: "",
    location: "",
    description: "",
    contact_number: "",
  });

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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Upload image to Supabase Storage
      const imagePath = null;

      // Insert pet data into Supabase
      const { data, error } = await supabase
        .from("reports")
        .insert({
          ...formData,
          photo: imagePath,
        })
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error("No data returned from insert operation");
      }

      // Reset form and refetch pets
      setFormData({
        status: "",
        specie: "",
        location: "",
        description: "",
        contact_number: "",
      });
      fetchPets();

      alert("Pet report submitted successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        `Failed to submit form: ${(err as Error).message || "Unknown error"}`
      );
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                Ayudamos a mascotas extraviadas a encontrar su camino a casa
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-900 font-medium md:text-xl dark:text-slate-400">
                PetFinder es una plataforma creada con el fin de ayudar a reunir
                familias con sus mascotas perdidas.
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
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "status", value } })
                }
              >
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
              <Label htmlFor="specie">Especie</Label>
              <Select
                name="specie"
                value={formData.specie}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "specie", value } })
                }
              >
                <SelectTrigger id="specie">
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Perro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">¿Donde fue vista por última vez?</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Describe a la mascota</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the pet and any distinguishing features"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                //onChange={handleFileChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_number">Número de contacto</Label>
              <Input
                id="contact_number"
                name="contact_number"
                type="tel"
                value={formData.contact_number}
                onChange={handleInputChange}
                placeholder="Enter your contact number"
              />
            </div>
            <Button type="submit" className="w-full">
              Enviar formulario <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
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
                              : "bg-green-500 text-white"
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
