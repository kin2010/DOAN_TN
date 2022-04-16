import { Document, model, Schema } from 'mongoose';

export interface IVerify extends Document {
  otp: string;
  email?: string;
  phone?: string;
  verifiedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  expriedAt: Date;
}
const VerifySchema = new Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    verifiedAt: {
      type: Date,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);
const Verify = model<IVerify>('Verify', VerifySchema);
export default Verify;
