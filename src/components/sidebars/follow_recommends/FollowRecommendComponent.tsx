import { UserRecommendation } from '@/app/utils/interfaces';
import React, { useEffect, useState } from 'react';

const FollowRecommendComponent = () =>
{
    const [recommendations, setRecommendations] = useState<UserRecommendation[]>([])
    const [following, setFollowing] = useState<{ [key: string]: boolean }>({})

    useEffect(() =>
    {
        const fetchRecommendations = async () =>
        {
            try
            {
                const response = await fetch('/api/follow/follow_recommends')
                if (!response.ok)
                    throw new Error('Failed to fetch recommendations')

                const data = await response.json()
                if (data.type === 'error')
                    throw new Error(data.message)

                setRecommendations(data as UserRecommendation[])
            } catch (error) {
                console.error('Failed to fetch recommendations: ', error)
            }
        }

        fetchRecommendations()
    }, [])

    const handleFollow = async (userId: string) =>
    {
        try
        {
            const response = await fetch(`/api/follow`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toFollowUserId: userId,
                }),
            })

            if (!response.ok)
                throw new Error('Failed to follow user')

            const data = await response.json()
            if (data.type === 'error')
                throw new Error(data.message)

            setFollowing((prev) => ({ ...prev, [userId]: data.followed }))
        } catch (error) {
            console.error('Follow failed:', error)
        }
    }

    return (
        <ul role="list" className="-my-4 divide-y divide-gray-200">
            {recommendations.map((user) => (
                <li key={user.user_id} className="flex items-center space-x-3 py-4">
                    <div className="flex-shrink-0">
                        <img
                            className="h-8 w-8 rounded-full"
                            src={user.profile_image}
                            alt={user.first_name + ' ' + user.last_name}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                            <a href={`/profile/${user.first_name}`}>{user.first_name}</a>
                        </p>
                        {/* Shortcut Name Later */}
                        {/* <p className="text-sm text-gray-500">
                            <a href={`/user/${user.username}`}>@{user.username}</a>
                        </p> */}
                    </div>
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => handleFollow(user.user_id)}
                            disabled={following[user.user_id]}
                            type="button"
                            className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            following[user.user_id]
                                ? 'bg-gray-300 text-gray-700 cursor-default'
                                : 'bg-[#006aff] text-white hover:bg-[#233d70] focus:ring-[#006aff]'
                            }`}
                        >
                            {following[user.user_id] ? (
                            <span>Following</span>
                            ) : (
                            <>
                                <svg
                                className="-ml-1 mr-0.5 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                >
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                </svg>
                                <span>Connect</span>
                            </>
                            )}
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default FollowRecommendComponent