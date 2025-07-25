import { useQuery } from '@tanstack/react-query'
import axios from "axios";

const retrievePosts = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts",
  );
  return response.data;
};

const DisplayPosts = () => {
  const {
    data: posts, // Renamed from 'data' to 'posts' for clarity
    error,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: retrievePosts,
  });

  if (isLoading) return <div>Fetching posts...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default DisplayPosts;