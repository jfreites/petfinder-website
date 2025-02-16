'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LocationStep({ onNext }) {
  const [location, setLocation] = useState('')

  const validateLocation = async (location: string) => {
    // Mock Google Maps API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(location.length > 5)
      }, 1000)
    })
  }

  const handleNext = async () => {
    const isValid = await validateLocation(location)
    if (isValid) {
      onNext({ location })
    } else {
      alert('Please enter a valid location')
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 1: Location</h2>
      <Input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter your location"
      />
      <Button onClick={handleNext}>Next</Button>
    </div>
  )
}