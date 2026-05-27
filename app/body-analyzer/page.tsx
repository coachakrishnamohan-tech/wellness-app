"use client"

import TopBar from "@/app/components/TopBar"
import { useState } from "react"

export default function BodyAnalyzerPage() {

  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [result, setResult] = useState<any>(null)

  function calculateHealth() {

    const heightInMeters = Number(height) / 100

    const bmi =
      Number(weight) /
      (heightInMeters * heightInMeters)

    let category = ""

    if (bmi < 18.5) {

      category = "Underweight"

    } else if (bmi < 25) {

      category = "Normal Weight"

    } else if (bmi < 30) {

      category = "Overweight"

    } else {

      category = "Obese"

    }

    let bodyFat = 0

    if (gender === "Male") {

      bodyFat =
        1.2 * bmi +
        0.23 * Number(age) -
        16.2

    } else {

      bodyFat =
        1.2 * bmi +
        0.23 * Number(age) -
        5.4

    }

    setResult({
      bmi: bmi.toFixed(1),
      bodyFat: bodyFat.toFixed(1),
      category,
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="text-8xl mb-5">
            ⚖️
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Smart Body Analyzer
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Analyze BMI, body fat & wellness health
          </p>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <input
            type="number"
            placeholder="Weight (KG)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="number"
            placeholder="Height (CM)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

        </div>

        <button
          onClick={calculateHealth}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Analyze Health
        </button>

        {/* Result */}

        {result && (

          <div className="mt-12 bg-green-50 border border-green-100 rounded-3xl p-8">

            <h2 className="text-4xl font-extrabold text-green-700 mb-8">
              Health Report
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white rounded-2xl p-6 shadow-md">

                <div className="text-5xl mb-4">
                  ⚖️
                </div>

                <h3 className="text-3xl font-bold text-green-700">
                  {result.bmi}
                </h3>

                <p className="text-gray-600 mt-2">
                  BMI Score
                </p>

              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">

                <div className="text-5xl mb-4">
                  🔥
                </div>

                <h3 className="text-3xl font-bold text-green-700">
                  {result.bodyFat}%
                </h3>

                <p className="text-gray-600 mt-2">
                  Estimated Body Fat
                </p>

              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">

                <div className="text-5xl mb-4">
                  🌿
                </div>

                <h3 className="text-3xl font-bold text-green-700">
                  {result.category}
                </h3>

                <p className="text-gray-600 mt-2">
                  Health Category
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>
  )
}