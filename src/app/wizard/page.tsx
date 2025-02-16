import { Wizard } from "@/components/wizard";

export default function WizardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Report Wizard</h1>
      <Wizard />
    </div>
  )
}