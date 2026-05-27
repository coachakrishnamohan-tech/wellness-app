"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function AppointmentsPage() {

  const [clientName, setClientName] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [appointments, setAppointments] = useState<any[]>([])

  useEffect(() => {
    fetchAppointments()
  }, [])

  async function fetchAppointments() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (data) {
      setAppointments(data)
    }
  }

  async function bookAppointment() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("appointments").insert([
      {
        user_id: user.id,
        client_name: clientName,
        appointment_date: date,
        appointment_time: time,
      },
    ])

    alert("Appointment Booked ✅")

    setClientName("")
    setDate("")
    setTime("")

    fetchAppointments()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-6xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="text-7xl mb-5">
            📅
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Appointment Booking
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Book wellness consultations & coaching sessions
          </p>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
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
          onClick={bookAppointment}
          className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full"
        >
          Book Appointment
        </button>

        {/* Appointment History */}

        <div className="mt-12 space-y-5">

          {appointments.map((item) => (

            <div
              key={item.id}
              className="bg-green-50 border border-green-100 rounded-2xl p-6"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>

                  <h2 className="text-2xl font-bold text-green-700">
                    {item.client_name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    📅 {item.appointment_date}
                  </p>

                </div>

                <div className="text-xl font-semibold text-green-700">
                  ⏰ {item.appointment_time}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}