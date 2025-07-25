# React-Query
Here is a good article: https://refine.dev/blog/react-query-guide/#introduction 

## Install

```powershell
npm i @tanstack/react-query
```

**For write operations**:
```js
import { useMutation } from '@tanstack/react-query'
```
**For read operation**:
```js
import { useQuery } from '@tanstack/react-query'
```

## Read Operation Syntax

This `useQuery` hook is used to fetch data from your API. It returns an object that contains the status of the query (loading, error, or success), the data returned from the query, and functions to refetch the data. Here `data` represents `success`, `error` represents `error` and `isLoading` represents `loading`. You can't change the name of these three. (data, error, isLoading). But can rename like the below.

```js
const {
    data: posts, // Renamed from 'data' to 'posts' for clarity
    error,
    isLoading,
} = useQuery({
    queryKey: ["posts"],
    queryFn: retrievePosts,
});
```

* When you call useQuery and pass it a key (in this case, 'postsData') and a fetch function (retrievePosts), React Query performs the fetch and then stores the result in a cache.

* The key you provide ('posts') is used as the identifier for this cache. If useQuery is called again with the same key while the data is still in the cache, React Query will return the cached data instead of performing a new fetch.

* But as the key is static here, it will not triggers or recall the API here. To get this functionality we need to use another variable which is getting changed on time. Here is some comparison where `useQuery` automatically re-runs whenever any value in the queryKey changes. (You will get a better idea from the `src/compomonents/Pagination` component)

```js
queryKey: ["posts", page]           // page change triggers re-run
queryKey: ["posts", page, filter]   // page OR filter change triggers re-run
queryKey: ["posts"]                 // static key, won't re-run on page change
```

## Write Operation Syntax

While the `useQuery` hook is used for `"read"` operations (fetching data), React Query provides the `useMutation` hook for `"write"` operations (creating, updating, and deleting data).

Using the useMutation hook for CRUD operation we need to note that the Json placeholder API doesn't actually store the created, updated, or deleted data. But to be sure the operation were made, it will either return a `success` statement, an `error` statement or a `loading` statement like the previous.

```js
  const mutation = useMutation((newPost) =>
    axios.post("https://jsonplaceholder.typicode.com/posts", newPost),
  );

  const submitData = () => {
    mutation.mutate({ title, body });
  };

  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post submitted!</span>;
  }
```


### 