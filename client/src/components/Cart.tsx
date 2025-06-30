import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Minus, Plus } from "lucide-react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";

const initialCart = [
  {
    id: 1,
    title: "Paneer Tikka",
    price: 220,
    quantity: 1,
    img: "",
  },
  {
    id: 2,
    title: "Chicken Biryani",
    price: 320,
    quantity: 2,
    img: "",
  },
];

const Cart = () => {
  const [cart, setCart] = useState(initialCart);
    const [open, setOpen] = useState<boolean>(false)
  const handleQuantity = (id: number, type: "inc" | "dec") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "inc"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClear = () => {
    setCart([]);
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto my-10 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">Your Cart</h2>
        <Button variant="destructive" onClick={handleClear} disabled={cart.length === 0}>
          Clear All
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Your cart is empty.
              </TableCell>
            </TableRow>
          ) : (
            cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={item.img} alt={item.title} />
                    <AvatarFallback>
                      {item.title
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantity(item.id, "dec")}
                      disabled={item.quantity === 1}
                    >
                      <Minus />
                    </Button>
                    <span className="px-3">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => handleQuantity(item.id, "inc")}
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>₹{item.price * item.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right font-bold">
              Grand Total
            </TableCell>
            <TableCell colSpan={2} className="font-bold text-orange-600 dark:text-orange-400">
              ₹{totalAmount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {cart.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Button onClick={()=>setOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md">
            Proceed to Checkout
          </Button>
        </div>
        )}
        <CheckoutConfirmPage open={open} setOpen={setOpen}/>
    </div>
    );

}
export default Cart;