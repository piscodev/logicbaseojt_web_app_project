'use client'

import OptionsMenu from "@/components/home-page/OptionsMenu";
import PostComponents from "./PostComponents";
import PostComment from "@/components/comments/PostComment";
import { dateConv } from "@/lib/DateConverter";
import { useState } from "react";
import {
    Dialog,
    ImageList,
    ImageListItem,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { nl2br } from "@/lib/TextSpacingConv";
import { sanitizeHTML } from "@/lib/Sanitize";

interface PostItemProps
{
    post:
    {
        user_id: string;
        followed_user_id: string;
        created_at: string;
        updated_at: string;
        post_id: string;
        content: string;
        media_url: string; // commaseparated urls
        media_type: "image" | "video" | null;
        total_likes: number;
        comment_count: bigint;
        first_name: string;
        last_name: string;
        profile_image: string;
    }
}

const PostItem: React.FC<PostItemProps> = ({ post }) =>
{
    const images = post.media_url?.split(",").map((url: string) => url.trim()) || []

    const [open, setOpen] = useState(false)
    const [selectedImg, setSelectedImg] = useState<string | null>(null)

    const handleOpen = (img: string) =>
    {
        setSelectedImg(img)
        setOpen(true)
    }

    const handleClose = () =>
    {
        setOpen(false)
        setSelectedImg(null)
    }

    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

    const safeContent = sanitizeHTML(nl2br(post.content))

    return (
        <>
            <article key={post.post_id} aria-labelledby={`post-article-${post.post_id}`}>
                <div>
                    <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={post.profile_image}
                            alt=""
                        />
                        </div>
                        <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            <a href="#" className="hover:underline">
                            {post.first_name} {post.last_name}
                            </a>
                        </p>
                        <p className="text-sm text-gray-500">
                            <a href="#" className="hover:underline">
                            <time dateTime={post.created_at}>
                                {dateConv(new Date(post.created_at).getTime())}
                            </time>
                            </a>
                        </p>
                        </div>
                        <div className="flex flex-shrink-0 self-center">
                            <OptionsMenu />
                        </div>
                    </div>
                </div>

                <div className="mt-2 space-y-4 text-sm text-gray-700">
                    <p className="p-3" dangerouslySetInnerHTML={{ __html: safeContent }}></p>
                </div>

                {/* Image Gallery */}
                {images.length > 0 && (
                    <div className="my-2 px-3">
                        <ImageList cols={isSmall ? 2 : 3} gap={8}>
                            {images.map((img, idx) => (
                                <ImageListItem key={idx} onClick={() => handleOpen(img)}>
                                <img
                                    src={img}
                                    alt={`media-${idx}`}
                                    loading="lazy"
                                    style={{ borderRadius: 8, cursor: "pointer" }}
                                />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                )}

                {/* Image Modal */}
                <Dialog open={open} onClose={handleClose} maxWidth="md">
                    {selectedImg && (
                        <img
                            src={selectedImg}
                            alt="selected"
                            style={{ width: "100%", height: "auto" }}
                        />
                    )}
                </Dialog>

                <PostComponents likes={post.total_likes} comments={post.comment_count} postId={post.post_id} userId={post.user_id} />
                <PostComment postId={post.post_id} />
            </article>
        </>
    )
}

export default PostItem