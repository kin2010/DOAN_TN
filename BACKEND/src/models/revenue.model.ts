import { number } from "joi";
import { Document, Schema, model } from "mongoose";
type ObjectRevenue = {
  date: string;
  revenue: string;
  dateEnd: string;
  order: Object;
};
export interface IRevenue extends Document {
  revenue: string;
  createdAt: Date;
  updatedAt: Date;
  orders: string[];
  data: ObjectRevenue[];
  findByDay: (startTime: string, endTime: string) => Promise<number>;
}

const RevenueShema = new Schema(
  {
    revenue: {
      type: Number,
    },
    orders: [{ type: "ObjectId", ref: "Order" }],
    data: [{ type: Object }],
  },
  { timestamps: true }
);

const Revenue = model<IRevenue>("Revenue", RevenueShema);

export default Revenue;
