"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function JournalPage() {

  const [mood, setMood] = useState("")
  const [note, setNote] = useState("")
  const [entries, setEntries] = useState<any[]>([])

  useEffect(() => {
    fetchJournal()
  }, [])

  async function fetchJournal() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("journal")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setEntries(data)
    }
  }

  async function saveJournal() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("journal").insert([
      {
        user_id: user.id,
        mood,
        note,
      },
    ])

    alert("Journal Saved ✅")

    setMood("")
    setNote("")

    fetchJournal()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            😊
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Wellness Journal
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Track your mood & emotional wellness daily
          </p>

        </div>

        {/* Mood Selection */}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">

          {["😄", "😊", "😐", "😔", "😴"].map((emoji) => (

            <button
              key={emoji}
              onClick={() => setMood(emoji)}
              className={`text-5xl p-5 rounded-2xl border transition ${
                mood === emoji
                  ? "bg-green-100 border-green-500"
                  : "bg-white border-gray-200"
              }`}
            >
              {emoji}
            </button>

          ))}

        </div>

        {/* Notes */}

        <textarea
          placeholder="Write your thoughts, gratitude or wellness notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-gray-300 rounded-2xl p-5 h-40 text-lg"
        />

        <button
          onClick={saveJournal}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full mt-6"
        >
          Save Journal
        </button>

        {/* History */}

        <div className="mt-12 space-y-5">

          {entries.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <div className="flex items-start gap-5">

                <div className="text-5xl">
                  {item.mood}
                </div>

                <div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    {item.note}
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