import Card from '../components/Card';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users: User[] = await res.json();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Next.js Static Site Generation</h1>
      <div className="flex flex-wrap gap-4">
        {users.map(user => <Card key={user.id} user={user} />)}
      </div>
    </div>
  );
}