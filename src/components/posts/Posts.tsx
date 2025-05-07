import React, { useEffect, useState } from 'react'
import PostItem from './create_post/CreatePost'
import { CircularProgress } from '@mui/material'

const Posts = () =>
{
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>
    {
        const fetchPosts = async () =>
        {
            try
            {
                const res = await fetch("/api/posts/retrieve_posts_random", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                const data = await res.json()

                if (!res.ok)
                {
                    console.error("Error fetching posts: ", data.message)
                    return
                }

                setPost(data)
            } catch (err) {
                console.error("Fetch error: ", err)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading)
    {
        return (
            <div className="flex justify-center items-center min-h-[100px]">
                <CircularProgress size={50} />
            </div>
        )
    }

    return (
        <>
            {post && post.map((item, index) => (
                <li key={index} aria-labelledby={`post-card-${index}`} className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                    <PostItem key={index} post={item} />
                </li>
            ))}
        </>
    )
}

export default Posts