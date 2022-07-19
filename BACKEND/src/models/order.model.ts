import { boolean } from "joi";
import { Document, Schema, model } from "mongoose";

export interface IOrder extends Document {
  totalPrice: number;
  deliveryAddress: string;
  product: string[];
  user: string;
  currentAddress: string;
  status: IOrderStatus;
  note: string;
  currentLocation: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  paidTime: string;
  payment: string;
  deliveryTime: string;
}

export type IOrderStatus =
  | typeof ORDER_STATUS.PENDING
  | typeof ORDER_STATUS.SHIPPING
  | typeof ORDER_STATUS.DONE
  | typeof ORDER_STATUS.PAID
  | typeof ORDER_STATUS.OVER;

export const ORDER_STATUS = {
  PENDING: "pending",
  SHIPPING: "shipping",
  DONE: "done",
  OVER: "over",
  PAID: "paid",
  NOTPAID: "not_paid",
};

const ProductSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    deliveryAddress: {
      type: String,
    },
    payment: {
      type: String,
    },
    product: [
      {
        type: "ObjectId",
        ref: "Product",
      },
    ],
    user: {
      type: "ObjectId",
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        ORDER_STATUS.PENDING,
        ORDER_STATUS.SHIPPING,
        ORDER_STATUS.DONE,
        ORDER_STATUS.PAID,
        ORDER_STATUS.OVER,
        ORDER_STATUS.NOTPAID,
      ],
    },
    paidTime: {
      type: String,
    },
    deliveryTime: {
      type: String,
    },
    currentLocation: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    currentAddress: {
      type: String,
    },
    note: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", ProductSchema);
export default Order;
