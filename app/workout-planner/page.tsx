"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function WorkoutPlannerPage() {

  const [workout, setWorkout] = useState("")
  const [duration, setDuration] = useState("")
  const [calories, setCalories] = useState("")
  const [workouts, setWorkouts] = useState<any[]>([])

  useEffect(() => {
    fetchWorkouts()
  }, [])

  async function fetchWorkouts() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("workouts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setWorkouts(data)
    }
  }

  async function addWorkout() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("workouts").insert([
      {
        user_id: user.id,
        workout_name: workout,
        duration,
        calories_burned: calories,
      },
    ])

    alert("Workout Added ✅")

    setWorkout("")
    setDuration("")
    setCalories("")

    fetchWorkouts()
  }

  async function toggleWorkout(id: string, completed: boolean) {

    await supabase
      .from("workouts")
      .update({
        completed: !completed,
      })
      .eq("id", id)

    fetchWorkouts()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="text-8xl mb-5">
            🏋️
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Workout Planner
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Track workouts & build fitness consistency
          </p>

        </div>

        {/* Add Workout */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <input
            type="text"
            placeholder="Workout Name"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Duration (Minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Calories Burned"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

        </div>

        <button
          onClick={addWorkout}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Add Workout
        </button>

        {/* Workout List */}

        <div className="mt-12 space-y-6">

          {workouts.map((item) => (

            <div
              key={item.id}
              className={`rounded-2xl p-6 border transition ${
                item.completed
                  ? "bg-green-100 border-green-300"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <h2 className="text-3xl font-bold text-green-700">
                    {item.workout_name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    ⏱️ {item.duration} Minutes
                  </p>

                  <p className="text-gray-600">
                    🔥 {item.calories_burned} Calories
                  </p>

                </div>

                <button
                  onClick={() =>
                    toggleWorkout(item.id, item.completed)
                  }
                  className={`px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition ${
                    item.completed
                      ? "bg-gray-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {item.completed
                    ? "Completed ✅"
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