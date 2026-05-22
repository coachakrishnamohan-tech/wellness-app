"use client"

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

export default function ProgressAnalyticsPage() {

  const weightData = [
    { week: "Week 1", weight: 82 },
    { week: "Week 2", weight: 80 },
    { week: "Week 3", weight: 78 },
    { week: "Week 4", weight: 76 },
    { week: "Week 5", weight: 74 },
  ]

  const hydrationData = [
    { day: "Mon", water: 2 },
    { day: "Tue", water: 3 },
    { day: "Wed", water: 4 },
    { day: "Thu", water: 3 },
    { day: "Fri", water: 5 },
    { day: "Sat", water: 4 },
    { day: "Sun", water: 3 },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-14">

          <div className="text-8xl mb-5">
            📈
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Progress Analytics
          </h1>

          <p className="text-gray-500 mt-3 text-xl">
            Visualize wellness transformation insights
          </p>

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

          {/* Weight Chart */}

          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-8">
              Weight Progress
            </h2>

            <div className="h-[400px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={weightData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="week" />

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

          {/* Hydration Chart */}

          <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-8">

            <h2 className="text-3xl font-bold text-green-700 mb-8">
              Hydration Analytics
            </h2>

            <div className="h-[400px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={hydrationData}>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="day" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="water"
                    fill="#16a34a"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Insights */}

        <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-10 mt-14">

          <h2 className="text-4xl font-extrabold text-green-700 mb-8">
            Wellness Insights 🌿
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-green-50 rounded-2xl p-6">

              <h3 className="text-2xl font-bold text-green-700">
                Weight Lost
              </h3>

              <p className="text-5xl font-extrabold text-green-700 mt-5">
                8 KG
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-6">

              <h3 className="text-2xl font-bold text-green-700">
                Average Water
              </h3>

              <p className="text-5xl font-extrabold text-green-700 mt-5">
                3.5L
              </p>

            </div>

            <div className="bg-green-50 rounded-2xl p-6">

              <h3 className="text-2xl font-bold text-green-700">
                Workout Consistency
              </h3>

              <p className="text-5xl font-extrabold text-green-700 mt-5">
                92%
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  )
}