'use client'

import OptionsMenu from "@/components/home-page/OptionsMenu";
import PostComponents from "./PostComponents";
import PostComment from "@/components/comments/PostComment";
import { dateConv } from "@/lib/DateConverter";
import { useState } from "react";
import {
    Badge,
    Box,
    Button,
    Dialog,
    ImageList,
    ImageListItem,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { nl2br } from "@/lib/TextSpacingConv";
import { sanitizeHTML } from "@/lib/Sanitize";
import { PostItemProps } from "@/app/utils/interfaces";
import { Phone } from "@mui/icons-material";

// const PostItem: React.FC<{ post: PostItemProps; currentUserId: string }> = ({ post, currentUserId }) => 
const PostItem: React.FC<{ post: PostItemProps; currentUserId: string; onDelete: (postId: string) => void }> = ({ post, currentUserId, onDelete }) =>
{
    // const images = post.media_url?.split(",").map((url: string) => url.trim()) || []
    const media = post.media_url?.split(";").map((url: string) => url.trim()) || []

    const [open, setOpen] = useState(false)
    const [selectedImg, setSelectedImg] = useState<string | null>(null)

    const handleOpen = (img: string) =>
    {
        // Check if the image is a video4
        if (!img.match(/\.(mp4|webm|ogg)$/i))
        {
            setSelectedImg(img)
            setOpen(true)
            // return
        }
        // setSelectedImg(img)
        // setOpen(true)
    }

    const handleClose = () =>
    {
        setOpen(false)
        setSelectedImg(null)
    }

    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"))

    const safeContent = sanitizeHTML(nl2br(post.content))

    // interface HandleBuyParams {
    //     post_id: string;
    //     price: number;
    //     content: string;
    // }

    const handleBuy = async () =>
    {
        const res = await fetch("/api/paymongo/create_checkout",
        {
          method: "POST",
          body: JSON.stringify({
            postId: post.post_id,
            price: (post.price / 1000).toFixed(2),
            quantity: 1,
            name: post.first_name + " " + post.last_name,
            email: post.last_name + "@yahoo.com",
            description: post.content.slice(0, 30), // optional
          }),
        })
      
        const data: { url: string } = await res.json()
        window.location.href = data.url
    }

    return (
        <>
            <article key={post.post_id} aria-labelledby={`post-article-${post.post_id}`}>
                <div>
                    <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={post.profile_image} alt="" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium">
                                <a href="#" className="hover:underline">{post.first_name} {post.last_name}</a>
                            </p>
                            <p className="text-[10px]">
                                <a href="#" className="hover:underline">{dateConv(post.created_at)}</a>
                            </p>
                        </div>
                        <div className="flex flex-shrink-0 self-center">
                            {post.price !== 0 && (
                                <>
                                    <Badge badgeContent={post.quantity + "x"} color="secondary" />
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        onClick={handleBuy}
                                    >
                                        Buy Now - ₱{(post.price)}
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className="flex flex-shrink-0 self-center">
                            <OptionsMenu currentUserId={currentUserId} postId={post.post_id} onDelete={onDelete} />
                        </div>
                        
                    </div>
                </div>

                <div className="mt-2 space-y-4 text-sm">
                    <div className="p-3" dangerouslySetInnerHTML={{ __html: safeContent }}></div>
                    {/* <div className="p-3" dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.content) }} /> */}
                </div>

                {/* Image Gallery */}
                {media.length > 0 && (
                    <div className="my-2 px-3">
                        {media.length === 1 ? (
                            // One media item
                            <Box
                                onClick={() => handleOpen(media[0])}
                                sx={{
                                    width: "100%",
                                    height: 250,
                                    overflow: "hidden",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                }}
                            >
                                {media[0].match(/\.(mp4|webm|ogg)$/i) ? (
                                    <video
                                        src={media[0]}
                                            controls
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                borderRadius: 8,
                                            }}
                                    />
                                ) : (
                                    <img
                                        src={media[0]}
                                        alt="single-media"
                                        loading="lazy"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: 8,
                                        }}
                                    />
                                )}
                            </Box>
                        ) : (

                            // Multiple media items
                            <ImageList cols={isSmall ? 2 : 3} gap={8}>
                                {media.map((item, idx) => (
                                    <ImageListItem key={idx} onClick={() => handleOpen(item)}>
                                        {item.match(/\.(mp4|webm|ogg)$/i) ? (
                                            <video
                                                src={item}
                                                controls
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src={item}
                                                alt={`media-${idx}`}
                                                loading="lazy"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                    cursor: "pointer",
                                                }}
                                            />
                                        )}
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        )}
                    </div>
                )}

                {/* Image/Vidoe Modal */}
                <Dialog open={open} onClose={handleClose} maxWidth="md">
                    {selectedImg && (
                        <img
                            src={selectedImg}
                            alt="selected"
                            style={{ width: "350px", height: "100%", borderRadius: 8 }}
                        />
                    )}
                </Dialog>

                <PostComponents likes={post.total_likes} comments={post.comment_count} postId={post.post_id} userId={currentUserId} contact_number={post.post_contact_number} />
                <PostComment postId={post.post_id} />
            </article>
        </>
    )
}

export default PostItem