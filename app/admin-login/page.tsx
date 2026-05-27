"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleAdminLogin() {

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {

      localStorage.setItem("admin", "true")

      router.push("/admin")

    } else {

      alert("Invalid admin credentials")
    }
  }

  return (

    <main className="min-h-screen flex items-center justify-center bg-black p-6">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-black text-center mb-8">
          Admin Login
        </h1>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-4 rounded-2xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-4 rounded-2xl"
          />

          <button
            onClick={handleAdminLogin}
            className="w-full bg-black text-white py-4 rounded-2xl font-bold"
          >
            Login as Admin
          </button>

        </div>

      </div>

    </main>
  )
}