"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function PhotoTrackerPage() {

  const [file, setFile] = useState<any>(null)
  const [caption, setCaption] = useState("")
  const [photos, setPhotos] = useState<any[]>([])

  useEffect(() => {
    fetchPhotos()
  }, [])

  async function fetchPhotos() {

    const { data } = await supabase
      .from("transformations")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) {
      setPhotos(data)
    }
  }

  async function uploadPhoto() {

    if (!file) return

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const fileName = `${Date.now()}-${file.name}`

    await supabase.storage
      .from("transformations")
      .upload(fileName, file)

    const { data } = supabase.storage
      .from("transformations")
      .getPublicUrl(fileName)

    await supabase.from("transformations").insert([
      {
        user_id: user.id,
        image_url: data.publicUrl,
        caption,
      },
    ])

    alert("Photo Uploaded ✅")

    setCaption("")
    setFile(null)

    fetchPhotos()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="text-7xl mb-5">
            📷
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Transformation Photos
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Upload your wellness transformation journey
          </p>

        </div>

        {/* Upload Card */}

        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-12">

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0])}
            className="w-full border border-gray-300 p-5 rounded-2xl"
          />

          <textarea
            placeholder="Write transformation caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border border-gray-300 p-5 rounded-2xl mt-5 h-32"
          />

          <button
            onClick={uploadPhoto}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full mt-6"
          >
            Upload Photo
          </button>

        </div>

        {/* Gallery */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {photos.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-green-100"
            >

              <img
                src={item.image_url}
                alt="Transformation"
                className="w-full h-96 object-cover"
              />

              <div className="p-6">

                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.caption}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}