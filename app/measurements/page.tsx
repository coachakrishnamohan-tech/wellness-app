"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function MeasurementsPage() {

  const [waist, setWaist] = useState("")
  const [chest, setChest] = useState("")
  const [arms, setArms] = useState("")
  const [thighs, setThighs] = useState("")
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    fetchMeasurements()
  }, [])

  async function fetchMeasurements() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("measurements")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setHistory(data)
    }
  }

  async function addMeasurements() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("measurements").insert([
      {
        user_id: user.id,
        waist,
        chest,
        arms,
        thighs,
      },
    ])

    alert("Measurements Added ✅")

    setWaist("")
    setChest("")
    setArms("")
    setThighs("")

    fetchMeasurements()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-6xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            📏
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Body Measurements
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Track body transformation measurements
          </p>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

          <input
            type="text"
            placeholder="Waist"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Chest"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Arms"
            value={arms}
            onChange={(e) => setArms(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Thighs"
            value={thighs}
            onChange={(e) => setThighs(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

        </div>

        <button
          onClick={addMeasurements}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Save Measurements
        </button>

        {/* History */}

        <div className="mt-12 space-y-5">

          {history.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                <div>

                  <h3 className="text-xl font-bold text-green-700">
                    Waist
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {item.waist}
                  </p>

                </div>

                <div>

                  <h3 className="text-xl font-bold text-green-700">
                    Chest
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {item.chest}
                  </p>

                </div>

                <div>

                  <h3 className="text-xl font-bold text-green-700">
                    Arms
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {item.arms}
                  </p>

                </div>

                <div>

                  <h3 className="text-xl font-bold text-green-700">
                    Thighs
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {item.thighs}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}