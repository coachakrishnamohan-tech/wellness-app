"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function StepTrackerPage() {

  const [steps, setSteps] = useState("")
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    fetchSteps()
  }, [])

  async function fetchSteps() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("steps")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setHistory(data)
    }
  }

  async function addSteps() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const caloriesBurned = Math.floor(Number(steps) * 0.04)

    await supabase.from("steps").insert([
      {
        user_id: user.id,
        steps: Number(steps),
        calories_burned: caloriesBurned,
      },
    ])

    alert("Steps Added ✅")

    setSteps("")

    fetchSteps()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            🚶
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Step Tracker
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Track daily walking activity & calories burned
          </p>

        </div>

        {/* Input */}

        <div className="flex flex-col md:flex-row gap-5 mb-8">

          <input
            type="number"
            placeholder="Enter Steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl flex-1"
          />

          <button
            onClick={addSteps}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-lg transition"
          >
            Add Steps
          </button>

        </div>

        {/* History */}

        <div className="space-y-5">

          {history.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <h2 className="text-3xl font-bold text-green-700">
                    🚶 {item.steps} Steps
                  </h2>

                  <p className="text-gray-600 mt-2">
                    🔥 {item.calories_burned} Calories Burned
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