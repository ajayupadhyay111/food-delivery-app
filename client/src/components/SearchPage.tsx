import { Link, useParams } from "react-router-dom";
import FilterPage from "./FilterPage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Globe, MapPin, Search, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import useRestaurantStore from "@/zustand/useRestaurantStore";
import type { Restaurant } from "@/types/restaurantType";

const SearchPage = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const {
    loading,
    searchRestaurant,
    searchedRestaurant,
    setAppliedFilter,
    appliedFilter,
  } = useRestaurantStore();
  useEffect(() => {
    searchRestaurant(params.text!, searchQuery, appliedFilter);
    console.log(searchedRestaurant);
  }, [appliedFilter, params.text!]);
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
              onClick={() =>
                searchRestaurant(params.text!, searchQuery, appliedFilter)
              }
            >
              Search
            </Button>
          </div>
          {loading ? (
            <RestaurantListSkeleton />
          ) : searchedRestaurant && searchedRestaurant.data.length > 0 ? (
            <div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
                <h1 className="font-medium text-xl">
                  ({searchedRestaurant?.data.length}) Search result found
                </h1>
                <div className="flex flex-wrap gap-2">
                  {appliedFilter.map((selectedFilter: string, idx: number) => {
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
                          onClick={() => setAppliedFilter(selectedFilter)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {searchedRestaurant?.data.map((item: Restaurant) => (
                  <Card
                    key={item._id}
                    className="bg-white dark:bg-gray-800 p-0 overflow-hidden shadow-md hover:shadow-xl transition-shadow border-0 rounded-xl group"
                  >
                    {/* Image Section */}
                    <div className="relative">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={item.imageUrl}
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
                        {item.restaurantName}
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full ml-2">
                          Open
                        </span>
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 mb-1">
                        <MapPin className="w-4 h-4" />
                        <span>{item.city}</span>
                        <Globe className="w-4 h-4 ml-4" />
                        <span>{item.country}</span>
                      </div>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {item.cuisines.map((cuisine: string, idx: number) => (
                          <Badge
                            key={idx}
                            className="rounded-md cursor-pointer bg-orange-100 text-orange-700 hover:bg-orange-200"
                          >
                            {cuisine}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    {/* Footer Section */}
                    <CardFooter className="p-5 pt-0 flex justify-end">
                      <Link to={`/restaurant/${item._id}`}>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md px-5 py-2 shadow">
                          View Menus
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <Search className="w-12 h-12 text-orange-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                No result found
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-center max-w-xs">
                We couldn't find any restaurants or food items matching your
                search. Try different keywords or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const RestaurantListSkeleton = () => (
  <div>
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
      <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-800 p-0 overflow-hidden shadow-md border-0 rounded-xl animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative w-full h-40 bg-gray-200 dark:bg-gray-700" />
          {/* Content Skeleton */}
          <div className="p-5">
            <div className="h-5 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="flex gap-2 mt-3">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-6" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SearchPage;
