"use client"

export default function AdminAnalyticsPage() {

  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      emoji: "👥",
    },
    {
      title: "Appointments",
      value: "326",
      emoji: "📅",
    },
    {
      title: "Calories Logged",
      value: "12,430",
      emoji: "🍎",
    },
    {
      title: "Water Entries",
      value: "8,921",
      emoji: "💧",
    },
    {
      title: "Transformation Uploads",
      value: "524",
      emoji: "📷",
    },
    {
      title: "Community Posts",
      value: "1,102",
      emoji: "🌐",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      {/* Header */}

      <div className="text-center mb-14">

        <div className="text-7xl mb-5">
          👨‍💻
        </div>

        <h1 className="text-5xl font-extrabold text-green-700">
          Admin Analytics Dashboard
        </h1>

        <p className="text-gray-500 mt-4 text-xl">
          Monitor wellness platform growth & engagement
        </p>

      </div>

      {/* Analytics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {stats.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl border border-green-100 p-8 hover:shadow-3xl hover:-translate-y-2 transition"
          >

            <div className="flex items-center justify-between mb-6">

              <div className="text-6xl">
                {item.emoji}
              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold">
                LIVE
              </span>

            </div>

            <h2 className="text-4xl font-extrabold text-green-700">
              {item.value}
            </h2>

            <p className="text-gray-600 mt-4 text-xl">
              {item.title}
            </p>

          </div>

        ))}

      </div>

      {/* Extra Section */}

      <div className="bg-white rounded-3xl shadow-2xl border border-green-100 p-10 mt-14">

        <h2 className="text-4xl font-extrabold text-green-700 mb-8">
          Platform Insights 🚀
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-green-50 rounded-2xl p-6">

            <h3 className="text-2xl font-bold text-green-700">
              Active Members
            </h3>

            <p className="text-5xl font-extrabold text-green-700 mt-5">
              892
            </p>

          </div>

          <div className="bg-green-50 rounded-2xl p-6">

            <h3 className="text-2xl font-bold text-green-700">
              Monthly Revenue
            </h3>

            <p className="text-5xl font-extrabold text-green-700 mt-5">
              ₹1.2L
            </p>

          </div>

          <div className="bg-green-50 rounded-2xl p-6">

            <h3 className="text-2xl font-bold text-green-700">
              Challenge Participants
            </h3>

            <p className="text-5xl font-extrabold text-green-700 mt-5">
              436
            </p>

          </div>

        </div>

      </div>

    </main>
  )
}