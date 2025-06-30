import { Timer, MapPin, Star } from "lucide-react";
import burger from "../assets/burger.jpg";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import AvailableMenuCard from "./AvailableMenuCard";

export type MenuItem = {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  tag: string; // "Veg", "Non-Veg", "Dessert", etc.
};

const menuItems:MenuItem[] = [
  {
    id: 1,
    name: "Paneer Tikka",
    desc: "Spicy grilled paneer cubes served with mint chutney.",
    price: 220,
    img: burger,
    tag: "Veg",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    desc: "Aromatic basmati rice cooked with tender chicken and spices.",
    price: 320,
    img: burger,
    tag: "Non-Veg",
  },
  {
    id: 3,
    name: "Gulab Jamun",
    desc: "Soft, sweet, and juicy milk-solid balls in sugar syrup.",
    price: 90,
    img: burger,
    tag: "Dessert",
  },
];

const RestaurantDetailsPage = () => {
  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      {/* Restaurant Header */}
      <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-80 h-56 md:h-64 overflow-hidden rounded-xl">
          <img
            src={burger}
            alt="Tandoori Tadka"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {/* Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              Tandoori Tadka
            </h1>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                4.5
              </span>
              <span className="text-gray-400 text-sm">(1,200 ratings)</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-orange-500" />
              <span className="text-gray-600 dark:text-gray-300">
                Connaught Place, Delhi, India
              </span>
            </div>
            <div className="flex gap-2 mb-4 flex-wrap">
              {["biryani", "momos", "jalebi"].map(
                (item: string, idx: number) => (
                  <Badge key={idx} className="bg-orange-100 text-orange-700">
                    {item}
                  </Badge>
                )
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-orange-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Delivery Time:{" "}
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  35 mins
                </span>
              </span>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md">
              Order Now
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Available Menus
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <AvailableMenuCard item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailsPage;
