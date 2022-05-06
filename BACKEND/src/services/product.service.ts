import httpStatus from 'http-status';
import { IProduct, Product } from '../models';
import APIError from '../utils/APIError';

export interface ICreateProductParams {
  name: string;
  description: string;
  trademark: string;
  price: number;
  detailImage: string[];
  avatar: string;
  category: string;
  subCategory: string;
}
export interface IGetOneProductParams {
  _id: string;
}
export class ProductService {
  static create = async ({
    name,
    description,
    trademark,
    price,
    detailImage,
    avatar,
    category,
    subCategory,
  }: ICreateProductParams): Promise<IProduct> => {
    const newProduct = await Product.create({
      name,
      description,
      trademark,
      price,
      detailImage,
      avatar,
      category,
      subCategory,
    });
    if (!newProduct) {
      throw new APIError({
        message: 'Cannot create product',
        status: httpStatus.BAD_REQUEST,
      });
    }
    return newProduct;
  };
  static getById = async ({ _id }: IGetOneProductParams): Promise<IProduct> => {
    const product = await Product.findById(_id).populate([
      {
        path: 'trademark',
        select: 'name',
      },
      {
        path: 'category',
        select: 'name description',
      },
      {
        path: 'subCategory',
        select: 'name description',
      },
    ]);

    if (!product) {
      throw new APIError({
        message: 'Product not found',
        status: httpStatus.BAD_REQUEST,
      });
    }
    return product;
  };
}
