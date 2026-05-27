"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function SleepTrackerPage() {

  const [hours, setHours] = useState(0)

  async function fetchSleep() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("sleep_tracker")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)

    if (data && data.length > 0) {
      setHours(data[0].hours)
    }
  }

  async function updateSleep(newValue: number) {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase
      .from("sleep_tracker")
      .insert([
        {
          user_id: user.id,
          hours: newValue,
        },
      ])

    setHours(newValue)
  }

  useEffect(() => {
    fetchSleep()
  }, [])

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 text-center">

        <h1 className="text-5xl font-bold text-green-700 mb-8">
          Sleep Tracker
        </h1>

        <p className="text-2xl text-gray-700 mb-4">
          Daily Sleep Hours
        </p>

        <div className="text-8xl font-bold text-green-600 mb-8">
          {hours}
        </div>

        <p className="text-xl text-gray-600 mb-8">
          Hours Slept Today
        </p>

        <div className="flex items-center justify-center gap-4">

          <button
            onClick={() => updateSleep(Math.max(hours - 1, 0))}
            className="bg-red-500 hover:bg-red-600 text-white text-3xl w-16 h-16 rounded-2xl"
          >
            -
          </button>

          <button
            onClick={() => updateSleep(hours + 1)}
            className="bg-green-600 hover:bg-green-700 text-white text-3xl w-16 h-16 rounded-2xl"
          >
            +
          </button>

        </div>

      </div>

    </main>
  )
}