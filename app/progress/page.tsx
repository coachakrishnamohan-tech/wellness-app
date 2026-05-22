"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    day: "Mon",
    weight: 72,
  },
  {
    day: "Tue",
    weight: 71.5,
  },
  {
    day: "Wed",
    weight: 71,
  },
  {
    day: "Thu",
    weight: 70.8,
  },
  {
    day: "Fri",
    weight: 70.5,
  },
  {
    day: "Sat",
    weight: 70.2,
  },
  {
    day: "Sun",
    weight: 70,
  },
]

export default function ProgressPage() {

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-6xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            📊
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Progress Analytics
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Track your wellness journey visually
          </p>

        </div>

        {/* Chart */}

        <div className="bg-green-50 border border-green-100 rounded-3xl p-8">

          <h2 className="text-3xl font-bold text-green-700 mb-8">
            Weekly Weight Progress
          </h2>

          <div className="w-full h-[400px]">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#16a34a"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              📉
            </div>

            <h2 className="text-3xl font-bold text-green-700">
              2 KG
            </h2>

            <p className="text-gray-600 mt-2">
              Weight Loss
            </p>

          </div>

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              💧
            </div>

            <h2 className="text-3xl font-bold text-green-700">
              3L
            </h2>

            <p className="text-gray-600 mt-2">
              Daily Water Intake
            </p>

          </div>

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              😴
            </div>

            <h2 className="text-3xl font-bold text-green-700">
              7 Hrs
            </h2>

            <p className="text-gray-600 mt-2">
              Average Sleep
            </p>

          </div>

        </div>

      </div>

    </main>
  )
}