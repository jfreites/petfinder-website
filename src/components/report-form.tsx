"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { pb } from "@/lib/pocketbase";
import { LocationAutocomplete } from "@/components/location-autocomplete";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight } from "lucide-react";
import { validatePhoneNumber } from "@/lib/utils";

type FormData = {
  status: 'missing' | 'found'
  circumstance?: 'in-possession' | 'sighting' | 'deceased'
  species: string
  location: string
  description: string
  contact_number: string
  image: File | null
}

export default function ReportForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    status: "missing",
    species: "",
    location: "",
    description: "",
    contact_number: "",
    image: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: 'missing' | 'found') => {
    setFormData(prev => ({
      ...prev,
      status: value,
      // Clear circumstance when switching to 'missing'
      circumstance: value === 'missing' ? undefined : prev.circumstance
    }))
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // fix this if we need to upload multiple images
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate form data
      if (formData.status === 'found' && !formData.circumstance) {
        throw new Error('Please select the circumstance for the found pet')
      }

      if (!validatePhoneNumber(formData.contact_number)) {
        throw new Error("Número de teléfono inválido");
      }

      // Insert into pocketbase
      const record = await pb.collection('pet_reports').create({... formData});
      console.log('inserted record', record);

      // Reset form and refetch pets
      setFormData({
        status: "missing",
        species: "",
        location: "",
        description: "",
        contact_number: "",
        image: null,
      });

      // Call the success callback
      //onSubmitSuccess();
      router.refresh();

      alert("La mascota fue reportada con éxito!"); // implement a toast
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(
        `Failed to submit form: ${(err as Error).message || "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-3">
        <Label>Status</Label>
        <RadioGroup
          defaultValue={formData.status}
          value={formData.status}
          onValueChange={(value: 'missing' | 'found') => handleStatusChange(value)}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="missing" id="missing" />
            <Label htmlFor="missing" className="font-normal">Missing Pet</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="found" id="found" />
            <Label htmlFor="found" className="font-normal">Found Pet</Label>
          </div>
        </RadioGroup>
      </div>

      {formData.status === 'found' && (
        <div className="space-y-2">
          <Label htmlFor="circumstance">Describe la circunstancia</Label>
          <Select
            name="circumstance"
            value={formData.circumstance}
            onValueChange={(value) => handleSelectChange('circumstance', value)}
          >
            <SelectTrigger id="circumstance">
              <SelectValue placeholder="Select circumstance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in-possession">In my possession</SelectItem>
              <SelectItem value="sighting">Sighting (Still roaming)</SelectItem>
              <SelectItem value="deceased">Deceased</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          name="status"
          value={formData.status}
          onValueChange={(value) =>
            handleSelectChange("status", value as string)
          }
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Tipo de reporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="missing">Mascota perdida</SelectItem>
            <SelectItem value="found">Mascota encontrada</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      <div className="space-y-2">
        <Label htmlFor="specie">Especie</Label>
        <Select
          name="species"
          value={formData.species}
          onValueChange={(value) =>
            handleSelectChange("species", value as string)
          }
        >
          <SelectTrigger id="species">
            <SelectValue placeholder="¿Es un perro o un gato?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dog">Perro</SelectItem>
            <SelectItem value="cat">Gato</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">¿Donde fue vista por última vez?</Label>
        <LocationAutocomplete
          value={formData.location}
          onChange={(value) => handleLocationChange({
            target: { name: 'location', value }
          } as React.ChangeEvent<HTMLInputElement>)}
        />
        {/* <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Ingresa la ubicación donde fue vista la mascota"
        /> */}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Describe a la mascota</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe a la mascota lo mejor que puedas"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Foto</Label>
        <Input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
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
          placeholder="Ingresa un número de contacto. No se mostrará en la publicación."
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Crear reporte"}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}
