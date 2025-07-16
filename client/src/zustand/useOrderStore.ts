import type { CheckoutSessionRequest, OrderState } from "@/types/orderTypes";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials = true;

const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      loading: false,
      orders: [],
      createCheckoutSession: async (
        checkoutSessionRequest: CheckoutSessionRequest
      ) => {
        try {
          set({ loading: true });
          const response = await axios.post(
            `${API_END_POINT}/checkout/create-checkout-session`,
            checkoutSessionRequest,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          window.location.href = response.data.session.url;
        } catch (error) {
          console.log(error);
        } finally {
          set({ loading: false });
        }
      },
      getOrderDetails: async () => {
        try {
          set({loading:true})
          const response = await axios.get(`${API_END_POINT}/`)
          if(response.data.success){
            set({orders:response.data.orders})
          }
        } catch (error) {
          console.log(error)
        } finally {
          set({loading:false})
        }
      },
    }),
    {
      name: "order-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
