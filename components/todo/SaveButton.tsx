'use client'

import { Button } from "@/components/ui/button"

export default function SaveButton({ onSave }:
   { onSave: () => void }) 
  {
  return (
      <Button variant="destructive" onClick={onSave}>
        Save
      </Button>
  )
}