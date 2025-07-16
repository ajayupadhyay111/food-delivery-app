import useOrderStore from "@/zustand/useOrderStore";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

const UserOrders = () => {
  const { getOrderDetails, orders } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 dark:text-orange-400">
        Your Orders
      </h2>
      {orders && orders.length > 0 ? (
        <div className="space-y-8">
          {orders.map((order: any, idx: number) => (
            <div key={idx} className="border-b pb-6 mb-6 last:border-none">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                <div>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    Order ID:
                  </span>{" "}
                  <span className="text-orange-600 dark:text-orange-400">
                    {order._id || idx + 1}
                  </span>
                </div>
                <Badge
                  className={
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }
                >
                  {order.status || "Pending"}
                </Badge>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Restaurant:
                </span>{" "}
                <span>{order.restaurant?.restaurantName}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Delivery Address:
                </span>{" "}
                <span>
                  {order.deliveryDetails?.address},{" "}
                  {order.deliveryDetails?.city},{" "}
                  {order.deliveryDetails?.country}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Contact:
                </span>{" "}
                <span>
                  {order.deliveryDetails?.name} (
                  {order.deliveryDetails?.contact})
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Total Amount:
                </span>{" "}
                <span className="font-bold text-orange-600 dark:text-orange-400">
                  ₹
                  {order.cartItems?.reduce(
                    (acc: number, item: any) =>
                      acc + Number(item.price) * Number(item.quantity),
                    0
                  )}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Items:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {order.cartItems?.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-300">
                          ₹{item.price} x {item.quantity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-12">
          You have not placed any orders yet.
        </div>
      )}
    </div>
  );
};

export default UserOrders;
