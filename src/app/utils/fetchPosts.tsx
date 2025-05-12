export const fetchPosts = async (offset?: number) =>
{
    try
    {
        const response = await fetch(`/api/posts/retrieve_posts_random`,
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ offset }),
        })

        const data  = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching posts: ', error)
        return null
    }
}