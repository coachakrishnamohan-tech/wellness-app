export default function ChallengesPage() {

  const challenges = [
    {
      title: "10-Day Fat Loss Challenge",
      duration: "10 Days",
      description:
        "Daily workouts, hydration goals & fat loss nutrition guidance.",
      emoji: "🔥",
    },
    {
      title: "21-Day Healthy Habits Program",
      duration: "21 Days",
      description:
        "Build healthy routines, sleep habits & consistency.",
      emoji: "✅",
    },
    {
      title: "Muscle Gain Nutrition Bootcamp",
      duration: "30 Days",
      description:
        "High protein meal plans & strength workout guidance.",
      emoji: "💪",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      {/* Header */}

      <div className="text-center mb-14">

        <div className="text-7xl mb-5">
          🎯
        </div>

        <h1 className="text-5xl font-extrabold text-green-700">
          Wellness Challenges
        </h1>

        <p className="text-gray-500 mt-4 text-xl">
          Join premium wellness & transformation programs
        </p>

      </div>

      {/* Challenge Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {challenges.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 hover:shadow-2xl hover:-translate-y-2 transition"
          >

            <div className="text-6xl mb-6">
              {item.emoji}
            </div>

            <h2 className="text-3xl font-bold text-green-700 leading-snug">
              {item.title}
            </h2>

            <p className="text-green-600 font-semibold text-lg mt-4">
              ⏳ {item.duration}
            </p>

            <p className="text-gray-600 mt-5 text-lg leading-relaxed">
              {item.description}
            </p>

            <div className="mt-8">

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-bold transition shadow-lg">
                Join Challenge
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}