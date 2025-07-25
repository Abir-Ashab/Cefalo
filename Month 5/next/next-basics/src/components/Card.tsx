import React from 'react'
export interface CardProps {
  key?: string;
  title: string;
  price: number;
  thumbnail: string;
}

export default function Card(props: CardProps) {
  const {title, price, thumbnail} = props;
  return (
    <div className="border p-4 rounded-lg space-y-2 mb-4">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-700">${price.toFixed(2)}</p>
    </div>
  )
}