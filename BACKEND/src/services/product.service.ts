import httpStatus from "http-status";
import { IProduct, Product } from "../models";
import APIError from "../utils/APIError";
import log from "../utils/logger";

export interface ICreateProductParams {
  name: string;
  description: string;
  trademark: string;
  price: number;
  detailImage: string[];
  avatar: string;
  category: string;
  subCategory: string;
  instruction: string;
  stock: number;
  tag: string;
}
interface IProductConditionGetAll {
  category?: string;
  subCategory?: string;
}
export interface IGetOneProductParams {
  _id: string;
}
export interface IGetAllProductParams {
  query: {
    limit: number;
    skip: number;
  };
  category: string;
  subCategory: string;
}
interface IUpdateProductParams {
  productId: string;
  body: Omit<IProduct, "createdAt" | "updatedAt">;
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
    instruction,
    stock,
    tag,
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
      instruction,
      stock,
      tag,
    });
    if (!newProduct) {
      throw new APIError({
        message: "Cannot create product",
        status: httpStatus.BAD_REQUEST,
      });
    }
    return newProduct.populate([
      {
        path: "trademark",
        select: "name",
      },
      {
        path: "category",
        select: "name description",
      },
      {
        path: "subCategory",
        select: "name description",
      },
      {
        path: "comments",
        select: "name comment rating avatar createdAt",
      },
      {
        path: "tag",
        select: "name color",
      },
    ]);
  };
  static getById = async ({ _id }: IGetOneProductParams): Promise<IProduct> => {
    const product = await Product.findById(_id).populate([
      {
        path: "trademark",
        select: "name",
      },
      {
        path: "category",
        select: "name description",
      },
      {
        path: "subCategory",
        select: "name description",
      },
      {
        path: "comments",
        select: "name comment rating avatar createdAt",
      },
      {
        path: "tag",
        select: "name color",
      },
    ]);

    if (!product) {
      throw new APIError({
        message: "Product not found",
        status: httpStatus.BAD_REQUEST,
      });
    }
    return product;
  };
  static getAll = async ({
    query,
    category,
    subCategory,
  }: IGetAllProductParams): Promise<IProduct[]> => {
    const productConditions: IProductConditionGetAll = {};
    if (category) {
      productConditions.category = category;
    }
    if (subCategory) {
      productConditions.subCategory = subCategory;
    }
    const { skip, limit } = query;
    const products = await Product.find({ ...productConditions })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "trademark",
          select: "name",
        },
        {
          path: "category",
          select: "name",
        },
        {
          path: "subCategory",
          select: "name",
        },
        {
          path: "tag",
          select: "name color",
        },
        {
          path: "comments",
          select: "name comment rating avatar createdAt",
        },
      ]);

    return products;
  };
  static update = async ({
    body,
    productId,
  }: IUpdateProductParams): Promise<IProduct> => {
    const shop = await Product.findById(productId);

    if (!shop) {
      throw new APIError({
        message: "Product not found",
        status: httpStatus.NOT_FOUND,
      });
    }

    const productUpdated = await Product.findByIdAndUpdate(productId, body, {
      new: true,
    });

    if (!productUpdated) {
      throw new APIError({
        message: "Can not update order",
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }

    return productUpdated.populate([
      {
        path: "trademark",
        select: "name",
      },
      {
        path: "category",
        select: "name description",
      },
      {
        path: "subCategory",
        select: "name description",
      },
      {
        path: "comments",
        select: "name comment rating avatar createdAt",
      },
      {
        path: "tag",
        select: "name color",
      },
    ]);
  };
}
