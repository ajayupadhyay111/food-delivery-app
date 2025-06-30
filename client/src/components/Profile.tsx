import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Mail, Plus, Phone, MapPin, Landmark } from "lucide-react";
import { Button } from "./ui/button";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "ajju@gmail.com",
    contact: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        setProfileData((prev) => ({ ...prev, profilePicture: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = (e: FormEvent) => {
    e.preventDefault();
    // You can add validation and API call here
    console.log("Profile updated", profileData);
  };

  return (
    <form
      className="max-w-3xl mx-auto my-8 bg-white dark:bg-gray-900 rounded-lg shadow p-6"
      onSubmit={updateProfile}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedImage || profileData.profilePicture} />
            <AvatarFallback>
              {profileData.fullname
                ? profileData.fullname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "U"}
            </AvatarFallback>
            <input
              ref={imageRef}
              accept="image/*"
              onChange={fileChangeHandler}
              type="file"
              className="hidden"
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-full cursor-pointer"
            >
              <Plus className="text-white size-8" />
            </div>
          </Avatar>
          <input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={changeHandler}
            placeholder="Full Name"
            className="border-none p-1 outline-none text-2xl font-bold focus-visible:ring-transparent bg-transparent"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded p-3">
          <Mail className="text-gray-500" />
          <input
            type="email"
            name="email"
            readOnly
            value={profileData.email}
            onChange={changeHandler}
            placeholder="Email"
            className=" outline-none p-1 w-full bg-transparent border-none focus-visible:ring-0 text-gray-400 cursor-not-allowed select-none"
          />
        </div>

        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded p-3">
          <MapPin className="text-gray-500" />
          <input
            type="text"
            name="address"
            value={profileData.address}
            onChange={changeHandler}
            placeholder="Address"
            className=" outline-none p-1 w-full bg-transparent border-none focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded p-3">
          <Landmark className="text-gray-500" />
          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={changeHandler}
            placeholder="City"
            className=" outline-none p-1 w-full bg-transparent border-none focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded p-3 ">
          <Landmark className="text-gray-500" />
          <input
            type="text"
            name="country"
            value={profileData.country}
            onChange={changeHandler}
            placeholder="Country"
            className=" outline-none p-1 w-full bg-transparent border-none focus-visible:ring-0"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold"
        >
          Update
        </Button>
      </div>
    </form>
  );
};

export default Profile;
