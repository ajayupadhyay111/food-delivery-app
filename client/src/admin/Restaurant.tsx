import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantSchema,
  type RestaurantState,
} from "@/schema/restaurantSchema";

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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RestaurantState>>({});
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form data
    const result = restaurantSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantState>);
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Restaurant added successfully!");
      console.log("Form Data:", form);
      setForm({
        restaurantName: "",
        city: "",
        country: "",
        deliveryTime: 0,
        cuisines: [],
        image: undefined,
      });
      setPreview(null);
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto my-10 bg-white dark:bg-gray-900 rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold mb-6 text-orange-600 dark:text-orange-400">
        Add Restaurant
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="name">Restaurant Name</Label>
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
          <Label htmlFor="city">City</Label>
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
          <Label htmlFor="country">Country</Label>
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
          <Label htmlFor="deliveryTime">Delivery Time</Label>
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
          <Label htmlFor="cuisines">Cuisines</Label>
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
          <Label htmlFor="image">Upload Restaurant Banner</Label>
          <Input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleChange}
            required
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-full h-40 object-cover rounded-lg border"
            />
          )}
        </div>
        <div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            {loading ? "Adding..." : "Add your restaurant"}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default Restaurant;
