import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EditMenu from "./EditMenu";
import { Plus } from "lucide-react";

let menus = [
  {
    id: 1,
    name: "Paneer Tikka",
    price: 220,
    desc: "Delicious paneer tikka with spices",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM0eDCB5wXDAPYJfi02-CzoqeXbaZuGOT9IA&s",
  },
  {
    id: 2,
    name: "Chicken Biryani",
    price: 320,
    desc: "Aromatic chicken biryani with saffron",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_upF9cgyXK9fYh85mVV-ZEYKw04JcTzUjLw&s",
  },
];

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  desc: string;
  img: string;
};

function AddMenu() {
  const [open, setOpen] = useState(false);
  const [editMenu, setEditMenu] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [menu, setMenu] = useState<MenuItem[]>(menus);
  const [form, setForm] = useState({
    name: "",
    price: "",
    desc: "",
    img: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as any;
    if (type === "file" && files && files[0]) {
      setForm((prev) => ({ ...prev, img: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Validate form data
    setForm({ name: "", price: "", desc: "", img: null });
    // setPreview(null);
    setOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-orange-600">Available Menus</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-500 transition-all duration-300 text-white px-4 py-2 rounded">
              <Plus/> Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>
              Fill in the details of the new menu item.
            </DialogDescription>
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                placeholder="Menu Item Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                required
              />
              <textarea
                name="desc"
                placeholder="Description"
                className="w-full p-2 border rounded"
                rows={3}
                value={form.desc}
                onChange={handleChange}
                required
              ></textarea>
              <Input
                type="file"
                accept="image/*"
                name="img"
                onChange={handleChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded mt-2"
                />
              )}
              <Button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
              >
                Add Menu Item
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Available Menus List */}
      <div className="grid md:grid-cols-3 gap-6">
        {menu.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No menu items added yet.
          </div>
        ) : (
          menu.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex flex-col"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                {item.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-300 text-sm mb-2">
                {item.desc}
              </p>
              <span className="font-semibold text-orange-600 dark:text-orange-400 text-lg mb-2">
                ₹{item.price}
              </span>
              <Button onClick={()=>{setEditMenu(true); setSelectedMenu(item)}}  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded">
                Edit Menu
              </Button>
            </div>
          ))
        )}
        {editMenu && <EditMenu item={selectedMenu} setEditMenu={setEditMenu} editMenu={editMenu}/>}
      </div>
    </div>
  );
}
export default AddMenu;
