import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sun,
  Moon,
  ShoppingCart,
  ChevronDown,
  Loader2,
  Menu,
  User,
  HandPlatter,
  SquareMenu,
  UtensilsCrossed,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const admin = true;
  const loading = true;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="logo text-2xl md:text-3xl lg:text-4xl">
          <span className="bite">Bite</span>
          <span className="now text-[#222] dark:text-[#fff]">Now</span>
        </div>
      </Link>

      {/* Nav Links */}
      <ul className="hidden sm:flex items-center gap-6 ml-8 ">
        <li>
          <Link
            to="/"
            className="hover:text-orange-600 dark:hover:text-orange-400 font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="hover:text-orange-600 dark:hover:text-orange-400 font-medium"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="hover:text-orange-600 dark:hover:text-orange-400 font-medium"
          >
            Order
          </Link>
        </li>
        {/* Dashboard with submenu using shadcn dropdown */}
        {admin && (
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1 font-medium px-2"
                >
                  Dashboard <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link to="/admin/restaurant">Restaurant</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/menus">Menus</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/orders">Orders</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        )}
      </ul>

      {/* Right Side: Dark/Light Toggle, Cart, User */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Dark/Light Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-orange-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </Button>
        {/* Cart */}
        <Link
          to="/cart"
          className="relative p-2 rounded-full hover:bg-orange-100 dark:hover:bg-gray-700 transition"
        >
          <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-orange-400" />
          {/* Example cart badge */}
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5">
            2
          </span>
        </Link>
        {/* User Image */}
        <Link to="/profile">
          <Avatar>
            <AvatarImage src={""} alt="User" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
        {loading ? (
          <Button className="w-24 hidden sm:block bg-orange-500 hover:bg-orange-600 text-white font-semibold">
            Logout
          </Button>
        ) : (
          <Button
            disabled
            className="w-24 hidden sm:block bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            <span className="animate-spin">
              <Loader2 />
            </span>
          </Button>
        )}
        {/* menu icon */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="">
              <MobileNavbar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const loading = true;
  return (
    <div className="mt-12 mx-8">
      <ul>
        <li>
          <Link
            to="/profile"
            className="flex items-center gap-2 hover:text-orange-500 transition-all px-4 py-2"
          >
            <User className="size-6" /> <span className="text-xl">Profile</span>
          </Link>
        </li>
        <li>
          <Link
            to="/orders"
            className="flex items-center gap-2 hover:text-orange-500 transition-all px-4 py-2"
          >
            <HandPlatter className="size-6" />{" "}
            <span className="text-xl">Order</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/menus"
            className="flex items-center gap-2 hover:text-orange-500 transition-all px-4 py-2"
          >
            <SquareMenu className="size-6" />{" "}
            <span className="text-xl">Menu</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/restaurant"
            className="flex items-center gap-2 hover:text-orange-500 transition-all px-4 py-2"
          >
            <UtensilsCrossed className="size-6" />{" "}
            <span className="text-xl">Restaurant</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/orders"
            className="flex items-center gap-2 hover:text-orange-500 transition-all px-4 py-2"
          >
            <Package className="size-6" />{" "}
            <span className="text-xl">Restaurant Orders</span>
          </Link>
        </li>
      </ul>
      <div className="mt-8">
        {loading ? (
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
            Logout
          </Button>
        ) : (
          <Button disabled className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
            <Loader2 className="animate-spin size-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
