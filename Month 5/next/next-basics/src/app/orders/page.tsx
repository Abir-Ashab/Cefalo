import Card from "@/components/Card";
import { CardProps } from "@/components/Card";

interface Cart {
  id: number;
  total: number;
  products: CardProps[];
}

const OrdersPage = async () => {
  const res = await fetch('https://dummyjson.com/carts')
  const data = await res.json();
  const carts: Cart[] = data.carts;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {
      carts.map((cart: Cart) => (
        <div key={cart.id} className="border p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Cart ID: {cart.id}</h2>
          <p>Total Price: ${cart.total}</p>
          <div className="mt-4">
            {cart.products.map((product: CardProps) => (
              <Card
                key={product.title}
                title={product.title}
                price={product.price}
                thumbnail={product.thumbnail}
              />
            ))}
          </div>
        </div>
      ))
    }
    </div>
  );
};

export default OrdersPage;
