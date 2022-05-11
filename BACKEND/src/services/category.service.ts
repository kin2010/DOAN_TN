import { Category, ICategory, ISubCategory, SubCategory } from '../models';
export interface ICategoryCreateParams {
  body: Omit<ICategory, 'createdAt' | 'updatedAt'>;
}
export interface ISubCategoryCreateParams {
  body: Omit<ISubCategory, 'createdAt' | 'updatedAt'>;
}

export default class CategoryService {
  static create = async ({
    body,
  }: ICategoryCreateParams): Promise<ICategory> => {
    const category = await Category.create({ ...body });
    return category;
  };
  static createSubCategory = async ({
    body,
  }: ISubCategoryCreateParams): Promise<ISubCategory> => {
    const subcategory = await SubCategory.create({ ...body });
    return subcategory;
  };
  static getAll = async (): Promise<ICategory[]> => {
    const categories = await Category.find({});
    return categories;
  };
  static getAllSub = async (): Promise<ISubCategory[]> => {
    const subCategories = await SubCategory.find({});
    return subCategories;
  };
}
