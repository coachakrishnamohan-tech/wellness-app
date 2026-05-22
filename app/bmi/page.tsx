"use client"

import { useState } from "react"

export default function BMICalculator() {

  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBMI] = useState("")
  const [status, setStatus] = useState("")

  const calculateBMI = () => {

    const h = parseFloat(height) / 100
    const w = parseFloat(weight)

    if (!h || !w) return

    const result = (w / (h * h)).toFixed(1)

    setBMI(result)

    const bmiValue = parseFloat(result)

    if (bmiValue < 18.5) {
      setStatus("Underweight")
    } else if (bmiValue < 25) {
      setStatus("Normal Weight")
    } else if (bmiValue < 30) {
      setStatus("Overweight")
    } else {
      setStatus("Obese")
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          BMI Calculator
        </h1>

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
          onClick={calculateBMI}
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg"
        >
          Calculate BMI
        </button>

        {bmi && (
          <div className="mt-6 text-center">

            <p className="text-xl font-semibold text-gray-700">
              Your BMI
            </p>

            <h2 className="text-5xl font-bold text-green-700 mt-2">
              {bmi}
            </h2>

            <p className="text-lg text-gray-700 mt-4">
              Status:
            </p>

            <h3 className="text-2xl font-bold text-green-600">
              {status}
            </h3>

          </div>
        )}

      </div>

    </main>
  )
}