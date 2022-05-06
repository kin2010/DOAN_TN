import { Document, Schema, model } from 'mongoose';
export interface ICategory extends Document {
  name: string;
  description: string;
}

const CategoryShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});
const Category = model<ICategory>('Category', CategoryShema);
export default Category;
