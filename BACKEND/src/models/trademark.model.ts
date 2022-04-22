import { required } from 'joi';
import { Schema, Document, model } from 'mongoose';

export interface ITrademark extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
const TrademarkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);
const Trademark = model<ITrademark>('Trademark', TrademarkSchema);
export default Trademark;
