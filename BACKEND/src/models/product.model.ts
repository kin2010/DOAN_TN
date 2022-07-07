import { number, required } from "joi";
import { Document, model, Schema } from "mongoose";
export interface IProduct extends Document {
  name: string;
  description: string;
  trademark: string;
  price: number;
  detailImage: string[];
  avatar: string;
  stock: number;
  category: string;
  subCategory: string;
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
  tag: string;
  instruction: string;
}
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trademark: {
      type: "ObjectId",
      ref: "Trademark",
      required: true,
    },
    tag: {
      type: "ObjectId",
      ref: "Tag",
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      default: 999,
    },
    detailImage: [
      {
        type: String,
      },
    ],
    avatar: {
      type: String,
      required: true,
    },
    category: {
      type: "ObjectId",
      ref: "Category",
    },
    subCategory: {
      type: "ObjectId",
      ref: "SubCategory",
    },
    comments: [{ type: "ObjectId", ref: "Comment" }],
    instruction: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Product = model<IProduct>("Product", ProductSchema);
export default Product;
