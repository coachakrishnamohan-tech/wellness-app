"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function SettingsPage() {

  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      setUser(user)
    }
  }

  async function resetPassword() {

    if (!user?.email) return

    const { error } = await supabase.auth.resetPasswordForEmail(
      user.email,
      {
        redirectTo: "http://localhost:3001/login",
      }
    )

    if (error) {
      alert(error.message)
    } else {
      alert("Password reset email sent ✅")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl">

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            ⚙️
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Settings
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Manage your wellness account
          </p>

        </div>

        <div className="space-y-6">

          <div className="bg-green-50 p-6 rounded-2xl">

            <h2 className="text-gray-500 text-lg mb-2">
              Logged In Email
            </h2>

            <p className="text-2xl font-bold text-green-700 break-all">
              {user?.email}
            </p>

          </div>

          <div className="bg-green-50 p-6 rounded-2xl">

            <h2 className="text-gray-500 text-lg mb-4">
              Account Actions
            </h2>

            <button
              onClick={resetPassword}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold transition"
            >
              Reset Password
            </button>

          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl">

            <h2 className="text-yellow-700 text-xl font-bold mb-2">
              Future Features 🚀
            </h2>

            <ul className="text-gray-700 space-y-2 text-lg">

              <li>🌙 Dark Mode</li>
              <li>🌐 Multi-language Support</li>
              <li>📱 Push Notifications</li>
              <li>🤖 AI Wellness Suggestions</li>
              <li>📄 PDF Health Reports</li>

            </ul>

          </div>

        </div>

      </div>

    </main>
  )
}