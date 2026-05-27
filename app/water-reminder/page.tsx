"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function WaterReminderPage() {

  const [glasses, setGlasses] = useState(0)

  async function fetchWater() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("water_intake")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)

    if (data && data.length > 0) {
      setGlasses(data[0].glasses)
    }
  }

  async function updateWater(newValue: number) {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase
      .from("water_intake")
      .insert([
        {
          user_id: user.id,
          glasses: newValue,
        },
      ])

    setGlasses(newValue)
  }

  useEffect(() => {
    fetchWater()
  }, [])

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 text-center">

        <h1 className="text-5xl font-bold text-green-700 mb-8">
          Water Reminder
        </h1>

        <p className="text-2xl text-gray-700 mb-4">
          Daily Water Intake
        </p>

        <div className="text-8xl font-bold text-green-600 mb-8">
          {glasses}
        </div>

        <p className="text-xl text-gray-600 mb-8">
          Glasses Drank Today
        </p>

        <div className="flex items-center justify-center gap-4">

          <button
            onClick={() => updateWater(Math.max(glasses - 1, 0))}
            className="bg-red-500 hover:bg-red-600 text-white text-3xl w-16 h-16 rounded-2xl"
          >
            -
          </button>

          <button
            onClick={() => updateWater(glasses + 1)}
            className="bg-green-600 hover:bg-green-700 text-white text-3xl w-16 h-16 rounded-2xl"
          >
            +
          </button>

        </div>

      </div>

    </main>
  )
}