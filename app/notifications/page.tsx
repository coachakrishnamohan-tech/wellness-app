"use client"

import TopBar from "@/app/components/TopBar"
import { useState } from "react"

export default function NotificationsPage() {

  const [enabled, setEnabled] = useState(false)

  function toggleNotifications() {

    setEnabled(!enabled)

    if (!enabled) {
      alert("Notifications Enabled 🔔")
    } else {
      alert("Notifications Disabled ❌")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            🔔
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Daily Notifications
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Stay consistent with wellness reminders
          </p>

        </div>

        {/* Toggle */}

        <div className="bg-green-50 border border-green-100 rounded-3xl p-8">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-3xl font-bold text-green-700">
                Notifications
              </h2>

              <p className="text-gray-600 mt-2 text-lg">
                Water, meals, workouts & sleep reminders
              </p>

            </div>

            <button
              onClick={toggleNotifications}
              className={`px-8 py-4 rounded-2xl text-white text-lg font-bold transition ${
                enabled
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {enabled ? "Disable" : "Enable"}
            </button>

          </div>

        </div>

        {/* Reminder Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">

          <div className="bg-white border border-green-100 shadow-md rounded-2xl p-6">

            <div className="text-5xl mb-4">
              💧
            </div>

            <h2 className="text-2xl font-bold text-green-700">
              Water Reminder
            </h2>

            <p className="text-gray-600 mt-2">
              Drink water every 2 hours
            </p>

          </div>

          <div className="bg-white border border-green-100 shadow-md rounded-2xl p-6">

            <div className="text-5xl mb-4">
              🍽️
            </div>

            <h2 className="text-2xl font-bold text-green-700">
              Meal Reminder
            </h2>

            <p className="text-gray-600 mt-2">
              Never skip healthy meals
            </p>

          </div>

          <div className="bg-white border border-green-100 shadow-md rounded-2xl p-6">

            <div className="text-5xl mb-4">
              🏋️
            </div>

            <h2 className="text-2xl font-bold text-green-700">
              Workout Reminder
            </h2>

            <p className="text-gray-600 mt-2">
              Stay active daily
            </p>

          </div>

          <div className="bg-white border border-green-100 shadow-md rounded-2xl p-6">

            <div className="text-5xl mb-4">
              😴
            </div>

            <h2 className="text-2xl font-bold text-green-700">
              Sleep Reminder
            </h2>

            <p className="text-gray-600 mt-2">
              Maintain healthy sleep routine
            </p>

          </div>

        </div>

      </div>

    </main>
  )
}