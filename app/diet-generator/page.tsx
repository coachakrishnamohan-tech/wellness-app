"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function DietGeneratorPage() {

  const [goal, setGoal] = useState("")
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [plans, setPlans] = useState<any[]>([])

  useEffect(() => {
    fetchPlans()
  }, [])

  async function fetchPlans() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("diet_plans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setPlans(data)
    }
  }

  async function generatePlan() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    let generatedDiet = ""

    if (goal === "Fat Loss") {

      generatedDiet =
        "🥗 Oats + Eggs Breakfast | 🍛 Brown Rice + Chicken Lunch | 🥜 Nuts Snack | 🥗 Salad + Paneer Dinner"

    } else if (goal === "Muscle Gain") {

      generatedDiet =
        "🥚 Eggs + Peanut Butter Toast | 🍗 Chicken Rice Bowl | 🍌 Banana Shake | 🥩 Protein Rich Dinner"

    } else {

      generatedDiet =
        "🍎 Balanced nutrition with fruits, vegetables, protein & hydration."
    }

    await supabase.from("diet_plans").insert([
      {
        user_id: user.id,
        goal,
        calories,
        protein,
        diet_plan: generatedDiet,
      },
    ])

    alert("Diet Plan Generated ✅")

    setGoal("")
    setCalories("")
    setProtein("")

    fetchPlans()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="text-8xl mb-5">
            🥗
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            AI Diet Plan Generator
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Generate personalized wellness meal plans
          </p>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          >
            <option value="">Select Goal</option>
            <option>Fat Loss</option>
            <option>Muscle Gain</option>
            <option>Maintenance</option>
          </select>

          <input
            type="text"
            placeholder="Calories Target"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Protein Goal"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

        </div>

        <button
          onClick={generatePlan}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Generate Diet Plan
        </button>

        {/* Generated Plans */}

        <div className="mt-12 space-y-6">

          {plans.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <h2 className="text-3xl font-bold text-green-700">
                {item.goal}
              </h2>

              <p className="text-gray-600 mt-3">
                🔥 Calories: {item.calories}
              </p>

              <p className="text-gray-600">
                💪 Protein: {item.protein}
              </p>

              <p className="text-gray-700 text-lg leading-relaxed mt-5">
                {item.diet_plan}
              </p>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}