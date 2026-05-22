"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function AdminPage() {

  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {

    const { data } = await supabase.auth.getSession()

    console.log(data)

    /*
      Future:
      Real admin users fetch chestham
    */

    setUsers([
      {
        name: "Krish",
        email: "krish@gmail.com",
        status: "Active"
      },
      {
        name: "Rahul",
        email: "rahul@gmail.com",
        status: "Active"
      },
      {
        name: "Priya",
        email: "priya@gmail.com",
        status: "Inactive"
      }
    ])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

        <div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Admin Dashboard
          </h1>

          <p className="text-gray-600 mt-3 text-xl">
            Manage wellness customers & analytics
          </p>

        </div>

        <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-2xl shadow-lg text-lg font-semibold">
          Admin Panel
        </button>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <p className="text-gray-500 text-lg">
            Total Clients
          </p>

          <h2 className="text-5xl font-extrabold text-green-700 mt-3">
            {users.length}
          </h2>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <p className="text-gray-500 text-lg">
            Active Users
          </p>

          <h2 className="text-5xl font-extrabold text-green-700 mt-3">
            2
          </h2>

        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <p className="text-gray-500 text-lg">
            Wellness Score
          </p>

          <h2 className="text-5xl font-extrabold text-green-700 mt-3">
            95%
          </h2>

        </div>

      </div>

      {/* Users Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="p-8 border-b border-green-100">

          <h2 className="text-3xl font-bold text-green-700">
            Customer List
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-100">

              <tr>

                <th className="text-left p-5 text-green-700 text-lg">
                  Name
                </th>

                <th className="text-left p-5 text-green-700 text-lg">
                  Email
                </th>

                <th className="text-left p-5 text-green-700 text-lg">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user, index) => (

                <tr
                  key={index}
                  className="border-b border-green-50 hover:bg-green-50"
                >

                  <td className="p-5 text-lg">
                    {user.name}
                  </td>

                  <td className="p-5 text-lg">
                    {user.email}
                  </td>

                  <td className="p-5">

                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {user.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </main>
  )
}