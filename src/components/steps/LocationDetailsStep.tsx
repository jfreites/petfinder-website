'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function LocationDetailsStep({ onNext }) {
  const [nearestPlaces, setNearestPlaces] = useState('')

  const handleNext = () => {
    onNext({ nearestPlaces })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 2: Location Details</h2>
      <Input
        type="text"
        value={nearestPlaces}
        onChange={(e) => setNearestPlaces(e.target.value)}
        placeholder="Enter nearest places"
      />
      <Button onClick={handleNext}>Next</Button>
    </div>
  )
}