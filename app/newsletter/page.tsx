"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

export default function NewsletterPage() {

  const [email, setEmail] = useState("")

  async function subscribe() {

    if (!email) return

    await supabase.from("newsletter").insert([
      {
        email,
      },
    ])

    alert("Subscribed Successfully ✅")

    setEmail("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl text-center">

        {/* Header */}

        <div className="mb-10">

          <div className="text-8xl mb-5">
            📧
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Wellness Newsletter
          </h1>

          <p className="text-gray-500 mt-4 text-xl">
            Get wellness tips, nutrition updates & motivation directly to your inbox
          </p>

        </div>

        {/* Subscribe Box */}

        <div className="bg-green-50 border border-green-100 rounded-3xl p-10">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-5 rounded-2xl text-lg"
          />

          <button
            onClick={subscribe}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl text-2xl font-bold shadow-lg transition"
          >
            Subscribe Now
          </button>

        </div>

        {/* Features */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              🥗
            </div>

            <h3 className="text-2xl font-bold text-green-700">
              Nutrition Tips
            </h3>

          </div>

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              🔥
            </div>

            <h3 className="text-2xl font-bold text-green-700">
              Fat Loss Updates
            </h3>

          </div>

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              💪
            </div>

            <h3 className="text-2xl font-bold text-green-700">
              Wellness Motivation
            </h3>

          </div>

        </div>

      </div>

    </main>
  )
}