
import React, { useEffect, useState } from 'react'

interface PostCommentProps
{

    postId: string
    userId: string
    likes: number
    comments: bigint
}

const PostComponents: React.FC<PostCommentProps> = ({ likes, comments, postId, userId}) =>
{
    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [likeCount, setLikeCount] = useState(0)

    const checkLiked = async () =>
    {
        try
        {
            const res = await fetch("/api/posts/check_liked",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                {
                    postId,
                    userId,
                }),
            })

            if (!res.ok) 
                throw new Error("Failed to check like")

            const data = await res.json()
            if (data.type === "error")
                throw new Error(data.message)

            setLiked(data.isLike)
        } catch (error) {
            console.error("Error checking like: ", error)
        }
    }

    useEffect(() =>
    {
        checkLiked()
        setLikeCount(Number(likes))
    }, [likes, postId, userId])

    const handleLike = async () =>
    {
        // like state first to determine new like value
        const newLiked = !liked
        setLoading(true)

        try
        {
            const res = await fetch("/api/posts/like_post",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                {
                    postId,
                    userId,
                    isLike: newLiked,
                }),
            })

            if (!res.ok) 
                throw new Error("Failed to update like")

            const data = await res.json()
            if (data.type === "error")
                throw new Error(data.message)

            setLiked(newLiked)
            setLikeCount(Number(data.total_likes))
        } catch (error) {
            console.error("Error liking post: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-6 flex justify-between space-x-8">
            <div className="flex space-x-6">
                <span className="inline-flex items-center text-sm">
                    <button
                        onClick={handleLike}
                        disabled={loading}
                        className={`cursor-pointer inline-flex space-x-2 ${liked ? 'text-blue-500' : 'text-gray-400'}`}
                    >
                        <svg className="h-5 w-5" x-description="Heroicon name: mini/hand-thumb-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z"></path>
                        </svg>
                        <span className="font-medium text-gray-900">{likeCount}</span>
                        <span className="sr-only">likes</span>
                    </button>
                </span>
                <span className="inline-flex items-center text-sm">
                    <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <svg className="h-5 w-5" x-description="Heroicon name: mini/chat-bubble-left-ellipsis" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                        <span className="font-medium text-gray-900">{comments}</span>
                        <span className="sr-only">replies</span>
                    </button>
                </span>
                {/* <span className="inline-flex items-center text-sm">
                    <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <svg className="h-5 w-5" x-description="Heroicon name: mini/eye" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
                            <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                        </svg>
                        <span className="font-medium text-gray-900">2.7k</span>
                        <span className="sr-only">views</span>
                    </button>
                </span> */}
            </div>
            <div className="flex text-sm">
                <span className="inline-flex items-center text-sm">
                    <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                        <svg className="h-5 w-5" x-description="Heroicon name: mini/share" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z"></path>
                        </svg>
                        <span className="font-medium text-gray-900">Share</span>
                    </button>
                </span>
            </div>
        </div>
    )
}

export default PostComponents
