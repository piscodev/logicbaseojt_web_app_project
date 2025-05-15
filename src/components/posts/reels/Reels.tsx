'use client'

import { Box, Avatar, Typography, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, Card } from '@mui/material'
import { Add, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useEdgeStore } from '@/lib/edgestore';
import { toast } from 'react-toastify';
import { generateThumbnail } from '@/app/utils/generateThumbnail';

const createStory =

{
    id: 0,
    name: "Create story",
    videoUrl: "",
    avatar: "",
    thumbnail: "",
    isCreate: true
}



// const generateThumbnail = (file: File): Promise<string> =>
// {
//     return new Promise((resolve, reject) =>
//     {
//         const video = document.createElement('video')

//         // mag start kuha frame after .5 sec para di mag start sa black screen ig generate sa thumbnail
//         video.onloadedmetadata = () => video.currentTime = Math.min(1, video.duration)
//         video.onseeked = () =>
//         {
//             const canvas = document.createElement("canvas")
//             canvas.width = video.videoWidth
//             canvas.height = video.videoHeight
      
//             const ctx = canvas.getContext("2d")
//             if (!ctx)
//                 return reject("Failed to get canvas context")
      
//             ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
//             const dataUrl = canvas.toDataURL("image/jpeg")
//             resolve(dataUrl)
//         }

//         video.onerror = (e) => reject("Error loading video")
//         video.src = URL.createObjectURL(file)
//         // required for some browsers
//         video.load()
//     })
// }

