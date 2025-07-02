import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

const useRestaurantStore = create()(
  persist(
    (set) => ({
      loading: false,
      restaurant: null,
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
          const response = await axios.post(`${API_END_POINT}`, formData, {
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
      searchRestaurant:async()=>{},
    }),
    {
      name: "restaurant-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
