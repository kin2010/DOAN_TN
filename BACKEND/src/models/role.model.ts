import { timeStamp } from 'console';
import { Document, Schema, model } from 'mongoose';
export interface IRole extends Document {
  roleName: string;
  createdAt: Date;
  updateAt: Date;
}

const RoleSchema = new Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const Role = model<IRole>('Role', RoleSchema);
export default Role;
