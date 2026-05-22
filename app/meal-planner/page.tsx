export default function MealPlanner() {

  const meals = [
    {
      title: "Breakfast",
      meal: "Oats + Banana + Protein Shake"
    },
    {
      title: "Lunch",
      meal: "Brown Rice + Chicken + Vegetables"
    },
    {
      title: "Evening Snack",
      meal: "Nuts + Green Tea"
    },
    {
      title: "Dinner",
      meal: "Chapathi + Paneer + Salad"
    }
  ]

  return (
    <main className="min-h-screen bg-green-50 p-8">

      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        Meal Planner
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">

        {meals.map((item, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-3">
              {item.title}
            </h2>

            <p className="text-gray-700 text-lg">
              {item.meal}
            </p>

          </div>

        ))}

      </div>

    </main>
  )
}