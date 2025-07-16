import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useRestaurantStore from "@/zustand/useRestaurantStore";
import type { Orders } from "@/types/orderTypes";

const initialOrders = [
  {
    id: 1,
    name: "Ajay Upadhyay",
    address: "123 Main St, Delhi, India",
    total: 650,
    status: "Delivered",
  },
  {
    id: 2,
    name: "Priya Sharma",
    address: "456 Park Ave, Mumbai, India",
    total: 420,
    status: "Pending",
  },
  {
    id: 3,
    name: "Rahul Singh",
    address: "789 Lake Rd, Lucknow, India",
    total: 890,
    status: "On the way",
  },
];

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const { getRestaurantOrders, restaurantOrders,updateRestaurantOrder } = useRestaurantStore();

  useEffect(() => {
    getRestaurantOrders();
  }, [getRestaurantOrders]);

  const handleStatusChange = (id: string, newStatus: string) => {
    updateRestaurantOrder(id,newStatus)
    // Update the local state to reflect the change immediately

  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 dark:text-orange-400">Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurantOrders && restaurantOrders.map((order: Orders) => (
            <TableRow key={order._id}>
              <TableCell>{order.user?.fullname}</TableCell>
              <TableCell>{order.user?.address}</TableCell>
              <TableCell>₹{order.totalAmount}</TableCell>
              <TableCell>
                <Badge
                  className={
                    order.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "preparing"
                    ? "bg-orange-100 text-orange-700"
                      : order.status === "delivered"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                    }
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusChange(order._id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="outfordelivery">Out For Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Orders;