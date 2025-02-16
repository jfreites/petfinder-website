'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function ContactDetailsStep() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 4: Contact Details</h2>
      <Input type="text" name="name" placeholder="Your Name" required />
      <Input type="email" name="email" placeholder="Your Email" required />
      <Button type="submit">Save</Button>
    </div>
  )
}