"use client"

export default function WhatsAppSupportPage() {

  const whatsappNumber = "917416376983"

  const defaultMessage =
    "Hello Coach 👋 I need wellness guidance."

  const whatsappLink =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-4xl text-center">

        {/* Header */}

        <div className="mb-12">

          <div className="text-8xl mb-5">
            💬
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            WhatsApp Coaching Support
          </h1>

          <p className="text-gray-500 mt-4 text-xl">
            Connect instantly with your wellness coach
          </p>

        </div>

        {/* Support Card */}

        <div className="bg-green-50 border border-green-100 rounded-3xl p-10">

          <div className="text-7xl mb-6">
            📱
          </div>

          <h2 className="text-4xl font-bold text-green-700">
            Instant Wellness Support
          </h2>

          <p className="text-gray-600 mt-5 text-lg leading-relaxed">
            Get help with nutrition, fat loss, workouts, hydration,
            wellness challenges & transformation guidance directly on WhatsApp.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            className="inline-block mt-10 bg-green-600 hover:bg-green-700 text-white px-10 py-5 rounded-2xl text-2xl font-bold shadow-xl transition"
          >
            Open WhatsApp Chat
          </a>

        </div>

        {/* Features */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              🥗
            </div>

            <h3 className="text-2xl font-bold text-green-700">
              Nutrition Support
            </h3>

          </div>

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              🔥
            </div>

            <h3 className="text-2xl font-bold text-green-700">
              Fat Loss Guidance
            </h3>

          </div>

          <div className="bg-white border border-green-100 rounded-2xl p-6 shadow-md">

            <div className="text-5xl mb-4">
              💪
            </div>

            <h3 className="text-2xl font-bold text-green-700">
              Coaching Support
            </h3>

          </div>

        </div>

      </div>

    </main>
  )
}