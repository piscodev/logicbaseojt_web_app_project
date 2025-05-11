'use client'

import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
import { useState } from "react";
import Heading from "./home-page/Heading";
import NewPost from "./home-page/NewPost";
import Posts from "./posts/Posts";
import { useSession } from "next-auth/react";
import FollowRecommendComponent from "./sidebars/follow_recommends/FollowRecommendComponent";
import TrendingComponent from "./comments/trending/TrendingComponent";

export default function TestPage()
{
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { data: session } = useSession()

    const userId = session?.user?.id ?? "0";

  return (
    // <Box
    //     id="hero"
    //     sx={(theme) => ({
    //         width: '100%',
    //         backgroundRepeat: 'no-repeat',

    //         backgroundImage:
    //             'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
    //         ...theme.applyStyles('dark', {
    //             backgroundImage:
    //             'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
    //         }),
    //     })}
    // >
        <Box
            width={"100%"}
            sx={{
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // pt: { xs: 14, sm: 20 },
                pb: { xs: 8, sm: 12 },

            }}
        >
            {/* <div className="min-h-screen bg-gray-100"> */}
            <div className=" bg-gray-100">
                <Heading />

                {/* Mobile Profile Button */}
                <aside className="block lg:hidden mx-auto sm:px-9 p-3 pt-5">
                    <div className="rounded-lg bg-white shadow p-3">
                        <h2 id="who-to-follow-heading" className="text-base font-medium text-gray-900">Recommendations</h2>
                        <FollowRecommendComponent />
                    </div>
                </aside>

                <div className="p-3 py-10">
                    <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
                        <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
                            <nav aria-label="Sidebar" className="sticky top-4 divide-y divide-gray-300">
                                <div className="space-y-1 pb-8">
                                    <a href="#" className="bg-gray-200 text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md" aria-current="page">
                                        <svg className="text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" x-description="Heroicon name: outline/home" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
                                        </svg>
                                        <span className="truncate">Home</span>
                                    </a>
                                
                                    <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md" x-state-description="undefined: &quot;bg-gray-200 text-gray-900&quot;, undefined: &quot;text-gray-700 hover:bg-gray-50&quot;">
                                        <svg className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" x-description="Heroicon name: outline/fire" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"></path>
                                        </svg>
                                        <span className="truncate">Popular</span>
                                    </a>
                                
                                    <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md" x-state-description="undefined: &quot;bg-gray-200 text-gray-900&quot;, undefined: &quot;text-gray-700 hover:bg-gray-50&quot;">
                                        <svg className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" x-description="Heroicon name: outline/user-group" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
                                        </svg>
                                        <span className="truncate">Communities</span>
                                    </a>
                                
                                    <a href="#" className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md" x-state-description="undefined: &quot;bg-gray-200 text-gray-900&quot;, undefined: &quot;text-gray-700 hover:bg-gray-50&quot;">
                                        <svg className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" x-description="Heroicon name: outline/arrow-trending-up" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"></path>
                                        </svg>
                                        <span className="truncate">Trending</span>
                                    </a>
                                </div>

                                <div className="pt-10">
                                    <p className="px-3 text-sm font-medium text-gray-500" id="communities-headline">Communities</p>
                                    <div className="mt-3 space-y-2 pl-3" aria-labelledby="communities-headline">
                                        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            <span className="truncate">Gaming</span>
                                        </a>
                                        {/* <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            <span className="truncate">Food</span>
                                        </a>
                                        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            <span className="truncate">Sports</span>
                                        </a>
                                        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            <span className="truncate">Animals</span>
                                        </a>
                                        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            <span className="truncate">Science</span>
                                        </a>
                                        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            <span className="truncate">Dinosaurs</span>
                                        </a>
                                        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            <span className="truncate">Talents</span>
                                        </a>
                                        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                            <span className="truncate">Gaming</span>
                                        </a> */}
                                    </div>
                                </div>
                            </nav>
                        </div>

                        {/* main content */}
                        <main className="lg:col-span-9 xl:col-span-6">

                            {/* 3 buttons liked, answers */}
                            <div className="px-4 sm:px-0">
                                <div className="sm:hidden">
                                    <label htmlFor="question-tabs" className="sr-only">Select a tab</label>
                                    <select id="question-tabs" className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500">
                                        <option defaultValue="Recent">Recent</option>
                                        <option>Most Liked</option>
                                        <option>Most Answers</option>
                                    </select>
                                </div>
                                {/* <div className="hidden sm:block">
                                    <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
                                        <a href="#" aria-current="page" className="text-gray-900 rounded-l-lg  group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10">
                                            <span>Recent</span>
                                            <span aria-hidden="true" className="bg-rose-500 absolute inset-x-0 bottom-0 h-0.5"></span>
                                        </a>
                                        <a href="#" className="text-gray-500 hover:text-gray-700   group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10">
                                            <span>Most Liked</span>
                                            <span aria-hidden="true" className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
                                        </a>
                                        <a href="#" className="text-gray-500 hover:text-gray-700  rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10">
                                            <span>Most Answers</span>
                                            <span aria-hidden="true" className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
                                        </a>
                                    </nav>
                                </div> */}
                            </div>

                            <div className="">
                                {/* <h1 className="sr-only">Recent questions</h1> */}
                                <ul role="list" className="space-y-4">
                                    {/* <h1 className="text-2xl font-bold mb-6">Recent Questions</h1> */}
                                    <NewPost userId={userId} />
                                    <Posts />
                                    {/* <Posts /> */}
                                    {/* <Posts /> */}
                                </ul>
                            </div>
                        </main>

                        {/* side bar */}
                        <aside className="hidden xl:col-span-4 xl:block">
                            <div className="sticky top-4 space-y-4">

                                <section aria-labelledby="who-to-follow-heading">
                                    <div className="rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            <h2 id="who-to-follow-heading" className="text-base font-medium text-gray-900">Recommendations</h2>
                                            <FollowRecommendComponent />
                                            {/* <div className="mt-6">
                                                <a href="#" className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">Load more</a>
                                            </div> */}
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="trending-heading">
                                    <div className="rounded-lg bg-white shadow">
                                        <div className="p-6">
                                            <h2 id="trending-heading" className="text-base font-medium text-gray-900">Trending</h2>
                                            <div className="mt-6 flow-root">
                                                <ul role="list" className="-my-4 divide-y divide-gray-200">
                                                    <TrendingComponent />
                    
                                                    {/* <li className="flex space-x-3 py-4">
                                                        <div className="flex-shrink-0">
                                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Emily Selman" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm text-gray-800">Lorem Ipsum?</p>
                                                            <div className="mt-2 flex">
                                                                <span className="inline-flex items-center text-sm">
                                                                    <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                                                        <svg className="h-5 w-5" x-description="Heroicon name: mini/chat-bubble-left-ellipsis" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                                                        </svg>
                                                                        <span className="font-medium text-gray-900">164</span>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                    
                                                    <li className="flex space-x-3 py-4">
                                                        <div className="flex-shrink-0">
                                                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="Kristin Watson" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm text-gray-800">Does Santa Claus pay property taxes for his workshop at the North Pole?</p>
                                                            <div className="mt-2 flex">
                                                                <span className="inline-flex items-center text-sm">
                                                                    <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                                                        <svg className="h-5 w-5" x-description="Heroicon name: mini/chat-bubble-left-ellipsis" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                            <path fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                                                                        </svg>
                                                                        <span className="font-medium text-gray-900">133</span>
                                                                    </button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </aside>

                    </div>
                </div>
            </div>
        {/* </Container> */}
    </Box>
  );
}
