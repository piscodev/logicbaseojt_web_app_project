'use client'

import NewPost from '@/components/home-page/NewPost';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Card, CircularProgress } from '@mui/material';
import PostItem from '../create_post/CreatePost';
import { PostItemProps } from '@/app/utils/interfaces';
import { fetchPosts } from '@/app/utils/fetchPosts';

const Feed: React.FC<{ userId: string }> = ({ userId }) =>
{
    const [post, setPost] = useState<PostItemProps[]>([])
    // const [loading, setLoading] = useState(true)

    const [offset, setOffset] = useState(0)
    const [loadingMore, setLoadingMore] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const scrollTrigger = useRef(null)

    const loadPosts = useCallback(async () =>
    {
        if (loadingMore || !hasMore)
            return

        setLoadingMore(true)

        const data = await fetchPosts(offset)
        if (!data || data.length === 0)
            setHasMore(false)
        else {
            setPost((prev) => [...prev, ...data])
            setOffset((prevOffset) => prevOffset + 10)
        }

        setLoadingMore(false)
    }, [offset, hasMore, loadingMore])

    useEffect(() =>
    {
        if (typeof window === "undefined" || !window.IntersectionObserver)
            return

        const observer = new IntersectionObserver((entries) =>
        {
            if (entries[0].isIntersecting && hasMore && !loadingMore)
                loadPosts()
        },
        { 
            root: null,
            rootMargin: '200px',
            threshold: 0.5 }
        )

        const currentTrigger = scrollTrigger.current
        if (currentTrigger) observer.observe(currentTrigger)

        return () =>
        {
            if (currentTrigger)
                observer.unobserve(currentTrigger)
        }
    }, [loadPosts, hasMore, loadingMore])

    const handleNewPost = (newPost: PostItemProps) => setPost((prev) => [newPost, ...prev])

    return (
        <>
            <NewPost userId={userId} onNewPost={handleNewPost} />
            <ul role="list" className="space-y-4">
                {post && post.map((item, i) => (
                    <Box key={i} sx={{ color: 'text.secondary', spaceY: 4 }} component="div">
                        <Card
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                            }}
                            component="div"
                        >
                            <PostItem key={i} post={item} currentUserId={userId} onDelete={(id) => {setPost(prev => prev.filter(p => p.post_id !== id))}}/>
                        </Card>
                    </Box>
                ))}
            </ul>

            <div ref={scrollTrigger} className="flex justify-center items-center min-h-[50px]">
                {hasMore && loadingMore && <CircularProgress size={30} />}
                {!hasMore && <span>No more posts</span>}
            </div>
        </>
    )
}

export default Feed