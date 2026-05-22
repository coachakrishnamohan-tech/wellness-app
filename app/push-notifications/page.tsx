"use client"

import toast from "react-hot-toast"

export default function PushNotificationsPage() {

  function sendWaterReminder() {

    toast.success("💧 Time to drink water!")

  }

  function sendWorkoutReminder() {

    toast.success("🏋️ Workout time! Stay active!")

  }

  function sendSleepReminder() {

    toast.success("😴 Sleep reminder: Get quality rest!")

  }

  function sendMealReminder() {

    toast.success("🍽️ Healthy meal time!")

  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            📱
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Push Notifications
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Real wellness reminders & alerts
          </p>

        </div>

        {/* Notification Buttons */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <button
            onClick={sendWaterReminder}
            className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-3xl text-2xl font-bold shadow-lg transition"
          >
            💧 Water Reminder
          </button>

          <button
            onClick={sendWorkoutReminder}
            className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-3xl text-2xl font-bold shadow-lg transition"
          >
            🏋️ Workout Reminder
          </button>

          <button
            onClick={sendMealReminder}
            className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-3xl text-2xl font-bold shadow-lg transition"
          >
            🍽️ Meal Reminder
          </button>

          <button
            onClick={sendSleepReminder}
            className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-3xl text-2xl font-bold shadow-lg transition"
          >
            😴 Sleep Reminder
          </button>

        </div>

      </div>

    </main>
  )
}