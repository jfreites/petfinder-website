'use client'

import { useEffect, useRef, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, Loader2, MapPin } from 'lucide-react'

interface LocationAutocompleteProps {
  value: string
  onChange: (value: string, placeId?: string) => void
  className?: string
}

declare global {
  interface Window {
    google: any;
  }
}

export function LocationAutocomplete({ value, onChange, className }: LocationAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState(value)
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [loading, setLoading] = useState(false)
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null)
  const placesService = useRef<google.maps.places.PlacesService | null>(null)
  const dummyElement = useRef<HTMLDivElement | null>(null)

  // Define bounds for Mexico
  const mexicoBounds = {
    north: 32.7187629, // Northern-most point
    south: 14.5345486, // Southern-most point
    west: -118.3644475, // Western-most point
    east: -86.7104356, // Eastern-most point
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script')
      // Add language parameter for Spanish
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&language=es`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      script.onload = () => {
        initializeServices()
      }

      return () => {
        document.head.removeChild(script)
      }
    } else if (window.google) {
      initializeServices()
    }
  }, [])

  const initializeServices = () => {
    autocompleteService.current = new window.google.maps.places.AutocompleteService()
    dummyElement.current = document.createElement('div')
    placesService.current = new window.google.maps.places.PlacesService(dummyElement.current)
  }

  const getPlaceDetails = (placeId: string) => {
    if (!placesService.current) return

    const request = {
      placeId,
      fields: ['formatted_address', 'geometry', 'address_components']
    }

    placesService.current.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place?.formatted_address) {
        // Format the address to show only relevant parts
        const formattedAddress = formatMexicanAddress(place)
        setInput(formattedAddress)
        onChange(formattedAddress, placeId)
        setOpen(false)
      }
    })
  }

  const formatMexicanAddress = (place: google.maps.places.PlaceResult) => {
    if (!place.address_components) return place.formatted_address || ''

    const addressParts = {
      street_number: '',
      route: '',
      sublocality: '',
      locality: '',
      state: '',
      postal_code: '',
    }

    place.address_components.forEach(component => {
      const type = component.types[0]
      if (type in addressParts) {
        addressParts[type as keyof typeof addressParts] = component.long_name
      }
    })

    // Construct the address in Mexican format
    const parts = []
    if (addressParts.route) {
      parts.push(addressParts.route + (addressParts.street_number ? ' ' + addressParts.street_number : ''))
    }
    if (addressParts.sublocality) {
      parts.push(addressParts.sublocality)
    }
    if (addressParts.locality) {
      parts.push(addressParts.locality)
    }
    if (addressParts.state) {
      parts.push(addressParts.state)
    }
    if (addressParts.postal_code) {
      parts.push('C.P. ' + addressParts.postal_code)
    }

    return parts.join(', ')
  }

  const onInputChange = (value: string) => {
    setInput(value)
    setLoading(true)

    if (!autocompleteService.current || value.trim() === '') {
      setPredictions([])
      setLoading(false)
      return
    }

    // Create bounds object for Mexico
    const bounds = new google.maps.LatLngBounds(
      { lat: mexicoBounds.south, lng: mexicoBounds.west }, // SW corner
      { lat: mexicoBounds.north, lng: mexicoBounds.east }  // NE corner
    )

    const request: google.maps.places.AutocompletionRequest = {
      input: value,
      componentRestrictions: { country: 'mx' }, // Restrict to Mexico
      bounds: bounds, // Prioritize results within Mexico
      types: ['address'], // Get only address results
      language: 'es', // Set language to Spanish
    }

    autocompleteService.current.getPlacePredictions(
      request,
      (predictions: google.maps.places.AutocompletePrediction[] | null, status: google.maps.places.PlacesServiceStatus) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setPredictions(predictions)
        } else {
          setPredictions([])
        }
        setLoading(false)
      }
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center">
          <Input
            value={input}
            onChange={(e) => {
              onInputChange(e.target.value)
              onChange(e.target.value)
            }}
            className={cn(
              "w-full",
              className
            )}
            onClick={() => setOpen(true)}
            placeholder="Ingresa una ubicación"
          />
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput
            value={input}
            onValueChange={onInputChange}
            placeholder="Buscar ubicación..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                "No se encontraron ubicaciones."
              )}
            </CommandEmpty>
            <CommandGroup className="max-h-[200px] overflow-auto">
              {predictions.map((prediction) => (
                <CommandItem
                  key={prediction.place_id}
                  value={prediction.description}
                  onSelect={() => getPlaceDetails(prediction.place_id)}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 shrink-0 opacity-50" />
                  <div className="flex flex-col">
                    <span>{prediction.structured_formatting.main_text}</span>
                    <span className="text-xs text-muted-foreground">
                      {prediction.structured_formatting.secondary_text}
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      input === prediction.description ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}