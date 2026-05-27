"use client"

import TopBar from "@/app/components/TopBar"
import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function CommunityPage() {

  const [username, setUsername] = useState("")
  const [content, setContent] = useState("")
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {

    const { data } = await supabase
      .from("community_posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (data) {
      setPosts(data)
    }
  }

  async function createPost() {

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("community_posts").insert([
      {
        user_id: user.id,
        username,
        content,
      },
    ])

    alert("Post Shared ✅")

    setUsername("")
    setContent("")

    fetchPosts()
  }

  async function likePost(id: string, currentLikes: number) {

    await supabase
      .from("community_posts")
      .update({
        likes: currentLikes + 1,
      })
      .eq("id", id)

    fetchPosts()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="text-center mb-12">

          <div className="text-7xl mb-5">
            🌐
          </div>

          <h1 className="text-5xl font-extrabold text-green-700">
            Wellness Community
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Share motivation, wellness tips & transformation stories
          </p>

        </div>

        {/* Create Post */}

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10">

          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-5 rounded-2xl mb-5"
          />

          <textarea
            placeholder="Share wellness tips or motivation..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 p-5 rounded-2xl h-40"
          />

          <button
            onClick={createPost}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg transition w-full mt-6"
          >
            Share Post
          </button>

        </div>

        {/* Feed */}

        <div className="space-y-6">

          {posts.map((post) => (

            <div
              key={post.id}
              className="bg-white rounded-3xl shadow-xl border border-green-100 p-8"
            >

              <div className="flex items-center justify-between">

                <h2 className="text-2xl font-bold text-green-700">
                  {post.username}
                </h2>

                <span className="text-gray-500">
                  🌿 Wellness Member
                </span>

              </div>

              <p className="text-gray-700 text-lg leading-relaxed mt-5">
                {post.content}
              </p>

              <button
                onClick={() => likePost(post.id, post.likes)}
                className="mt-6 bg-green-100 hover:bg-green-200 text-green-700 px-6 py-3 rounded-2xl font-bold transition"
              >
                ❤️ {post.likes} Likes
              </button>

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}