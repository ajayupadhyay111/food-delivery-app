import React from "react";
import type { MenuItem } from "./AddMenu";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  item: MenuItem;
  setEditMenu: React.Dispatch<React.SetStateAction<boolean>>;
  editMenu: boolean;
};

function EditMenu({ item, setEditMenu, editMenu }: Props) {
  console.log(item);

  const [form, setForm] = React.useState<MenuItem>(item);
  const [preview, setPreview] = React.useState<string>(
    typeof item.img === "string" ? item.img : ""
  );
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, files } = e.target as any;
    if (type === "file" && files && files[0]) {
      setForm((prev) => ({ ...prev, img: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log("Form submitted:", form);
    setEditMenu(false);
  };

  return (
    <Dialog open={editMenu} onOpenChange={setEditMenu}>
      <DialogContent>
        <DialogTitle>Edit Menu Item</DialogTitle>
        <DialogDescription>
          Update the details of the menu item.
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
              alt={form.name}
              className="w-full h-32 object-cover rounded mt-2"
            />
          )}
          <Button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditMenu;
