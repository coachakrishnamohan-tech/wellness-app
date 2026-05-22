export default function Home() {
  return (
    <main className="min-h-screen bg-green-50">

      {/* Navbar */}

      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow">

        <h1 className="text-2xl font-bold text-green-700">
          Wellness App
        </h1>

        <div className="flex gap-4">

          <a
            href="/login"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </a>

          <a
            href="/register"
            className="border border-green-600 text-green-700 px-5 py-2 rounded-lg hover:bg-green-100"
          >
            Register
          </a>

        </div>

      </nav>

      {/* Hero Section */}

      <section className="flex flex-col items-center justify-center text-center py-32 px-6">

        <h2 className="text-6xl font-bold text-green-700 mb-6">
          Transform Your Health Journey
        </h2>

        <p className="text-gray-700 text-xl max-w-2xl mb-8">
          Track your weight, workouts, meals, sleep, water intake and wellness progress easily.
        </p>

        <a
          href="/register"
          className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg hover:bg-green-700"
        >
          Get Started
        </a>

      </section>

    </main>
  )
}