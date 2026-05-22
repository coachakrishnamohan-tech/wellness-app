"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function RegisterPage() {

  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loading, setLoading] = useState(false)

  async function handleRegister() {

    if (!name || !email || !password) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    alert("Registration Successful ✅")

    router.push("/login")
  }

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-green-700 text-center mb-8">
          Register
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-4 outline-none"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </div>

      </div>

    </main>
  )
}