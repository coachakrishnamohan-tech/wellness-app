"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function VideoConsultationPage() {

  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [sessions, setSessions] = useState<any[]>([])

  useEffect(() => {
    fetchSessions()
  }, [])

  async function fetchSessions() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("video_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setSessions(data)
    }
  }

  async function createSession() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("video_sessions").insert([
      {
        user_id: user.id,
        session_title: title,
        meeting_link: link,
        session_date: date,
        session_time: time,
      },
    ])

    alert("Session Added ✅")

    setTitle("")
    setLink("")
    setDate("")
    setTime("")

    fetchSessions()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-10">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="text-8xl mb-5">
            🎥
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Video Consultation
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Join live wellness coaching sessions online
          </p>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

          <input
            type="text"
            placeholder="Session Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="text"
            placeholder="Meeting Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-gray-300 p-5 rounded-2xl"
          />

        </div>

        <button
          onClick={createSession}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Create Session
        </button>

        {/* Sessions */}

        <div className="mt-12 space-y-6">

          {sessions.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>

                  <h2 className="text-3xl font-bold text-green-700">
                    {item.session_title}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    📅 {item.session_date}
                  </p>

                  <p className="text-gray-600">
                    ⏰ {item.session_time}
                  </p>

                </div>

                <a
                  href={item.meeting_link}
                  target="_blank"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg transition"
                >
                  Join Session
                </a>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}