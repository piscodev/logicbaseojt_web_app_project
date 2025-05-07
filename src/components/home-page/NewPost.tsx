'use client'

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function NewPostInput({ userId }: { userId: string })
{
    const [content, setContent] = useState("")
    const [mediaUrl, setMediaUrl] = useState<string | null>(null)
    const [mediaType, setMediaType] = useState<"image" | "video" | null>(null)
    const { edgestore } = useEdgeStore()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const file = e.target.files?.[0]
        if (!file)
            return

        const upload = await edgestore.publicFiles.upload({ file })
        setMediaUrl(upload.url)

        if (file.type.startsWith("image"))
            setMediaType("image")
        else if (file.type.startsWith("video"))
            setMediaType("video")
    }

    const handlePost = async () =>
    {
        if (!content.trim() && !mediaUrl)
            return

        const res = await fetch("/api/posts/newPost",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                content,
                mediaUrl,
                mediaType,
            })
        })

        const data = await res.json()
        if (!res.ok)
        {
            toast.error(data.message)
            return
        }

        if (data.type !== "error")
        {
            setContent("")
            setMediaUrl(null)
            setMediaType(null)

            toast.success("Posted successfully!")
        }


        // }).then(async (res) =>
        // {
        //     const data = await res.json()
        //     if (!res.ok)
        //     {
        //         toast.error(data.message)
        //         return
        //     }

        //     if (data.type !== "error")
        //     {
        //         setContent("")
        //         setMediaUrl(null)
        //         setMediaType(null)

        //         toast.success("Posted successfully!")
        //     }
        // }).catch((error) => console.error("Error creating post:", error))
        // alert(`Post:\n${content}\nMedia: ${mediaUrl}`)
    }

    return (
        <article className="rounded-lg bg-white p-4 shadow mb-4">
            <div className="flex items-start space-x-3">
                {/* <img
                    className="h-10 w-10 rounded-full"
                    src="https://source.unsplash.com/40x40/?person"
                    alt="User Avatar"
                /> */}
                <div className="flex-1">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500"
                        rows={3}
                    />

                    {mediaUrl && mediaType === "image" && (
                        <img src={mediaUrl} alt="Uploaded" className="mt-2 rounded-md max-h-64" />
                    )}

                    {mediaUrl && mediaType === "video" && (
                        <video controls className="mt-2 rounded-md w-full max-h-80">
                        <source src={mediaUrl} />
                            Your browser does not support video playback.
                        </video>
                    )}

                    <div className="mt-2 flex justify-between items-center gap-2">
                        <input
                            // variant="contained"
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                            className="text-sm file:mr-2 file:rounded-md file:border-0 file:bg-[#006aff] file:px-3 file:py-1 file:text-white hover:file:bg-[#233570]"
                        />
                        <Button onClick={handlePost} className="rounded-md bg-[#006aff] px-3 py-2 text-sm font-medium text-white hover:bg-[#233570]" endIcon={<SendIcon />}>Post</Button>
                    </div>
                </div>
            </div>
        </article>
    )
}