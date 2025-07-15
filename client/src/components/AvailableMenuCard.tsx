import type { MenuItem } from "@/types/restaurantType";
import { Button } from "./ui/button";
import { useCartStore } from "@/zustand/useCartStore";
import { useNavigate } from "react-router-dom";

function AvailableMenuCard({ item }: { item: MenuItem }) {
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  return (
    <div
      key={item._id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow group hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
          {item.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 text-sm mb-3 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-semibold text-orange-600 dark:text-orange-400 text-lg">
            ₹{item.price}
          </span>
          <Button
            onClick={() => {
              addToCart(item);
              navigate("/cart");
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-1 rounded"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AvailableMenuCard;
