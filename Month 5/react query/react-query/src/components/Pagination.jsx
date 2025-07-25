import { useQuery } from '@tanstack/react-query';
import axios from "axios";
import { useState } from "react";

const PAGE_SIZE = 10;

const retrievePosts = async ({ pageParam = 1 }) => {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
    );
    return response.data;
};

const DisplayPosts = () => {
    const [page, setPage] = useState(1);

    const {
        data: posts,
        error,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["posts", page],
        queryFn: () => retrievePosts({ pageParam: page }),
        keepPreviousData: true,
    });

    if (isLoading) return <div>Fetching posts...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
            <button
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                disabled={page === 1 || isFetching}
            >
                Previous
            </button>
            <span style={{ margin: "0 10px" }}>Page {page}</span>
            <button
                onClick={() => setPage((old) => old + 1)}
                disabled={posts.length < PAGE_SIZE || isFetching}
            >
                Next
            </button>
            {isFetching && <div>Loading...</div>}
        </div>
    );
};

export default DisplayPosts;