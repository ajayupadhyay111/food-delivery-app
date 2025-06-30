import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import burger from "@/assets/burger.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HeroSection() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  return (
    <section className="w-full h-[90vh] bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-12 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-10">
        {/* Left: Text and Search */}
        <div className="flex-1 flex flex-col items-start gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 leading-tight">
            Satisfy Your Cravings
            <br />
            <span className="text-gray-800 dark:text-white">
              Order Delicious Food Online
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Fast delivery, fresh ingredients, and your favorite meals at your
            doorstep.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/search/${searchText}`);
            }}
            className="flex w-full max-w-md gap-2"
          >
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search for food, cuisine, or restaurant..."
              className="flex-1 bg-white/80 dark:bg-gray-900/80 dark:text-white"
            />
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Search
            </Button>
          </form>
        </div>
        {/* Right: Food Image */}
        <div className="flex-1 flex justify-center">
          <img
            loading="lazy"
            src={burger}
            alt="Delicious Food"
            className="w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
