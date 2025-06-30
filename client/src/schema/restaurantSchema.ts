import { z } from "zod";
export const restaurantSchema = z.object({
  restaurantName: z.string().nonempty("Restaurant name is required"),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required"),
  deliveryTime: z.number().min(0, "Delivery time can't be in negative"),
  cuisines: z.array(z.string()),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, {
      message: "Image file is required",
    }),
});

export type RestaurantState = z.infer<typeof restaurantSchema>;
