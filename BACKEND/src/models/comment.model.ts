import { Document, model, Schema } from "mongoose";

export interface IComment extends Document {
  productId: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
const CommentSchema = new Schema(
  {
    productId: { require: true, type: String },
    name: { type: String, require: true },
    rating: { type: Number, require: true },
    comment: { type: String },

    avatar: { type: String },
  },
  { timestamps: true }
);
const Comment = model<IComment>("Comment", CommentSchema);
export default Comment;
