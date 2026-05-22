"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function NotificationsCenterPage() {

  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    fetchNotifications()
  }, [])

  async function fetchNotifications() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setNotifications(data)
    }
  }

  async function addDemoNotifications() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("notifications").insert([
      {
        user_id: user.id,
        title: "💧 Water Reminder",
        message: "Drink 1 glass of water now.",
      },
      {
        user_id: user.id,
        title: "🏋️ Workout Reminder",
        message: "Complete your daily workout today.",
      },
      {
        user_id: user.id,
        title: "😴 Sleep Reminder",
        message: "Get at least 7-8 hours sleep tonight.",
      },
    ])

    alert("Notifications Added ✅")

    fetchNotifications()
  }

  async function markAsRead(id: string) {

    await supabase
      .from("notifications")
      .update({
        read: true,
      })
      .eq("id", id)

    fetchNotifications()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="text-8xl mb-5">
            🔔
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Notification Center
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Wellness reminders & smart alerts
          </p>

        </div>

        {/* Add Notifications */}

        <button
          onClick={addDemoNotifications}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Generate Notifications
        </button>

        {/* Notification List */}

        <div className="mt-12 space-y-5">

          {notifications.map((item) => (

            <div
              key={item.id}
              className={`rounded-2xl p-6 border transition ${
                item.read
                  ? "bg-gray-100 border-gray-200"
                  : "bg-green-50 border-green-100"
              }`}
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <h2 className="text-2xl font-bold text-green-700">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 mt-3 text-lg">
                    {item.message}
                  </p>

                </div>

                {!item.read && (

                  <button
                    onClick={() => markAsRead(item.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl font-bold transition"
                  >
                    Mark Read
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}