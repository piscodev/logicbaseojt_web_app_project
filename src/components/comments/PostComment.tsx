import React, { useEffect, useState } from 'react'
import PreviousComments from './prev_comments/PreviousComments'
import { CircularProgress, Input } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { useSession } from 'next-auth/react';


const PostComment: React.FC<{ postId: string }> = ({ postId }) =>
{
    const [comment, setComment] = useState([])
    const [loading, setLoading] = useState(false)
    const [newComment, setNewComment] = useState("")
    const [isComment, setIsCommenting] = useState(false)
    const { data: session } = useSession()

    // if (!session)
    // {
    //     console.error("User not logged in.")
    //     return
    // }

    useEffect(() =>
    {
        retrieveComments()
    }, [])

    const retrieveComments = async () =>
    {
        setLoading(true)
        try
        {
            const res = await fetch("/api/comments/retrieve_comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId })
            })

            const data = await res.json()
            if (!res.ok)
            {
                console.error("Error fetching comments:", data.message)
                return
            }

            setComment(data)
            console.log("Comments data:", data)
        }       catch (error) {
            console.error("Network error fetching comments:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleComment = async () =>
    {
        if (!newComment.trim())
            return

        setIsCommenting(true)

        try
        {
            const res = await fetch("/api/comments/new_comment",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId,
                    content: newComment,
                })
            })

            const data = await res.json()
            if (!res.ok)
            {
                console.error("Error posting comment: ", data.message)
                return
            }

            setNewComment("")
            await retrieveComments()
        } catch (error) {
            console.error("Network error posting comment: ", error);
        } finally {
            setIsCommenting(false)
        }
    }

    const handleDeleteComment = async (commentId: string) =>
    {
        try
        {
            setLoading(true)
            const res = await fetch("/api/comments/delete_comment",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postId, commentId }),
            })

            const data = await res.json()
            if (!res.ok)
            {
                console.error("Error deleting comment: ", data.message)
                return
            }

            await retrieveComments() // refresh comments
        } catch (err) {
            console.error("Network error deleting comment: ", err)
        } finally {
            setLoading(false)
        }
    }


    if (loading)
    {
        return (
            <div className="flex justify-center items-center min-h-[100px]">
                <p><CircularProgress size={15} /></p>
            </div>
        )
    }

    return (
        <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold">Comments</h3>
            <ul role="list" className="mt-4 space-y-4">
                {comment && comment.map((item, index) => (
                    <PreviousComments
                        key={index}
                        comment={item}
                        onDelete={handleDeleteComment}
                    />
                ))}
            </ul>

            {/* Add Comment Input */}
            <div className="mt-6 flex space-x-3">
                <div className="flex-shrink-0 pt-3">
                    <img className="h-6 w-6 rounded-full" src={session?.user?.image ? session.user.image : "https://randomuser.me/api/portraits/thumb/women/65.jpg"} alt="You" />
                </div>
                <div className="min-w-0 flex-1">
                    <form onSubmit={async (e) =>
                    {
                        e.preventDefault()
                        await handleComment()
                    }}>
                        <div>
                            {/* <label htmlFor="comment" className="sr-only">Add your comment</label> */}
                            {/* <textarea
                                id="comment"
                                name="comment"
                                rows={2}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                                placeholder="Add a comment"
                            ></textarea> */}
                            <Input
                                id="comment"
                                name="comment"
                                rows={2}
                                value={newComment} // controlled input
                                onChange={(e) => setNewComment(e.target.value)}
                                className="block w-full rounded-md border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                placeholder="Add a comment"
                            />
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                            <div className="flex space-x-2">
                                {/* <button type="button" className="text-gray-500 hover:text-gray-700" title="Attach image">📷</button>
                                <button type="button" className="text-gray-500 hover:text-gray-700" title="Attach video"> 🎥</button> */}
                            </div>
                            {/* <button
                                type="submit"
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#223570] hover:bg-[#006aff]"
                                disabled={!newComment.trim()}
                            >
                                Reply
                            </button> */}
                            <LoadingButton
                                type="submit"
                                size="small"
                                loading={isComment}
                                disabled={!newComment.trim()}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-[#223570] hover:bg-[#006aff]"
                                endIcon={<SendIcon />}
                            >
                                Reply
                            </LoadingButton>
                        </div>
                    </form>
                </div>
            </div>
            {/* End Comment Input */}
        </div>
    )
}

export default PostComment