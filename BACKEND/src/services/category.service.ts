import httpStatus from "http-status";
import { Category, ICategory, ISubCategory, SubCategory } from "../models";
import APIError from "../utils/APIError";
export interface ICategoryCreateParams {
  body: Omit<ICategory, "createdAt" | "updatedAt">;
}
export interface ISubCategoryCreateParams {
  body: Omit<ISubCategory, "createdAt" | "updatedAt">;
}
export interface IBodyUpdate {
  categoryId: string;
  body: Omit<ICategory, "createdAt" | "updatedAt">;
}
export interface IBodyUpdateSub {
  categoryId: string;
  body: Omit<ISubCategory, "createdAt" | "updatedAt">;
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
  static update = async ({
    body,
    categoryId,
  }: IBodyUpdate): Promise<ICategory> => {
    const categoryUpdate = await Category.find({ categoryId });
    if (!categoryUpdate) {
      throw new APIError({
        message: "Can not update category",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    const productUpdated = await Category.findByIdAndUpdate(categoryId, body, {
      new: true,
    });
    if (!productUpdated) {
      throw new APIError({
        message: "Can not update order",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    return productUpdated;
  };
  static updateSub = async ({
    body,
    categoryId,
  }: IBodyUpdateSub): Promise<ISubCategory> => {
    const categoryUpdate = await SubCategory.find({ categoryId });
    if (!categoryUpdate) {
      throw new APIError({
        message: "Can not update Subcategory",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    const productUpdated = await SubCategory.findByIdAndUpdate(
      categoryId,
      body,
      {
        new: true,
      }
    );
    if (!productUpdated) {
      throw new APIError({
        message: "Can not update order",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
    return productUpdated;
  };
}
