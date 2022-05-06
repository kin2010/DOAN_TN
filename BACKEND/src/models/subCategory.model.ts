import { Document, Schema, model } from 'mongoose';
export interface ISubCategory extends Document {
  name: string;
  categoryId: string;
  description: string;
}
const SubCategoryShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  categoryId: {
    type: 'ObjectId',
    ref: 'Category',
  },
});
const subCategory = model<ISubCategory>('SubCategory', SubCategoryShema);
export default subCategory;
