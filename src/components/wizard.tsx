'use client'

import { useState } from 'react'
import Form from 'next/form'
import { LocationStep } from "../components/steps/LocationStep"
import { LocationDetailsStep } from "../components/steps/LocationDetailsStep"
import { PhotoUploadStep } from "../components/steps/PhotoUploadStep"
import { ContactDetailsStep } from "../components/steps/ContactDetailsStep"

export function Wizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    location: '',
    nearestPlaces: '',
    photo: null as File | null,
    name: '',
    email: '',
  })

  const handleNext = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep((prev) => prev + 1)
  }

  const handleSubmit = async (formData: FormData) => {
    // Here you would typically send the data to your server
    console.log('Form submitted:', Object.fromEntries(formData))
    // Redirect or show success message
  }

  return (
    <Form action={handleSubmit} className="space-y-4">
      {step === 1 && <LocationStep onNext={handleNext} />}
      {step === 2 && <LocationDetailsStep onNext={handleNext} />}
      {step === 3 && <PhotoUploadStep onNext={handleNext} formData={formData} />}
      {step === 4 && <ContactDetailsStep />}
    </Form>
  )
}