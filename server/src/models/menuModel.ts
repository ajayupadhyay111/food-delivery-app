import mongoose, { Document } from "mongoose";

export interface IMenu {
  // _id:mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface IMenuDocument extends IMenu, Document {
  updatedAt: Date;
  createdAt: Date;
}

const menuSchema = new mongoose.Schema<IMenuDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Menu = mongoose.model<IMenuDocument>("Menu", menuSchema);
export default Menu;
