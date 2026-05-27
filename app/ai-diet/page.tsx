"use client"

import TopBar from "@/app/components/TopBar"
import { useState } from "react"

export default function AIDietPage() {

  const [goal, setGoal] = useState("")
  const [result, setResult] = useState("")

  function generatePlan() {

    if (goal === "Fat Loss") {

      setResult(`
🥗 High Protein Diet

• Protein: 100g daily
• Water: 3 liters
• Walking: 8000 steps
• Sleep: 7-8 hours
• Avoid sugar drinks
• Add vegetables daily

Workout:
🏋️ 30 mins cardio
🏋️ Strength training 4x/week
      `)

    }

    else if (goal === "Weight Gain") {

      setResult(`
🍚 Healthy Weight Gain Plan

• Protein: 120g daily
• Calories surplus
• Peanut butter & nuts
• Strength workouts
• 8 hours sleep

Workout:
🏋️ Heavy strength training
🏋️ Progressive overload
      `)

    }

    else if (goal === "Maintenance") {

      setResult(`
🥙 Wellness Maintenance Plan

• Balanced nutrition
• 2.5 liters water
• Daily activity
• Good sleep routine
• Moderate exercise

Workout:
🚶 Walking
🧘 Yoga
🏋️ Light strength training
      `)

    }

  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            🤖
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            AI Diet Suggestions
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Personalized wellness recommendations
          </p>

        </div>

        {/* Goal Select */}

        <div className="space-y-5">

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-2xl text-lg"
          >
            <option value="">
              Select Goal
            </option>

            <option>
              Fat Loss
            </option>

            <option>
              Weight Gain
            </option>

            <option>
              Maintenance
            </option>

          </select>

          <button
            onClick={generatePlan}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-semibold"
          >
            Generate AI Plan
          </button>

        </div>

        {/* Results */}

        {result && (

          <div className="mt-10 bg-green-50 border border-green-100 rounded-3xl p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-6">
              Your AI Wellness Plan
            </h2>

            <pre className="whitespace-pre-wrap text-lg text-gray-700 leading-relaxed">
              {result}
            </pre>

          </div>

        )}

      </div>

    </main>
  )
}