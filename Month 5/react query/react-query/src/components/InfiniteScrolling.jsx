import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
const PAGE_SIZE = 10;

const retrievePosts = async ({ pageParam = 1 }) => {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
    );
    return response.data;
};

const InfiniteScrolling = () => {
    const {
        data,
        error,
        isLoading,
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts"],
        queryFn: retrievePosts,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < PAGE_SIZE) return undefined;
            return allPages.length + 1;
        },
    });

    useEffect(() => {
        if (hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [hasNextPage, fetchNextPage, isFetching]);

    if (isLoading) return <div>Fetching posts...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <div>
            <ul>
                {data?.pages.map((page, i) =>
                    page.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default InfiniteScrolling;