import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
};

const fetchComments = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/comments");
    return response.data;
};

const ParallelQuery = () => {
    const {
        data: posts,
        isLoading: isPostsLoading,
        error: postsError,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    const {
        data: comments,
        isLoading: isCommentsLoading,
        error: commentsError,
    } = useQuery({
        queryKey: ["comments"],
        queryFn: fetchComments,
    });

    if (isPostsLoading || isCommentsLoading) return <div>Loading...</div>;
    if (postsError) return <div>Error loading posts</div>;
    if (commentsError) return <div>Error loading comments</div>;

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {posts?.slice(0, 5).map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <h2>Comments</h2>
            <ul>
                {comments?.slice(0, 5).map((comment) => (
                    <li key={comment.id}>{comment.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ParallelQuery;