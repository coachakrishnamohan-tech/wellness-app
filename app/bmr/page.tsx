"use client"

import { useState } from "react"

export default function BMRCalculator() {

  const [gender, setGender] = useState("male")
  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmr, setBMR] = useState("")
  const [calories, setCalories] = useState("")

  const calculateBMR = () => {

    const h = parseFloat(height)
    const w = parseFloat(weight)
    const a = parseFloat(age)

    if (!h || !w || !a) return

    let result = 0

    if (gender === "male") {
      result = 10 * w + 6.25 * h - 5 * a + 5
    } else {
      result = 10 * w + 6.25 * h - 5 * a - 161
    }

    setBMR(result.toFixed(0))

    const maintenanceCalories = result * 1.55

    setCalories(maintenanceCalories.toFixed(0))
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[420px]">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          BMR & Calories Calculator
        </h1>

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button
          onClick={calculateBMR}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
        >
          Calculate
        </button>

        {bmr && (
          <div className="mt-6 text-center">

            <p className="text-lg text-gray-700">
              Your BMR
            </p>

            <h2 className="text-4xl font-bold text-green-700 mt-2">
              {bmr} kcal
            </h2>

            <p className="text-lg text-gray-700 mt-6">
              Maintenance Calories
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {calories} kcal
            </h3>

          </div>
        )}

      </div>

    </main>
  )
}