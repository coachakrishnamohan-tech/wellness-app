"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function WaterTrackerPage() {

  const [glasses, setGlasses] = useState("")
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    fetchWater()
  }, [])

  async function fetchWater() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("water_tracker")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setHistory(data)
    }
  }

  async function addWater() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("water_tracker").insert([
      {
        user_id: user.id,
        glasses: Number(glasses),
      },
    ])

    alert("Water Intake Added ✅")

    setGlasses("")

    fetchWater()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            💧
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Water Intake Tracker
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Track daily hydration & water goals
          </p>

        </div>

        {/* Input */}

        <div className="flex flex-col md:flex-row gap-5 mb-8">

          <input
            type="number"
            placeholder="Enter Glasses of Water"
            value={glasses}
            onChange={(e) => setGlasses(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl flex-1"
          />

          <button
            onClick={addWater}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-lg transition"
          >
            Add Water
          </button>

        </div>

        {/* History */}

        <div className="space-y-5">

          {history.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-3xl font-bold text-green-700">
                    💧 {item.glasses} Glasses
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Daily Hydration Record
                  </p>

                </div>

                <div className="text-5xl">
                  🌿
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}