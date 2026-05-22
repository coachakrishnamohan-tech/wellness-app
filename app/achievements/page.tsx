"use client"

export default function AchievementsPage() {

  const badges = [
    {
      title: "7 Day Streak",
      icon: "🔥",
      description: "Completed wellness tracking for 7 days",
    },
    {
      title: "Hydration Master",
      icon: "💧",
      description: "Completed daily water goals",
    },
    {
      title: "Fat Loss Warrior",
      icon: "🏆",
      description: "Lost first 5 KG milestone",
    },
    {
      title: "Meal Tracker Pro",
      icon: "🥗",
      description: "Logged 30 healthy meals",
    },
    {
      title: "Step Champion",
      icon: "🚶",
      description: "Reached 10,000 daily steps",
    },
    {
      title: "Consistency King",
      icon: "👑",
      description: "Maintained wellness streak for 30 days",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      {/* Header */}

      <div className="text-center mb-14">

        <div className="text-8xl mb-5">
          🏆
        </div>

        <h1 className="text-5xl font-extrabold text-green-700">
          Achievements & Badges
        </h1>

        <p className="text-gray-500 mt-4 text-xl">
          Unlock wellness milestones & motivational rewards
        </p>

      </div>

      {/* Badges Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {badges.map((badge, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl border border-green-100 p-8 text-center hover:shadow-3xl hover:-translate-y-2 transition"
          >

            <div className="text-7xl mb-6">
              {badge.icon}
            </div>

            <h2 className="text-3xl font-extrabold text-green-700">
              {badge.title}
            </h2>

            <p className="text-gray-600 mt-5 text-lg leading-relaxed">
              {badge.description}
            </p>

            <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition">
              View Badge
            </button>

          </div>

        ))}

      </div>

    </main>
  )
}