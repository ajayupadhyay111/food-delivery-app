import type { Orders } from "./orderTypes";

export type MenuItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};
export type Restaurant = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  menus: MenuItem[];
  imageUrl: string;
};
export type SearchedRestaurant = {
  data: Restaurant[];
};
export type RestaurantState = {
  loading: boolean;
  restaurant: Restaurant | null;
  searchedRestaurant: SearchedRestaurant | null | undefined;
  appliedFilter: string[];
  singleRestaurant: Restaurant | null;
  restaurantOrders: Orders[] | null ;
  createRestaurant: (formData: FormData) => Promise<void>;
  getRestaurant: () => Promise<void>;
  updateRestaurant: (formData: FormData) => Promise<void>;
  searchRestaurant: (
    searchText: string,
    searchQuery: string,
    selectedCuisines: any
  ) => Promise<void>;
  addMenuToRestaurant: (menu: any) => void;
  updateMenuOfRestaurant: (menu: any) => void;
  setAppliedFilter: (value: string) => void;
  resetAppliedFilter: () => void;
  getSingleRestaurant: (restaurantId: string) => Promise<void>;
  getRestaurantOrders: () => Promise<void>;
  updateRestaurantOrder: (orderId: string, status: string) => Promise<void>;
};
