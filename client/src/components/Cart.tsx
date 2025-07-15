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
import { useCartStore } from "@/zustand/useCartStore";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
  const {cart,clearCart,removeFromCart,incrementQuantity,decrementQuantity} = useCartStore();
  
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto my-10 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
          Your Cart
        </h2>
        <Button
          variant="destructive"
          onClick={clearCart}
          disabled={cart.length === 0}
        >
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
              <TableRow key={item._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={item.image} alt={item.name} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => decrementQuantity(item._id)}
                      disabled={item.quantity === 1}
                    >
                      <Minus />
                    </Button>
                    <span className="px-3">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => incrementQuantity(item._id)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>₹{item.price * item.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    onClick={() => removeFromCart(item._id)}
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
            <TableCell
              colSpan={2}
              className="font-bold text-orange-600 dark:text-orange-400"
            >
              ₹{totalAmount}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {cart.length > 0 && (
        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => setOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  );
};
export default Cart;
