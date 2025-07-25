import React from "react";
import { useMutation } from "react-query";
import axios from "axios";

const DeletePost = () => {
  const mutation = useMutation(() =>
    axios.delete("https://jsonplaceholder.typicode.com/posts/1"),
  );

  const deleteData = () => {
    mutation.mutate();
  };

  if (mutation.isLoading) {
    return <span>Deleting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post deleted!</span>;
  }

  return (
    <div>
      <button onClick={deleteData}>Delete Post</button>
    </div>
  );
};

export default DeletePost;