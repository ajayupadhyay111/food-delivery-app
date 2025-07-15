import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/zustand/useUserStore";
import type { CheckoutSessionRequest } from "@/types/orderTypes";
import useRestaurantStore from "@/zustand/useRestaurantStore";
import { useCartStore } from "@/zustand/useCartStore";
import useOrderStore from "@/zustand/useOrderStore";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CheckoutConfirmPage({ open, setOpen }: Props) {
  const { user } = useUserStore();
  const { cart } = useCartStore();
  const { loading, createCheckoutSession } = useOrderStore();
  const { restaurant } = useRestaurantStore();
  const [input, setInput] = useState({
    name: user?.fullname || "",
    email: user?.email || "",
    contact: user?.contact || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate API call

    try {
      const checkoutData:CheckoutSessionRequest={
        cartItems:cart.map(item => ({
          menuId: item._id,
          name: item.name,
          image: item.image,
          price: item.price.toString(),
          quantity: item.quantity.toString()
        })),
        deliveryDetails: {
          name: input.name,
          email: input.email,
          contact: input.contact,
          address: input.address,
          city: input.city,
          country: input.country
        },
        restaurantId: restaurant?._id as string
      }
      await createCheckoutSession(checkoutData);
    } catch (error) {
      console.log(error)
    }finally{
      setOpen(false);
    }

    // setTimeout(() => {
    //   setOpen(false);
    //   // Show success message or redirect as needed
    // }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Review your order</DialogTitle>
        <DialogDescription>
          Please confirm your details before placing the order.
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            name="name"
            placeholder="Full Name"
            value={input.name}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={input.email}
            onChange={handleChange}
            required
            readOnly
            disabled
          />
          <Input
            name="contact"
            placeholder="Contact Number"
            value={input.contact}
            onChange={handleChange}
            required
          />
          <Input
            name="address"
            placeholder="Address"
            value={input.address}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2">
            <Input
              name="city"
              placeholder="City"
              value={input.city}
              onChange={handleChange}
              required
            />
            <Input
              name="country"
              placeholder="Country"
              value={input.country}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default CheckoutConfirmPage;
