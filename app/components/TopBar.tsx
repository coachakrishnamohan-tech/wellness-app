"use client"

import { useRouter } from "next/navigation"

export default function TopBar() {

  const router = useRouter()

  return (

    <div className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between fixed top-0 left-0 z-50">

      <button
        onClick={() => router.back()}
        className="bg-green-600 text-white px-4 py-2 rounded-xl"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-green-700">
        Wellness App
      </h1>

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-green-600 text-white px-4 py-2 rounded-xl"
      >
        Home
      </button>

    </div>
  )
}