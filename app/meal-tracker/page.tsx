"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function MealTrackerPage() {

  const [mealName, setMealName] = useState("")
  const [mealType, setMealType] = useState("Breakfast")
  const [calories, setCalories] = useState("")
  const [protein, setProtein] = useState("")
  const [meals, setMeals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchMeals() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from("meals")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.log(error.message)
      return
    }

    if (data) {
      setMeals(data)
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [])

  async function addMeal() {

    if (!mealName || !calories || !protein) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Please login first")
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from("meals")
      .insert([
        {
          user_id: user.id,
          meal_type: mealType,
          meal_name: mealName,
          calories: Number(calories),
          protein: Number(protein),
        },
      ])

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    setMealName("")
    setCalories("")
    setProtein("")
    setMealType("Breakfast")

    fetchMeals()
  }

  return (

    <main className="min-h-screen bg-green-50 p-6 flex items-center justify-center">

      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl p-8">

        <h1 className="text-5xl font-black text-green-700 text-center mb-3">
          Meal Tracker 🍽️
        </h1>

        <p className="text-center text-gray-500 mb-10">
          Track your meals, calories & protein intake
        </p>

        <div className="space-y-5">

          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
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
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            placeholder="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={addMeal}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-2xl text-xl font-bold disabled:bg-gray-400"
          >
            {loading ? "Saving Meal..." : "Save Meal"}
          </button>

        </div>

        <div className="mt-12">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Meal History
          </h2>

          {meals.length === 0 && (

            <div className="bg-green-50 border border-dashed border-green-300 rounded-2xl p-10 text-center text-gray-500">
              No meals added yet 🍽️
            </div>

          )}

          <div className="space-y-4">

            {meals.map((meal) => (

              <div
                key={meal.id}
                className="bg-green-100 p-5 rounded-2xl shadow-sm"
              >

                <div className="flex items-center justify-between">

                  <h3 className="text-2xl font-bold text-green-700">
                    {meal.meal_type}
                  </h3>

                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {meal.calories} kcal
                  </span>

                </div>

                <p className="text-lg text-gray-700 mt-2">
                  {meal.meal_name}
                </p>

                <p className="text-gray-600 mt-1">
                  Protein: {meal.protein}g
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  )
}
