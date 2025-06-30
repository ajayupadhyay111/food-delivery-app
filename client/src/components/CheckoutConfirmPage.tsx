import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CheckoutConfirmPage({ open, setOpen }: Props) {
  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      // Show success message or redirect as needed
    }, 1500);
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