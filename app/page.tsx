'use client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <div className="p-4">
      <Button onClick={() => router.push("/todo")}>Go Home</Button>
    </div>
  )
}
