"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function GoalsPage() {

  const [goalName, setGoalName] = useState("")
  const [targetValue, setTargetValue] = useState("")
  const [currentValue, setCurrentValue] = useState("")
  const [targetDate, setTargetDate] = useState("")
  const [goals, setGoals] = useState<any[]>([])

  useEffect(() => {
    fetchGoals()
  }, [])

  async function fetchGoals() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setGoals(data)
    }
  }

  async function addGoal() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("goals").insert([
      {
        user_id: user.id,
        goal_name: goalName,
        target_value: targetValue,
        current_value: currentValue,
        target_date: targetDate,
      },
    ])

    alert("Goal Added ✅")

    setGoalName("")
    setTargetValue("")
    setCurrentValue("")
    setTargetDate("")

    fetchGoals()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            🎯
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Goal Tracker
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Set wellness targets & track transformation goals
          </p>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

          <input
            type="text"
            placeholder="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Target Value"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Current Value"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

        </div>

        <button
          onClick={addGoal}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Save Goal
        </button>

        {/* Goals List */}

        <div className="mt-12 space-y-6">

          {goals.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <h2 className="text-3xl font-bold text-green-700">
                    {item.goal_name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    🎯 Target: {item.target_value}
                  </p>

                  <p className="text-gray-600">
                    📈 Current: {item.current_value}
                  </p>

                  <p className="text-gray-600">
                    📅 Target Date: {item.target_date}
                  </p>

                </div>

                <div className="text-6xl">
                  🚀
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}