const Reels: React.FC<{ currentUserId: string }> = ({ currentUserId }) =>
{
    const [stories, setStories] = useState(
    [
        createStory,
        // {
        //     id: 2,
        //     name: "P1",
        //     image: "/logo.png",
        //     videoUrl: "https://www.w3schools.com/html/movie.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },
        // {
        //     id: 3,
        //     name: "P2",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        //     avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },
        // {
        //     id: 4,
        //     name: "P3",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-5s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },
        // {
        //     id: 5,
        //     name: "P4",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 6,
        //     name: "P5",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 7,
        //     name: "P6",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 8,
        //     name: "P7",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 9,
        //     name: "P8",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 10,
        //     name: "P9",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 11,
        //     name: "P10",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 12,
        //     name: "P11",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 13,
        //     name: "P12",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 14,
        //     name: "P13",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 15,
        //     name: "P14",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // },{
        //     id: 16,
        //     name: "P15",
        //     image: "/logo.png",
        //     videoUrl: "https://sample-videos.com/video123/mp4/720/sample-10s.mp4",
        //     avatar: "https://randomuser.me/api/portraits/women/5.jpg",
        //     thumbnail: "https://randomuser.me/api/portraits/women/2.jpg",
        //     isCreate: false,
        // }
    ])

    const [playingId, setPlayingId] = useState<number | null>(null)
    const [startIndex, setStartIndex] = useState(0)

    const visibleCount = 5 // # of stories visible at once

    const { edgestore } = useEdgeStore()
    const [file, setFile] = useState<File | null>(null)
    const [openUpload, setOpenUpload] = useState(false)
    const [uploading, setUploading] = useState(false)

    const retrieveStories = async () =>
    {
        const response = await fetch('/api/reels/retrieveStories',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ currentUserId })
        })

        if (!response.ok)
        {
            // toast.error("Failed to retrieve stories")
            console.error("Failed to retrieve stories")
            return
        }

        const data = await response.json()
        setStories([createStory, ...data.stories])
        // const stories: Stories[] = data.map((story: ) =>
        // ({
        //     id: story.story_id,
        //     userId: story.story_user_id,
        //     videoUrl: story.story_media_url,
        //     name: story.first_name + " " + story.last_name,
        //     avatar: story.profile_image,
        //     thumbnail: story.story_thumbnail_url,
        //     isCreate: false,
        // }))

        // setStories([createStory, ...stories])
    }

    // increments to 1
    // const handleNext = () =>
    // {
    //     if ((startIndex + visibleCount) <= stories.length)
    //     {
    //         setStartIndex(prev => prev + 1)
    //         setPlayingId(null)
    //     }
    // }

    // kani kay by 4 cards
    // const handleNext = () =>
    // {
    //     const newIndex = startIndex + visibleCount
    //     if (newIndex < stories.length)
    //     {
    //         setStartIndex(newIndex)
    //         setPlayingId(null)
    //     }
    // }

    // const handleNext = () =>
    // {
    //     const newIndex = Math.min(startIndex + visibleCount, stories.length - visibleCount)
    //     setStartIndex(newIndex)
    //     setPlayingId(null)
    // }

    // tag by 4 gihapon
    const handleNext = () =>
    {
        const newIndex = startIndex + visibleCount
        if (newIndex < stories.length)
        {
            setStartIndex(newIndex)
            setPlayingId(null)
        } else if (startIndex < stories.length - 1)
        {
            // go to last possible page even if it has fewer than visibleCount items
            const lastPageIndex = Math.max(stories.length - visibleCount, 0)
            setStartIndex(lastPageIndex)
            setPlayingId(null)
        }
    }

    const handlePrev = () =>
    {
        const newIndex = startIndex - visibleCount
        setStartIndex(Math.max(newIndex, 0))
        setPlayingId(null)
    }

    const selectedStory = stories.find(story => story.id === playingId)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.files && event.target.files[0])
            setFile(event.target.files[0])
    }

    const handleUpload = async () =>
    {
        if (!file)
            return

        setUploading(true)
        try
        {
            const res = await edgestore.publicFiles.upload({ file })
            if (!res)
            {
                toast.error("Failed to upload file");
                console.error("Failed to upload file");
                return
            }

            const thumbnailUrl = await generateThumbnail(file)
            const response = await fetch('/api/reels/newStory',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: currentUserId,
                    mediaUrl: res.url,
                    thumbnailUrl
                })
            })

            if (!response.ok)
            {
                toast.error("Failed to upload story. Refresh your page and try again")
                console.error("Failed to upload story")
                return
            }

            const user_story = await response.json()

            // add the uploaded story to the state
            const nextId = Math.max(...stories.map(s => s.id)) + 1
            const newStory =
            {
                id: nextId,
                userId: user_story.user_id,
                videoUrl: user_story.media_url,
                name: user_story.first_name + " " + user_story.last_name,
                avatar: user_story.profile_image,
                thumbnail: thumbnailUrl,
                isCreate: false,
            }

            setStories(prev => [...prev, newStory])
            setStartIndex(Math.max(0, (stories.length - visibleCount) + 1))
            setPlayingId(nextId)
            toast.success("Story uploaded successfully")

            setFile(null)
            setOpenUpload(false)
        } catch (error) {
            console.error("Upload failed:", error)
        } finally {
            setUploading(false)
        }
    }

    const handleCloseUpload = () =>
    {
        setOpenUpload(false)
        setFile(null)
        setUploading(false)
    }

    const handleCloseSelStory = () =>
    {
        setStartIndex(0)
        setPlayingId(null)
    }

    const visibleStories = stories.slice(startIndex, startIndex + visibleCount)

    const handleNext1 = () =>
    {
        const currentIndex = stories.findIndex(s => s.id === playingId)
        const nextIndex = currentIndex + 1
        if (nextIndex < stories.length)
        {
            setStartIndex(nextIndex)
            setPlayingId(stories[nextIndex].id)
        }
    }
    
    const handlePrev1 = () =>
    {
        const currentIndex = stories.findIndex(s => s.id === playingId)
        //  navigate back if we are above index 1
        if (currentIndex > 1)
        {
            const newIndex = currentIndex - 1
            setStartIndex(newIndex)
            setPlayingId(stories[newIndex].id)
        }
        // else: do nothing, since index 0 is the "Create Story"
    }

    useEffect(() =>
    {
        retrieveStories()
    }, [])

    return (
        <Card variant="outlined" sx={{ position: 'relative', width: '100%', borderRadius: 1, overflow: 'hidden', padding: 1 }}>
            {/* Navigation buttons */}
            <IconButton
                onClick={handlePrev}
                sx={{ position: 'absolute', left: 6, top: '50%', zIndex: 2, transform: 'translateY(-50%)', border: 0 }}
                disabled={startIndex === 0}
            >
                <ArrowBackIos sx={{ marginLeft: 1.5}} />
            </IconButton>
            <Box
                sx={{
                    display: 'flex',
                    overflow: 'hidden',
                    gap: 2,
                    ml: 5, // leave space for button
                    mr: 5
                }}
            >
                {visibleStories.map(story => (
                    <Box
                        key={story.id}
                        sx={{
                            // minWidth: 120,
                            width: `${83 / visibleCount}%`, // 5 cards full width
                            height: {
                                xs: '90px',    // mobile
                                sm: '170px',    // small screens (600px+)
                                md: '200px',    // medium (900px+)
                                lg: '130px',    // large screens
                            },
                            borderRadius: 1,
                            position: 'relative',
                            overflow: 'hidden',
                            flexShrink: 0,
                            backgroundImage: `url(${story.thumbnail})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            color: 'white',
                            cursor: 'pointer',
                            marginLeft: 0.5,
                        }}
                        onClick={() =>
                        {
                            if (!story.isCreate)
                                setPlayingId(prev => (prev === story.id ? null : story.id))
                        }}
                    >
                        {story.isCreate ? (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#444',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setOpenUpload(true)}
                            >
                                <IconButton sx={{ backgroundColor: 'white' }}>
                                    <Add />
                                </IconButton>
                                <Typography variant="caption" color="white">
                                    {story.name}
                                </Typography>
                            </Box>
                        ) : playingId === story.id ? (
                            <video
                                src={story.thumbnail}
                                muted
                                autoPlay
                                // controls
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${story.videoUrl}#t=0.1)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                        )}

                        {!story.isCreate && (
                            <>
                                <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                                    <Avatar
                                        src={story.avatar}
                                        sx={{
                                            border: '3px solid #1976d2',
                                            width: 36,
                                            height: 36
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        p: 1,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                        position: 'absolute',
                                        bottom: 0,
                                        width: '100%'
                                    }}
                                >
                                    <Typography variant="caption" color="white" fontWeight="bold">
                                        {story.name}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>
                ))}
            </Box>

            {openUpload && (
                <Dialog open={openUpload} onClose={handleCloseUpload} maxWidth="xs" fullWidth>
                    <DialogTitle>Upload New Story</DialogTitle>
                    <DialogContent dividers>
                        <label htmlFor="upload-input">
                            <input
                                id="upload-input"
                                type="file"
                                accept="video/*"
                                hidden
                                onChange={handleFileChange}
                            />
                            <Button
                                component="span"
                                variant="outlined"
                                fullWidth
                                disabled={uploading}
                            >
                                Choose Video
                            </Button>
                        </label>

                        {file && (
                            <Typography mt={2} variant="body2">
                                Selected: {file.name}
                            </Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenUpload(false)} disabled={uploading}>Cancel</Button>
                        <Button
                            // variant="contained"
                            onClick={handleUpload}
                            disabled={!file || uploading}
                        >
                            {file && uploading ? 'Uploading...' : 'Upload'}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Dialog Popup for Selected Story */}
            <Dialog open={!!selectedStory} onClose={handleCloseSelStory}  sx={{
                '& .MuiDialog-paper':
                {
                    backgroundColor: 'transparent',
                    border: 'none',
                    m: 0, // remove margin
                    p: 0, // remove padding
                }}}
                slotProps={
                {
                    paper: {
                        sx: {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            border: 'none',
                            overflow: 'visible',
                        }
                    },
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            border: 'none'
                        }
                    }
                }}>
                {selectedStory && (
                    <Box sx={{ position: 'relative', width: '270px', height: '100%', border: 'none' }}>
                        {/* Carousel content */}
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 1,
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: selectedStory.isCreate ? 'default' : 'pointer',
                            }}
                            onClick={() =>
                            {
                                if (!selectedStory.isCreate)
                                    setPlayingId(prev => (prev === selectedStory.id ? null : selectedStory.id))
                            }}
                        >
                            {selectedStory.isCreate ? (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <IconButton sx={{ backgroundColor: 'white' }}>
                                        <Add />
                                    </IconButton>
                                    <Typography variant="caption" color="white">
                                        {selectedStory.name}
                                    </Typography>
                                </Box>
                        ) : playingId === selectedStory.id ? (
                                <video
                                    src={selectedStory.videoUrl}
                                    muted
                                    autoPlay
                                    playsInline
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: `url(${selectedStory.videoUrl}#t=0.1)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                            )}

                            {/* Overlay elements */}
                            {!selectedStory.isCreate && (
                                <>
                                    <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                                        <Avatar
                                            src={selectedStory.avatar}
                                            sx={{
                                                border: '3px solid #1976d2',
                                                width: 36,
                                                height: 36
                                            }}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            p: 1,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                            position: 'absolute',
                                            bottom: 0,
                                            width: '100%'
                                        }}
                                    >
                                        <Typography variant="caption" color="white" fontWeight="bold">
                                            {selectedStory.name}
                                        </Typography>
                                    </Box>
                                </>
                        )}
                        </Box>
              
                        {/* Navigation Buttons */}
                        <IconButton
                            onClick={handlePrev1}
                            sx={{ position: 'absolute', top: '50%', left: -25, transform: 'translateY(-50%)', borderRadius: '25px', backgroundColor: 'white' }}
                            // disabled={startIndex === 0 && playingId === 1}
                            disabled={stories.findIndex(s => s.id === playingId) <= 1}

                        >
                            <ArrowBackIos sx={{ marginLeft: 1,}} />
                        </IconButton>
                        <IconButton
                            onClick={handleNext1}
                            sx={{ position: 'absolute', top: '50%', right: -25, transform: 'translateY(-50%)', borderRadius: '25px', backgroundColor: 'white' }}
                            disabled={startIndex === (stories.length - 1)}
                        >
                            <ArrowForwardIos />
                        </IconButton>
                    </Box>
                )}
            </Dialog>

            <IconButton
                onClick={handleNext}
                sx={{ position: 'absolute', right: 4, top: '50%', zIndex: 2, transform: 'translateY(-50%)', border: 0 }}
                disabled={startIndex + visibleCount >= stories.length}
            >
                <ArrowForwardIos />
            </IconButton>
        </Card>
    )
}

export default Reels