export default function TransformationsPage() {

  const transformations = [
    {
      name: "Rahul",
      result: "Lost 12 KG in 90 Days",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    },
    {
      name: "Priya",
      result: "Improved Energy & Fitness",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      name: "Arjun",
      result: "Gained Lean Muscle",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      {/* Header */}

      <div className="text-center mb-14">

        <div className="text-7xl mb-5">
          📸
        </div>

        <h1 className="text-5xl font-extrabold text-green-700">
          Transformation Gallery
        </h1>

        <p className="text-gray-500 mt-4 text-xl">
          Real wellness success stories & client results
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {transformations.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100 hover:shadow-2xl transition"
          >

            <img
              src={item.image}
              alt={item.name}
              className="w-full h-80 object-cover"
            />

            <div className="p-8">

              <h2 className="text-3xl font-bold text-green-700">
                {item.name}
              </h2>

              <p className="text-gray-600 mt-4 text-lg leading-relaxed">
                {item.result}
              </p>

              <div className="mt-6">

                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold transition">
                  View Story
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}