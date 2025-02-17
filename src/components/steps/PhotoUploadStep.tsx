'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
//import { useRouter } from 'next/navigation'

const mockAIService = async (photo: File) => {
  console.log(photo.name);
  // Mock AI service call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.5)
    }, 1500)
  })
}

interface PhotoUploadStepProps {
  onNext: (data: { photo: File }) => void;
  formData: any; // You can replace 'any' with a more specific type if available
}

export function PhotoUploadStep({ onNext, formData }: PhotoUploadStepProps) {
  const [photo, setPhoto] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [matchFound, setMatchFound] = useState(false)
  //const router = useRouter()

  console.log(formData);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0])
      setMatchFound(false) // Reset match status when a new photo is uploaded
    }
  }

  const handleNext = async () => {
    if (photo) {
      setIsProcessing(true)
      try {
        const result = await mockAIService(photo)
        setMatchFound(result as boolean)
        if (result) {
          // If a match is found, we would redirect to the record found page
          // For now, we'll just log a message
          console.log('Match found! Redirecting to record page...')
          // Uncomment the following line to implement the redirect
          // router.push('/record-found')
        } else {
          onNext({ photo })
        }
      } catch (error) {
        console.error('Error processing photo:', error)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  return (
<div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 3: Upload Photo</h2>
      <Input type="file" onChange={handlePhotoChange} accept="image/*" />
      {!photo && (
        <Button onClick={() => alert('Searching in current records...')}>
          Search in current records
        </Button>
      )}
      <Button 
        onClick={handleNext} 
        disabled={!photo || isProcessing || matchFound}
      >
        {isProcessing ? 'Processing...' : 'Next'}
      </Button>
      {matchFound && (
        <p className="text-green-600">Match found! Redirecting to record page...</p>
      )}
    </div>
  )
}