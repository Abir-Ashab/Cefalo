import React, { useEffect, useState } from 'react';
import Card from './components/Card';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(setData);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>React Client-side Rendering</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {data.map(user => <Card key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default App;
