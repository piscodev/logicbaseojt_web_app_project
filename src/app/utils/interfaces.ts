import { Session } from "next-auth";

export interface SessionProps extends Session
{
    session: Session | null;
    expires: string;
}

export interface PostItemProps
{
    // post:
    // {
        id: number;
        user_id: string;
        followed_user_id: string;
        created_at: string;
        updated_at: string;
        post_id: string;
        price: number;
        quantity: number;
        content: string;
        media_url: string; // commaseparated urls
        // media_type: "image" | "video" | null;
        mediaList: { url: string; type: "image" | "video" }[];
        total_likes: number;
        comment_count: bigint;
        first_name: string;
        last_name: string;
        profile_image: string;
        post_contact_number: string;
        contact_number: string;
        
    // }
}

export interface Comments
{
    comment:
    {
        comment_id: string,
        comment_post_id: string,
        commenter_user_id: string,
        comment_text: string,
        created_at: string,
        updated_at: string,
        first_name: string,
        last_name: string,
        profile_image: string,
    }
    onDelete?: (commentId: string) => void;
}

export interface UserRecommendation
{
    user_id: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

export interface TrendingTopic
{
    comment_post_id: string;
    comment_count: number;
    content: string;
    media_url: string;
    latest_comment_date: string;
}

export interface CommentsData
{
    comment_id: string
    comment_post_id: string
    comment_user_id: string
    content: string
    createdAt: string
    updatedAt: string
}

export interface UserRow
{
    user_id: string
    first_name: string
    last_name: string
    profile_image: string
    last_login: Date
}

export interface PostsData
{
    post_id: string
    user_id: bigint
    content: string
    media_url: string | null
    media_type: "image" | "video" | null
    createdAt: string
    updatedAt: string
}

export interface PostCommentProps
{

    postId: string
    userId: string
    likes: number
    comments: bigint
    contact_number: string
}

export interface Stories
{
    id: number
    userId: string
    videoUrl: string
    name: string
    avatar: string
    thumbnail: string
    isCreate: false
}