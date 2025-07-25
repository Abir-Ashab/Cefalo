import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    return response.data;
};

const fetchPosts = async (userId) => {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return response.data;
};

const DependentQuery = () => {
    const {
        data: user,
        isLoading: isUserLoading,
        error: userError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
    });

    const {
        data: posts,
        isLoading: isPostsLoading,
        error: postsError,
    } = useQuery({
        queryKey: ["posts", user?.id],
        queryFn: () => fetchPosts(user.id),
        enabled: !!user?.id,
    });

    if (isUserLoading) return <div>Loading user...</div>;
    if (userError) return <div>Error loading user</div>;
    if (isPostsLoading) return <div>Loading posts...</div>;
    if (postsError) return <div>Error loading posts</div>;

    return (
        <div>
            <h2>User: {user.name}</h2>
            <h3>Posts:</h3>
            <ul>
                {posts?.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default DependentQuery;
