import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import burger from "../assets/burger.jpg";
const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          <div className="flex gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food, cuisine, or restaurant..."
              className="flex-1 bg-white/80 dark:bg-gray-900/80 dark:text-white"
            />
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              Search
            </Button>
          </div>
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-xl">(2) Search result found</h1>
              <div className="flex flex-wrap gap-2">
                {["biryani", "momos", "jalebi"].map(
                  (selectedFilter: string, idx: number) => {
                    return (
                      <div
                        key={idx}
                        className="relative inline-flex items-center max-w-full"
                      >
                        <Badge
                          className="text-[#D19254] rounded-md cursor-pointer pr-6 whitespace-nowrap"
                          variant={"outline"}
                        >
                          {selectedFilter}
                        </Badge>
                        <X
                          size={16}
                          className="absolute right-1 text-[#D19254] hover:cursor-pointer"
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3,4].map((item: number) => (
                <Card className="bg-white dark:bg-gray-800 p-0 overflow-hidden shadow-md hover:shadow-xl transition-shadow border-0 rounded-xl group">
                  {/* Image Section */}
                  <div className="relative">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={burger}
                        alt="Food Item"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </AspectRatio>
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow">
                        Featured
                      </span>
                    </div>
                  </div>
                  {/* Content Section */}
                  <CardContent className="p-5">
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                      Pizza Hut
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-2">
                        Open
                      </span>
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>Delhi</span>
                      <Globe className="w-4 h-4 ml-4" />
                      <span>India</span>
                    </div>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {["biryani", "momos", "jalebi"].map(
                        (item: string, idx: number) => (
                          <Badge
                            key={idx}
                            className="rounded-md cursor-pointer bg-orange-100 text-orange-700 hover:bg-orange-200"
                          >
                            {item}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                  {/* Footer Section */}
                  <CardFooter className="p-5 pt-0 flex justify-end">
                    <Link to={`/restaurant/${123}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md px-5 py-2 shadow">
                        View Menus
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
