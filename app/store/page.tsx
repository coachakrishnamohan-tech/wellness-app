export default function StorePage() {

  const products = [
    {
      title: "10-Day Fat Loss Ebook",
      price: "₹299",
      description:
        "Complete fat loss nutrition guide with meal plans & workouts.",
      emoji: "🔥",
    },
    {
      title: "Protein Rich Telugu Recipes",
      price: "₹199",
      description:
        "Healthy high-protein Telugu recipes for wellness & fitness.",
      emoji: "🥗",
    },
    {
      title: "PCOD Nutrition Guide",
      price: "₹499",
      description:
        "Premium nutrition strategies for PCOD wellness support.",
      emoji: "🌸",
    },
    {
      title: "Healthy Telugu Kitchen",
      price: "₹249",
      description:
        "Traditional healthy Telugu food recipes & wellness tips.",
      emoji: "🍲",
    },
    {
      title: "Muscle Gain Blueprint",
      price: "₹399",
      description:
        "Lean muscle gain workouts & high protein diet system.",
      emoji: "💪",
    },
    {
      title: "Wellness Habit Mastery",
      price: "₹349",
      description:
        "Daily routines, sleep optimization & healthy lifestyle habits.",
      emoji: "✅",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      {/* Header */}

      <div className="text-center mb-16">

        <div className="text-7xl mb-5">
          📚
        </div>

        <h1 className="text-5xl font-extrabold text-green-700">
          Wellness Store
        </h1>

        <p className="text-gray-500 mt-4 text-xl">
          Premium ebooks, nutrition guides & digital wellness products
        </p>

      </div>

      {/* Product Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {products.map((product, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl border border-green-100 p-8 hover:shadow-3xl hover:-translate-y-2 transition"
          >

            <div className="text-6xl mb-6">
              {product.emoji}
            </div>

            <h2 className="text-3xl font-extrabold text-green-700 leading-snug">
              {product.title}
            </h2>

            <p className="text-gray-600 mt-5 text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="mt-8 flex items-center justify-between">

              <span className="text-4xl font-extrabold text-green-700">
                {product.price}
              </span>

              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-lg font-bold shadow-lg transition">
                Buy Now
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}