export default function PricingPage() {

  const plans = [
    {
      title: "Starter Plan",
      price: "₹499",
      duration: "/month",
      features: [
        "BMI & BMR Tools",
        "Habit Tracker",
        "Water Reminders",
        "Community Access",
      ],
      emoji: "🌱",
    },
    {
      title: "Premium Plan",
      price: "₹1499",
      duration: "/month",
      features: [
        "AI Wellness Coach",
        "Meal Plans",
        "Appointments",
        "PDF Reports",
        "Progress Analytics",
      ],
      emoji: "🔥",
    },
    {
      title: "VIP Coaching",
      price: "₹4999",
      duration: "/month",
      features: [
        "1-on-1 Coaching",
        "Custom Diet Plans",
        "Priority Support",
        "Transformation Program",
        "Weekly Consultations",
      ],
      emoji: "👑",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      {/* Header */}

      <div className="text-center mb-16">

        <div className="text-7xl mb-5">
          💳
        </div>

        <h1 className="text-5xl font-extrabold text-green-700">
          Membership Plans
        </h1>

        <p className="text-gray-500 mt-4 text-xl">
          Unlock premium wellness coaching & tools
        </p>

      </div>

      {/* Pricing Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {plans.map((plan, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl border border-green-100 p-10 hover:shadow-3xl hover:-translate-y-2 transition"
          >

            <div className="text-6xl mb-6">
              {plan.emoji}
            </div>

            <h2 className="text-4xl font-extrabold text-green-700">
              {plan.title}
            </h2>

            <div className="mt-6">

              <span className="text-5xl font-extrabold text-green-700">
                {plan.price}
              </span>

              <span className="text-gray-500 text-xl">
                {plan.duration}
              </span>

            </div>

            <div className="mt-8 space-y-4">

              {plan.features.map((feature, i) => (

                <div
                  key={i}
                  className="flex items-center gap-3"
                >

                  <span className="text-green-600 text-2xl">
                    ✅
                  </span>

                  <p className="text-lg text-gray-700">
                    {feature}
                  </p>

                </div>

              ))}

            </div>

            <button className="w-full mt-10 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl text-xl font-bold shadow-lg transition">
              Choose Plan
            </button>

          </div>

        ))}

      </div>

    </main>
  )
}