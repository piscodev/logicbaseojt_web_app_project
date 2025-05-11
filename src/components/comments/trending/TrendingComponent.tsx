'use client'

import { CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface TrendingTopic
{
    comment_post_id: string
    comment_count: number
    latest_comment_date: string
}

const TrendingComponent = () =>
{
    const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>
    {
        const fetchTrendingTopics = async () =>
        {
            try
            {
                const response = await fetch('/api/comments/trending', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (!response.ok)
                {
                    console.error('Failed to fetch trending topics')
                    return
                }

                const data = await response.json()
                if (data.type === 'error')
                {
                    console.error(data.message)
                    return
                }

                setTrendingTopics(data)
            } catch (error) {
                console.error('Failed to fetch trending topics: ', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTrendingTopics()
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
            {trendingTopics.length > 0 &&
                trendingTopics.map((topic, index) => (
                    <li key={index} aria-labelledby={`trending-topic-${index}`} className="flex space-x-3 py-4">
                        <div className="flex-shrink-0">
                            {/* <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Kristin Watson" /> */}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-800">post id test: {topic.comment_post_id}</p>
                            <div className="mt-2 flex">
                                <span className="inline-flex items-center text-sm">
                                    <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                        <svg className="h-5 w-5" x-description="Heroicon name: mini/chat-bubble-left-ellipsis" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="font-medium text-gray-900">{topic.comment_count}</span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </li>
                ))
            }
            {/* <div className="mt-6">
                <a href="#" className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">View all</a>
            </div> */}
        </>
    )
}

export default TrendingComponent