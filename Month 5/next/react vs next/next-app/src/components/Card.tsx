interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Card: React.FC<{ user: User }> = ({ user }) => (
  <div className="border border-gray-300 p-4 rounded-md w-64 shadow-sm">
    <h3 className="text-lg font-semibold">{user.name}</h3>
    <p className="text-sm text-gray-700">{user.email}</p>
    <p className="text-sm text-gray-700">{user.phone}</p>
  </div>
);

export default Card;