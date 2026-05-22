"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function WeightTrackerPage() {

  const [weight, setWeight] = useState("")
  const [weights, setWeights] = useState<any[]>([])

  async function fetchWeights() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from("weights")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (!error && data) {
      setWeights(data)
    }
  }

  async function addWeight() {

    if (!weight) return

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("User not logged in")
      return
    }

    const { error } = await supabase
      .from("weights")
      .insert([
        {
          user_id: user.id,
          weight: Number(weight),
        },
      ])

    if (error) {
      alert(error.message)
      return
    }

    setWeight("")

    fetchWeights()
  }

  useEffect(() => {
    fetchWeights()
  }, [])

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-8">

        <h1 className="text-5xl font-bold text-green-700 text-center mb-8">
          Weight Tracker
        </h1>

        <div className="flex gap-4 mb-8">

          <input
            type="number"
            placeholder="Enter Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl p-4 outline-none"
          />

          <button
            onClick={addWeight}
            className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl"
          >
            Add
          </button>

        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Weight History
        </h2>

        <div className="space-y-3">

          {weights.map((item, index) => (

            <div
              key={item.id}
              className="bg-green-100 flex items-center justify-between p-4 rounded-xl"
            >
              <span className="text-gray-700">
                Entry {index + 1}
              </span>

              <span className="text-green-700 font-bold text-xl">
                {item.weight} kg
              </span>
            </div>

          ))}

        </div>

      </div>

    </main>
  )
}