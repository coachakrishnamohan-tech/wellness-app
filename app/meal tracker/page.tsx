"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function MealTrackerPage() {

  const [mealName, setMealName] = useState("")
  const [mealType, setMealType] = useState("Breakfast")
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [meals, setMeals] = useState<any[]>([])

  async function fetchMeals() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("meals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setMeals(data)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  async function addMeal() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("meals").insert([
      {
        user_id: user.id,
        meal_type: mealType,
        meal_name: mealName,
        calories: Number(calories),
        protein: Number(protein),
      },
    ])

    setMealName("")
    setCalories("")
    setProtein("")

    fetchMeals()
  }

  return (
    <main className="min-h-screen bg-green-50 flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl">

        <h1 className="text-5xl font-bold text-green-700 text-center mb-8">
          Meal Tracker
        </h1>

        <div className="space-y-4">

          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full border p-4 rounded-xl"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snacks</option>
          </select>

          <input
            type="text"
            placeholder="Meal Name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="number"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full border p-4 rounded-xl"
          />

          <button
            onClick={addMeal}
            className="w-full bg-green-600 text-white py-4 rounded-xl text-xl font-semibold"
          >
            Save Meal
          </button>

        </div>

        <div className="mt-10">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Meal History
          </h2>

          <div className="space-y-4">

            {meals.map((meal) => (

              <div
                key={meal.id}
                className="bg-green-100 p-4 rounded-xl"
              >

                <h3 className="text-xl font-bold text-green-700">
                  {meal.meal_type}
                </h3>

                <p>{meal.meal_name}</p>

                <p>{meal.calories} kcal</p>

                <p>{meal.protein}g protein</p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  )
}