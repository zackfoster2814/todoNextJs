'use client'

import { Button } from "@/components/ui/button"

export default function TodoItem({ index, text, onRemove }:
   { index: number, text: string, onRemove: () => void }) 
  {
  return (
    <div className="flex justify-between items-center p-2 border rounded bg-muted">
      <span>{index + 1} </span>
      <span>{text}</span>
      <Button size="sm" variant="destructive" onClick={onRemove}>
        x
      </Button>
    </div>
  )
}