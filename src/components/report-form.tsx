"use client";

import { useState } from "react";
import supabase from "@/lib/supabase-helper";
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
import { ChevronRight } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { validatePhoneNumber } from "@/lib/utils";

export default function ReportForm({
  onSubmitSuccess,
}: {
  onSubmitSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    status: "",
    specie: "",
    location: "",
    description: "",
    contact_number: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!validatePhoneNumber(formData.contact_number)) {
        throw new Error("Invalid phone number");
      }

      // Upload image to Supabase Storage
      let imagePath = null;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("pet-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        console.log(uploadData);

        if (uploadData) {
          imagePath = uploadData.fullPath;
        } else {
          throw new Error("Failed to upload image");
        }
      }

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
      setImageFile(null);

      // Call the success callback
      onSubmitSuccess();

      alert("Pet report submitted successfully!");
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
      <div className="space-y-2">
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="specie">Especie</Label>
        <Select
          name="specie"
          value={formData.specie}
          onValueChange={(value) =>
            handleSelectChange("specie", value as string)
          }
        >
          <SelectTrigger id="specie">
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
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Ingresa la ubicación donde fue vista la mascota"
        />
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
        {isLoading ? "Enviando..." : "Enviar formulario"}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
      {error && <p className="text-red-500 text-center">{error}</p>}
    </form>
  );
}
