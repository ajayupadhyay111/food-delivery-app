import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantSchema,
  type RestaurantState,
} from "@/schema/restaurantSchema";
import useRestaurantStore from "@/zustand/useRestaurantStore";

const Restaurant = () => {
  const [form, setForm] = useState<RestaurantState>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    image: undefined,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<RestaurantState>>({});
  const {
    loading,
    restaurant,
    updateRestaurant,
    getRestaurant,
    createRestaurant,
  } = useRestaurantStore();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      if (name === "cuisines") {
        const cuisinesArray = value.split(",").map((cuisine) => cuisine.trim());
        setForm((prev) => ({ ...prev, [name]: cuisinesArray }));
        return;
      }
      if (name === "deliveryTime") {
        const deliveryTimeValue = parseInt(value, 10);
        setForm((prev) => ({ ...prev, [name]: deliveryTimeValue }));
        return;
      }
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form data
    const result = restaurantSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantState>);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("restaurantName", form.restaurantName);
      formData.append("city", form.city);
      formData.append("country", form.country);
      formData.append("deliveryTime", form.deliveryTime.toString());
      formData.append("cuisines", form.cuisines.toString());
      if (form.image) {
        formData.append("imageFile", form.image);
      }

      // Simulate API call
      if (restaurant) {
        await updateRestaurant(formData);
      } else {
        await createRestaurant(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getRestaurant();
      console.log(restaurant)
      setForm({
        restaurantName: restaurant.restaurantName || "",
        city: restaurant.city || "",
        country: restaurant.country || "",
        deliveryTime: restaurant.deliveryTime || 0,
        cuisines: restaurant.cuisines
          ? restaurant.cuisines.map((cuisine: string) => cuisine)
          : [],
        image: undefined,
      });
    })();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-10 bg-white dark:bg-gray-900 rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold mb-6 text-orange-600 dark:text-orange-400">
        Add Restaurant
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name" className="pb-2">
            Restaurant Name
          </Label>
          <Input
            type="text"
            name="restaurantName"
            placeholder="Enter your restaurant name"
            value={form.restaurantName}
            onChange={handleChange}
            required
          />
          {errors.restaurantName && (
            <p className="text-red-500 text-sm mt-1">{errors.restaurantName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="city" className="pb-2">
            City
          </Label>
          <Input
            type="text"
            name="city"
            placeholder="Enter city"
            value={form.city}
            onChange={handleChange}
            required
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <Label htmlFor="country" className="pb-2">
            Country
          </Label>
          <Input
            type="text"
            name="country"
            placeholder="Enter country"
            value={form.country}
            onChange={handleChange}
            required
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
        <div>
          <Label htmlFor="deliveryTime" className="pb-2">
            Delivery Time
          </Label>
          <Input
            type="number"
            name="deliveryTime"
            placeholder="e.g. 30 mins"
            value={form.deliveryTime}
            onChange={handleChange}
            required
          />
          {errors.deliveryTime && (
            <p className="text-red-500 text-sm mt-1">{errors.deliveryTime}</p>
          )}
        </div>
        <div>
          <Label htmlFor="cuisines" className="pb-2">
            Cuisines
          </Label>
          <Input
            type="text"
            name="cuisines"
            placeholder="e.g. Indian, Chinese"
            value={form.cuisines}
            onChange={handleChange}
            required
          />
          {errors.cuisines && (
            <p className="text-red-500 text-sm mt-1">{errors.cuisines}</p>
          )}
        </div>
        <div>
          <Label htmlFor="image" className="pb-2">
            Upload Restaurant Banner
          </Label>
          <Input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-full h-40 object-cover rounded-lg border"
            />
          ) : (
            form.image && (
              <img
                src={
                  typeof form.image === "string"
                    ? form.image
                    : URL.createObjectURL(form.image)
                }
                alt="Preview"
                className="mt-3 w-full h-40 object-cover rounded-lg border"
              />
            )
          )}
        </div>
        <div>
          {!restaurant ? (
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              {loading ? "Adding..." : "Add your restaurant"}
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
            >
              {loading ? "Updating..." : "Update your restaurant"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
export default Restaurant;
