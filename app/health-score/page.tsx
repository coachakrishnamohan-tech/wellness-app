"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function HealthScorePage() {

  const [bmi, setBmi] = useState("")
  const [water, setWater] = useState("")
  const [sleep, setSleep] = useState("")
  const [workouts, setWorkouts] = useState("")
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    fetchScores()
  }, [])

  async function fetchScores() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("health_scores")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setHistory(data)
    }
  }

  async function calculateScore() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    let score = 0

    // BMI

    const bmiValue = Number(bmi)

    if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      score += 25
    } else {
      score += 10
    }

    // Water

    if (Number(water) >= 3) {
      score += 25
    } else {
      score += 10
    }

    // Sleep

    if (Number(sleep) >= 7) {
      score += 25
    } else {
      score += 10
    }

    // Workouts

    if (Number(workouts) >= 4) {
      score += 25
    } else {
      score += 10
    }

    await supabase.from("health_scores").insert([
      {
        user_id: user.id,
        bmi,
        water_intake: water,
        sleep_hours: sleep,
        workouts,
        score,
      },
    ])

    alert("Health Score Generated ✅")

    setBmi("")
    setWater("")
    setSleep("")
    setWorkouts("")

    fetchScores()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="text-8xl mb-5">
            ❤️
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Smart Health Score
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Analyze your complete wellness lifestyle
          </p>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

          <input
            type="number"
            placeholder="BMI"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="number"
            placeholder="Water Intake (Liters)"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="number"
            placeholder="Sleep Hours"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="number"
            placeholder="Weekly Workouts"
            value={workouts}
            onChange={(e) => setWorkouts(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

        </div>

        <button
          onClick={calculateScore}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Generate Health Score
        </button>

        {/* Results */}

        <div className="mt-12 space-y-6">

          {history.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <h2 className="text-4xl font-extrabold text-green-700">
                    ❤️ {item.score}/100
                  </h2>

                  <p className="text-gray-600 mt-3">
                    ⚖️ BMI: {item.bmi}
                  </p>

                  <p className="text-gray-600">
                    💧 Water: {item.water_intake}L
                  </p>

                  <p className="text-gray-600">
                    😴 Sleep: {item.sleep_hours} Hours
                  </p>

                  <p className="text-gray-600">
                    🏋️ Workouts: {item.workouts}/week
                  </p>

                </div>

                <div className="text-7xl">
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