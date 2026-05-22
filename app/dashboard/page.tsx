"use client"

import Link from "next/link"
import { translations } from "../../lib/translations"
import { dashboardCards } from "../../lib/dashboardCards"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

export default function DashboardPage() {

  const [language, setLanguage] = useState("English")
  
  const router = useRouter()

  const t =
  translations[language as keyof typeof translations]
  
  const [darkMode, setDarkMode] = useState(false)
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      router.push("/login")
    }
    setLoading(false)
  }

  async function handleLogout() {

    await supabase.auth.signOut()

    router.push("/login")
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">

       <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-green-400"></div>

      </div>
    )
  }

  const filteredCards = dashboardCards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main
      className={`min-h-screen p-8 transition duration-500 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-green-50 via-white to-green-100"
      }`}
    >

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-14">

        <div>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-5 ${
                 darkMode
                   ? "bg-gray-800 text-green-400"
                   : "bg-green-100 text-green-700"
                }`}
          >
            🌿 Wellness Platform
          </div>

          <h1
            className={`text-5xl md:text-6xl font-extrabold leading-tight ${
              darkMode
                ? "text-green-400"
                : "text-green-700"
            }`}
          >
            {t.dashboard}
          </h1>

          <p
             className={`mt-4 text-xl max-w-3xl leading-relaxed ${
               darkMode
                 ? "text-gray-300"
                 : "text-gray-600"
              }`}
          >
            Track your nutrition, fitness, hydration, sleep, habits, AI wellness plans, appointments, and community wellness journey daily.
          </p>

        </div>

        <div className="flex gap-4 flex-wrap items-center">

          {/* Language Switch */}

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`rounded-2xl px-5 py-3 font-semibold shadow-md border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-green-200 text-green-700"
            }`}
          >
            <option>English</option>
            <option>Telugu</option>
            <option>Hindi</option>
            <option>Tamil</option>
            <option>Kannada</option>
          </select> 
          
          {/* Dark Mode */}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-5 py-3 rounded-2xl shadow-lg font-semibold transition ${
              darkMode
                ? "bg-yellow-400 text-black"
                : "bg-black text-white"
            }`}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>


          <Link
            href="/settings"
            className={`px-6 py-3 rounded-2xl shadow-md transition duration-300 text-lg font-semibold ${
              darkMode
                ? "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700"
                : "bg-white border border-green-200 hover:bg-green-50 text-green-700"
            }`}
          >
            Settings
          </Link>

          <Link
            href="/admin"
            className={`px-6 py-3 rounded-2xl shadow-md transition duration-300 text-lg font-semibold ${
              darkMode
                ? "bg-gray-800 border border-gray-700 text-white hover:bg-gray-700"
                : "bg-white border border-green-200 hover:bg-green-50 text-green-700"
            }`}
          >
            Admin
          </Link>


          <button
            onClick={handleLogout}
            className={`px-8 py-3 rounded-2xl shadow-xl transition duration-300 text-lg font-semibold ${
              darkMode
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
}`}
          >
            Logout
          </button>

        </div>

      </div>

      {/* Quick Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">

        <div className={`rounded-3xl p-8 shadow-lg border ${
               darkMode
                 ? "bg-gray-800 border-gray-700"
                 : "bg-white border-green-100"
              }`}>

          <div className="flex items-center justify-between">

            <div>

              <p className={`text-lg ${
                   darkMode
                     ? "text-gray-300"
                     : "text-gray-500"
                  }`}>
                Active Tools
              </p>

              <h2
                className={`text-5xl font-extrabold mt-3 ${
                  darkMode
                    ? "text-green-400"
                    : "text-green-700"
                }`}
              >
                48
              </h2>

            </div>

            <div className="text-6xl">
              🚀
            </div>

          </div>

        </div>

        <div className={`rounded-3xl p-8 shadow-lg border ${
               darkMode
                 ? "bg-gray-800 border-gray-700"
                 : "bg-white border-green-100"
              }`}>

          <div className="flex items-center justify-between">

            <div>

              <p className={`text-lg ${
                   darkMode
                     ? "text-gray-300"
                     : "text-gray-500"
                  }`}>
                Wellness Score
              </p>

              <h2
                className={`text-5xl font-extrabold mt-3 ${
                  darkMode
                    ? "text-green-400"
                    : "text-green-700"
                }`}
              >
                92%
              </h2>

            </div>

            <div className="text-6xl">
              💚
            </div>

          </div>

        </div>

        <div className={`rounded-3xl p-8 shadow-lg border ${
               darkMode
                 ? "bg-gray-800 border-gray-700"
                 : "bg-white border-green-100"
              }`}>

          <div className="flex items-center justify-between">

            <div>

              <p className={`text-lg ${
                   darkMode
                     ? "text-gray-300"
                     : "text-gray-500"
                  }`}>
                Daily Streak
              </p>

              <h2
                className={`text-5xl font-extrabold mt-3 ${
                  darkMode
                    ? "text-green-400"
                    : "text-green-700"
                }`}
              >
                14
              </h2>

            </div>

            <div className="text-6xl">
              🔥
            </div>

          </div>

        </div>

        <div
          className={`rounded-3xl p-8 shadow-lg border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-green-100"
          }`}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className={`text-lg ${
                   darkMode
                     ? "text-gray-300"
                     : "text-gray-500"
                  }`}>
                Clients
              </p>

              <h2
                className={`text-5xl font-extrabold mt-3 ${
                  darkMode
                    ? "text-green-400"
                    : "text-green-700"
                }`}
              >
                24
              </h2>

            </div>

            <div className="text-6xl">
              👥
            </div>

          </div>

        </div>

      </div>

      <div className="mb-10">

        <input
          type="text"
          placeholder="Search wellness tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full px-6 py-4 rounded-2xl border text-lg shadow-md outline-none focus:ring-4 focus:ring-green-300 placeholder-gray-400 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-green-100 text-black"
          }`}
        />

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {filteredCards.map((card, index) => (

              <Link
                key={index}
                href={card.link}
                className={`group p-8 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-3 hover:ring-2 hover:ring-green-400 transition duration-300 border overflow-hidden relative ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 text-white"
                    : "bg-white border-green-100"
                }`}
              >

                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition ${
                    darkMode
                      ? "bg-green-900"
                      : "bg-green-100"
                  }`}
                ></div>

                <div className="relative flex items-center justify-between mb-6">

                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition duration-300 shadow-inner ${
                         darkMode
                         ? "bg-gray-700"
                         : "bg-gradient-to-br from-green-100 to-green-200"
                    }`}>

                    {card.emoji}

                  </div>

                  <span
                    className={`text-sm font-bold px-4 py-2 rounded-full border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-green-400"
                        : "bg-green-50 border-green-100 text-green-700"
                    }`}
                  >
                    Wellness
                  </span>

                </div>

                <h2
                  className={`relative text-3xl font-extrabold mb-4 leading-snug ${
                    darkMode
                      ? "text-green-400"
                      : "text-green-700"
                  }`}
                >
                  {
                    card.title === "BMI Calculator"
                      ? t.bmi
                      : card.title === "Workout Planner"
                      ? t.workouts
                      : card.title === "Water Tracker"
                      ? t.water
                      : card.title === "Habit Tracker"
                      ? t.habits
                      : card.title === "Progress Analytics"
                      ? t.analytics
                      : card.title
                  }
                </h2>

                <p
                  className={`relative text-lg leading-relaxed min-h-[80px] ${
                    darkMode
                      ? "text-gray-300"
                      : "text-gray-600"
                  }`}
                >
                  {card.description}
                </p>

                <div className="relative mt-8">

                  <button className={`w-full px-8 py-3 rounded-2xl shadow-xl transition duration-300 text-lg font-semibold ${
                            darkMode
                              ? "bg-green-500 hover:bg-green-600 text-white"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}>
                    Open Tool →
                  </button>

                </div>

              </Link>
          
            ))}

          {filteredCards.length === 0 && (
            
            <div className="col-span-full text-center py-20">

              <h2
                className={`text-4xl font-bold ${
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-500"
                }`}
              >
                No tools found 😔
              </h2>

            </div>

          )}

      </div>

      {/* Footer */}

      <div className="mt-20 text-center">

        <div className={`inline-block px-8 py-4 rounded-2xl shadow-md border ${
               darkMode
                 ? "bg-gray-800 border-gray-700"
                 : "bg-white border-green-100"
              }`}>

            <p className={`text-lg ${
                 darkMode
                   ? "text-gray-300"
                   : "text-gray-600"
                }`}>
              Built with ❤️ for healthier lifestyles, smart coaching, AI wellness support & strong wellness communities
            </p>

        </div>

      </div>

    </main>
  )
}