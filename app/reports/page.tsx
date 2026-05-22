"use client"

import jsPDF from "jspdf"

export default function ReportsPage() {

  function generatePDF() {

    const doc = new jsPDF()

    doc.setFontSize(24)

    doc.text("Wellness Health Report", 20, 30)

    doc.setFontSize(16)

    doc.text("Client Name: Krish", 20, 60)

    doc.text("BMI: 24.1", 20, 80)

    doc.text("BMR: 1650 Calories", 20, 100)

    doc.text("Water Intake: 3 Liters", 20, 120)

    doc.text("Sleep: 7 Hours", 20, 140)

    doc.text("Daily Steps: 8000", 20, 160)

    doc.text("Wellness Score: 92%", 20, 180)

    doc.text("Coach Recommendation:", 20, 210)

    doc.setFontSize(14)

    doc.text(
      "Maintain high protein diet, hydration, quality sleep & regular workouts.",
      20,
      230,
      {
        maxWidth: 160,
      }
    )

    doc.save("wellness-report.pdf")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl text-center">

        <div className="text-7xl mb-6">
          📄
        </div>

        <h1 className="text-5xl font-extrabold text-green-700">
          Health PDF Reports
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Download professional wellness reports
        </p>

        <div className="mt-12 bg-green-50 border border-green-100 rounded-3xl p-8">

          <h2 className="text-3xl font-bold text-green-700 mb-6">
            Generate Report
          </h2>

          <button
            onClick={generatePDF}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition"
          >
            Download PDF Report
          </button>

        </div>

      </div>

    </main>
  )
}