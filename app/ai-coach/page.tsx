"use client"

import { useState } from "react"

export default function AICoachPage() {

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState<any[]>([
    {
      role: "assistant",
      text: "Hello 👋 I am your AI Wellness Coach. Ask me anything about fitness, fat loss, hydration, sleep or nutrition."
    }
  ])

  function sendMessage() {

    if (!message) return

    const userMessage = {
      role: "user",
      text: message
    }

    let aiReply = ""

    if (message.toLowerCase().includes("protein")) {

      aiReply =
        "💪 Protein helps muscle recovery & fat loss. Include eggs, paneer, chicken, fish & protein shakes."

    } else if (message.toLowerCase().includes("water")) {

      aiReply =
        "💧 Drink at least 3-4 liters of water daily for better metabolism & hydration."

    } else if (message.toLowerCase().includes("sleep")) {

      aiReply =
        "😴 Aim for 7-8 hours of quality sleep daily for recovery & hormone balance."

    } else if (message.toLowerCase().includes("fat loss")) {

      aiReply =
        "🔥 For fat loss: calorie deficit + protein + walking + consistency is key."

    } else {

      aiReply =
        "🌿 Stay consistent with healthy nutrition, hydration, workouts & sleep for better wellness."
    }

    const assistantMessage = {
      role: "assistant",
      text: aiReply
    }

    setChat([...chat, userMessage, assistantMessage])

    setMessage("")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-8">

        {/* Header */}

        <div className="text-center mb-8">

          <div className="text-7xl mb-4">
            🤖
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            AI Wellness Coach
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Ask wellness, nutrition & fitness questions
          </p>

        </div>

        {/* Chat Area */}

        <div className="bg-green-50 border border-green-100 rounded-3xl p-6 h-[500px] overflow-y-auto space-y-5">

          {chat.map((msg, index) => (

            <div
              key={index}
              className={`p-5 rounded-2xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-green-600 text-white ml-auto"
                  : "bg-white text-gray-700"
              }`}
            >

              {msg.text}

            </div>

          ))}

        </div>

        {/* Input */}

        <div className="flex gap-4 mt-6">

          <input
            type="text"
            placeholder="Ask wellness questions..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-gray-300 p-5 rounded-2xl"
          />

          <button
            onClick={sendMessage}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-5 rounded-2xl text-xl font-bold shadow-lg transition"
          >
            Send
          </button>

        </div>

      </div>

    </main>
  )
}