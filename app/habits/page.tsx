"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function HabitsPage() {

  const [habit, setHabit] = useState("")
  const [habits, setHabits] = useState<any[]>([])

  useEffect(() => {
    fetchHabits()
  }, [])

  async function fetchHabits() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("habits")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setHabits(data)
    }
  }

  async function addHabit() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("habits").insert([
      {
        user_id: user.id,
        habit_name: habit,
      },
    ])

    alert("Habit Added ✅")

    setHabit("")

    fetchHabits()
  }

  async function toggleHabit(id: string, completed: boolean) {

    await supabase
      .from("habits")
      .update({
        completed: !completed,
      })
      .eq("id", id)

    fetchHabits()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-8xl mb-5">
            ✅
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Daily Habit Tracker
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Build healthy routines & wellness consistency
          </p>

        </div>

        {/* Add Habit */}

        <div className="flex flex-col md:flex-row gap-5 mb-10">

          <input
            type="text"
            placeholder="Add new habit..."
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            className="flex-1 border border-gray-300 p-5 rounded-2xl"
          />

          <button
            onClick={addHabit}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl text-xl font-bold shadow-lg transition"
          >
            Add Habit
          </button>

        </div>

        {/* Habit List */}

        <div className="space-y-5">

          {habits.map((item) => (

            <div
              key={item.id}
              className={`rounded-2xl p-6 border transition ${
                item.completed
                  ? "bg-green-100 border-green-300"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <h2 className="text-2xl font-bold text-green-700">
                    {item.habit_name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {item.completed
                      ? "✅ Completed"
                      : "⏳ Pending"}
                  </p>

                </div>

                <button
                  onClick={() =>
                    toggleHabit(item.id, item.completed)
                  }
                  className={`px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition ${
                    item.completed
                      ? "bg-gray-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {item.completed
                    ? "Mark Pending"
                    : "Mark Complete"}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}