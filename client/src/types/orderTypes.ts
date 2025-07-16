import { updateOrderStatus } from './../../../server/src/controller/restaurant.controller';
import type { User } from "@/zustand/useUserStore";

export type CheckoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    image: string;
    price: string;
    quantity: string;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    contact: string;
    address: string;
    city: string;
    country: string;
  };
  restaurantId: string;
  user?: User;
};

export interface Orders extends CheckoutSessionRequest {
  _id: string;
  status: string;
  totalAmount: number;
}

export type OrderState = {
  loading: boolean;
  orders: Orders[] | null;
  createCheckoutSession: (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => Promise<void>;
  getOrderDetails: () => Promise<void>; 
};
