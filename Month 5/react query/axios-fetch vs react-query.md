## **you *can*** do the same as react-query using axios manually

```js
const handleClick = async () => {
  try {
    setLoading(true);
    await axios.post('/api/todo', data);
    setSuccess(true);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};
```

But this **manual approach** has several **drawbacks** that `React Query` solves cleanly and efficiently.

---

###  `useMutation` Over Plain `axios/fetch`?

---

#### 1. **Built-in Loading, Error, Success State**

* You don't need to manage `isLoading`, `isError`, `isSuccess`, etc. manually.

```js
const mutation = useMutation(postTodo);
mutation.mutate(data);
```

* Then access: `mutation.isLoading`, `mutation.error`, etc.

---

#### 2. **Automatic Cache Invalidation**

**What is Cache Invalidation?**

When you **fetch data** using `React Query` (with `useQuery`), it **caches** that data in memory (RAM). 

So for example:

```js
useQuery(['todos'], fetchTodos)
```

This will cache the `/todos` response in memory.Now, imagine you **add a new todo** with:

```js
axios.post('/todos', newTodo)
```

**Problem:**
Your UI still shows the **old list**, because `useQuery(['todos'])` is still showing cached data.

**Solution:**
You need to tell React Query:

> “Hey, the data for `todos` is now stale — please refetch it from the server.”

That’s **cache invalidation** — marking cached data as stale so it can be refetched. If you use `useMutation`, you can **automatically trigger a refetch** like this:

```js
const queryClient = useQueryClient();

const mutation = useMutation(addTodo, {
  onSuccess: () => {
    // Invalidate the cache so React Query refetches 'todos'
    queryClient.invalidateQueries(['todos']);
  },
});
```

So after the mutation (`addTodo`) is successful:

1. It **invalidates the `todos` cache**.
2. React Query **refetches** the latest `todos` from server.
3. Your UI **updates automatically** with the latest data.


#### 3. **Optimistic Updates (Hard manually)**

* React Query makes this very straightforward.
* Doing this manually is complex and error-prone.

---

#### 4. **Retry Logic**

* You get **auto retries with exponential backoff** for free.
* Plain fetch/axios? You’d need to write custom logic.

---

#### 5. **Global Devtools Support**

* React Query Devtools show mutation/query status in real time.
* Makes debugging and dev workflow far smoother.

---

#### 6. **Cleaner Code Separation**

* With `useMutation`, you **declare your mutation logic in one place** and call it imperatively:

```js
const mutation = useMutation(postTodo);
<button onClick={() => mutation.mutate({ title: 'New Todo' })} />
```

* Your component stays focused on UI; logic stays with the hook.

---

#### 7. **Better Integration with Query Cache**

* It works seamlessly with your `useQuery()` calls and data syncing.
* Your frontend state stays consistent with your backend.

---

### Side-by-Side Example

**Manual axios:**

```js
const handleAdd = async () => {
  setLoading(true);
  try {
    await axios.post('/api/items', newItem);
    const updated = await axios.get('/api/items');
    setItems(updated.data);
  } catch (e) {
    setError(e);
  } finally {
    setLoading(false);
  }
};
```

**React Query:**

```js
const queryClient = useQueryClient();

const mutation = useMutation(addItem, {
  onSuccess: () => {
    queryClient.invalidateQueries('items');
  },
});

// onClick
mutation.mutate(newItem);
```

---
