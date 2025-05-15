'use client'

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { PostItemProps } from "@/app/utils/interfaces";
import { Box, Card, CardContent, FormControlLabel, Switch, TextField } from "@mui/material";

export default function NewPostInput({
    userId,
    onNewPost
}: {
    userId: string;
    onNewPost: (NewPost: PostItemProps) => void 
}) {
    const [content, setContent] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [price, setPrice] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(1)
    const [mediaList, setMediaList] = useState<{ url: string; type: "image" | "video" }[]>([])
    const { edgestore } = useEdgeStore()
    const [loading, setLoading] = useState(false)

    const [isSelling, setIsSelling] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        const uploads: { url: string; type: "image" | "video" }[] = []

        for (const file of files) {
            const upload = await edgestore.publicFiles.upload({ file })
            uploads.push({
                url: upload.url,
                type: file.type.startsWith("image") ? "image" : "video"
            })
        }

        setMediaList(prev => [...prev, ...uploads])
    }

    const handlePost = async () => {
        if (!content.trim() && mediaList.length === 0) return

        setLoading(true)

        try {
            const res = await fetch("/api/posts/newPost", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    price,
                    quantity,
                    content,
                    contactNumber,
                    mediaList
                })
            })

            const data = await res.json()
            if (!res.ok || data.type === "error") {
                toast.error(data.message || "Error creating post")
                return
            }

            setContent("")
            setMediaList([])
            onNewPost(data)
            toast.success("Posted successfully!")
        } catch (err) {
            console.error(err)
            toast.error("Unexpected error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ color: 'text.secondary', paddingBottom: 2 }}>
            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <div className="flex items-start space-x-3">
                        <div className="flex flex-col w-full">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Is it a product you will be selling or a service? What are you looking for... or What's on your mind?"
                                maxLength={2000}
                                className="w-full rounded-md border border-gray-300 p-2 text-sm shadow-sm"
                                rows={3}
                            />
                            <FormControlLabel
                                control=
                                {
                                    <Switch
                                        checked={isSelling}
                                        onChange={(e) => setIsSelling(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="Enable Selling Info"
                            />

                            {/* Preview uploaded media */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {mediaList.map((media, idx) =>
                                    media.type === "image" ? (
                                        <img
                                            key={idx}
                                            src={media.url}
                                            alt={`media-${idx}`}
                                            className="w-full rounded-md"
                                        />
                                    ) : (
                                        <video
                                            key={idx}
                                            controls
                                            className="w-full rounded-md max-h-80"
                                        >
                                            <source src={media.url} />
                                            Your browser does not support video playback.
                                        </video>
                                    )
                                )}
                            </div>

                            {/* <div className="mt-2 flex w-full justify-between items-center gap-2">
                                <div className="flex flex-col w-[30%]">
                                    <TextField
                                        variant="standard"
                                        type="text"
                                        // value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        placeholder="Enter price"
                                    />
                                    <label className="text-[12px] text-gray-500 mt-1">Item/Product Price (Optional)</label>
                                </div>

                                <div className="flex flex-col w-[30%]">
                                    <TextField
                                        variant="standard"
                                        type="text"
                                        // value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        placeholder="Enter quantity"
                                    />
                                    <label className="text-[12px] text-gray-500 mt-1">Item Qty (Optional)</label>
                                </div>
                            </div>
                            <div className="mt-2 flex w-full justify-between items-center">
                                <div className="flex flex-col w-[50%]">
                                    <TextField
                                        variant="standard"
                                        type="text"
                                        value={contactNumber}
                                        onChange={(e) => setContactNumber(e.target.value)}
                                        placeholder="Enter your contact number (Optional)"
                                    />
                                    <label className="text-[12px] text-gray-500 mt-1">Item Qty (Optional)</label>
                                </div>
                            </div> */}
                            {isSelling && (
                                <>
                                    <div className="mt-2 flex w-full justify-between items-center gap-2">
                                        <div className="flex flex-col w-[30%]">
                                            <TextField
                                                variant="standard"
                                                type="text"
                                                onChange={(e) => setPrice(Number(e.target.value))}
                                                placeholder="Enter price"
                                            />
                                            <label className="text-[12px] text-gray-500 mt-1">Item/Product Price (Optional)</label>
                                        </div>

                                        <div className="flex flex-col w-[30%]">
                                            <TextField
                                                variant="standard"
                                                type="text"
                                                onChange={(e) => setQuantity(Number(e.target.value))}
                                                placeholder="Enter quantity"
                                            />
                                            <label className="text-[12px] text-gray-500 mt-1">Item Qty (Optional)</label>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex w-full justify-between items-center">
                                        <div className="flex flex-col w-[50%]">
                                            <TextField
                                                variant="standard"
                                                type="text"
                                                value={contactNumber}
                                                onChange={(e) => setContactNumber(e.target.value)}
                                                placeholder="Enter your contact number (Optional)"
                                            />
                                            <label className="text-[12px] text-gray-500 mt-1">Contact Number (Optional)</label>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="mt-2 flex w-full justify-between items-center">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                    className="text-sm file:mr-2 file:rounded-md file:border-0 file:bg-[#006aff] file:px-2 file:py-1 file:text-white hover:file:bg-[#233570]"
                                />
                                <Button
                                    onClick={handlePost}
                                    disabled={loading}
                                    className="rounded-md bg-[#006aff] text-sm font-medium text-white hover:bg-[#233570]"
                                    endIcon={<SendIcon />}
                                >
                                    {loading ? "Posting..." : "Post"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Box>
    )
}