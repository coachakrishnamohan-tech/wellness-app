"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function ProfilePage() {

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl">

        {/* Profile Header */}

        <div className="flex flex-col items-center text-center">

          <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center text-6xl mb-6">
            👤
          </div>

          <h1 className="text-5xl font-bold text-green-700">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Wellness Member Details
          </p>

        </div>

        {/* User Details */}

        <div className="mt-10 space-y-6">

          <div className="bg-green-50 p-6 rounded-2xl">

            <h2 className="text-gray-500 text-lg mb-2">
              Full Name
            </h2>

            <p className="text-2xl font-bold text-green-700">
              {user?.user_metadata?.full_name || "No Name"}
            </p>

          </div>

          <div className="bg-green-50 p-6 rounded-2xl">

            <h2 className="text-gray-500 text-lg mb-2">
              Email Address
            </h2>

            <p className="text-2xl font-bold text-green-700 break-all">
              {user?.email}
            </p>

          </div>

          <div className="bg-green-50 p-6 rounded-2xl">

            <h2 className="text-gray-500 text-lg mb-2">
              Account ID
            </h2>

            <p className="text-sm text-green-700 break-all">
              {user?.id}
            </p>

          </div>

        </div>

      </div>

    </main>
  )
}