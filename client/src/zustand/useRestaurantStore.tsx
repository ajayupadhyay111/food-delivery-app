import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import type { MenuItem, RestaurantState } from "@/types/restaurantType";

const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;

const useRestaurantStore = create<RestaurantState>()(
  persist(
    (set) => ({
      loading: false,
      restaurant: null,
      searchedRestaurant: null,
      appliedFilter: [],
      singleRestaurant:null,
      createRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.post(`${API_END_POINT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
          }
        } catch (error) {
          if (axios.isAxiosError(error))
            toast.error(error.response?.data?.message);
          else if (error instanceof Error) toast.error(error.message);
          else toast.error("Something went wrong");
        } finally {
          set({ loading: false });
        }
      },
      getRestaurant: async () => {
        try {
          set({ loading: true });
          const response = await axios.get(`${API_END_POINT}`);
          if (response.data.success) {
            set({ restaurant: response.data.restaurant });
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) set({ restaurant: null });
            toast.error(error.response?.data?.message);
          } else if (error instanceof Error) toast.error(error.message);
          else toast.error("Something went wrong");
        } finally {
          set({ loading: false });
        }
      },
      updateRestaurant: async (formData: FormData) => {
        try {
          set({ loading: true });
          const response = await axios.put(`${API_END_POINT}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (response.data.success) {
            toast.success(response.data.message);
            set({ restaurant: response.data.restaurant });
          }
        } catch (error) {
          if (axios.isAxiosError(error))
            toast.error(error.response?.data?.message);
          else if (error instanceof Error) toast.error(error.message);
          else toast.error("Something went wrong");
        } finally {
          set({ loading: false });
        }
      },
      searchRestaurant: async (
        searchText: string,
        searchQuery: string,
        selectedCuisines: any
      ) => {
        try {
          set({ loading: true });
          const params = new URLSearchParams();

          params.set("searchQuery", searchQuery);
          params.set("cuisines", selectedCuisines.join(","));
          const response = await axios.post(
            `${API_END_POINT}/search/${searchText}?${params.toString()}`
          );
          if (response) {
            set({ searchedRestaurant: response.data });
          }
        } catch (error) {
          console.log(error.message);
        } finally {
          set({ loading: false });
        }
      },
      addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
          restaurant: state.restaurant
            ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] }
            : null,
        }));
      },
      updateMenuOfRestaurant: (updatedMenu: MenuItem) => {
        set((state: any) => {
          if (state.restaurant) {
            const updatedMenus = state.restaurant.menus.map((menu: any) =>
              menu._id === updatedMenu._id ? updatedMenu : menu
            );
            return {
              restaurant: {
                ...state.restaurant,
                menus: updatedMenus,
              },
            };
          }
          return {};
        });
      },
      setAppliedFilter: (value: string) => {
        set((state) => {
          const isAppliedFilter = state.appliedFilter.includes(value);
          const updatedFilter = isAppliedFilter
            ? state.appliedFilter.filter((item) => item !== value)
            : [...state.appliedFilter, value];
          return { appliedFilter: updatedFilter };
        });
      },
      resetAppliedFilter: () => {
        set({ appliedFilter: [] });
      },
      getSingleRestaurant:async(restaurantId:string)=>{
        try {
          const response = await axios.get(`${API_END_POINT}/${restaurantId}`)
          if(response.data.success){
            set({singleRestaurant:response.data.restaurant})
          }
        } catch (error) {
          console.log(error)
        }
      }      
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRestaurantStore;
