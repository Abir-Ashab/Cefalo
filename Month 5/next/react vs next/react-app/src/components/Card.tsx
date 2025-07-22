import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Card: React.FC<{ user: User }> = ({ user }) => (
  <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '250px' }}>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
    <p>{user.phone}</p>
  </div>
);

export default Card;
