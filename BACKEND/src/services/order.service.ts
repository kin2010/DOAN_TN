import httpStatus from "http-status";
import { IOrder, IUser, Order, User } from "../models";
import Bill from "../models/bill.model";
import APIError from "../utils/APIError";
import log from "../utils/logger";
import payMomo from "../utils/MomoPayment";

interface Pagination {
  limit: number;
  skip: number;
}
interface IUpdateOrderParams {
  orderId: string;
  body: Omit<IOrder, "createdAt" | "updatedAt">;
}

interface IGetOrderParams {
  pagination: Pagination;
}

interface IGetOrderByUserParams {
  userId: string;
  pagination: Pagination;
}
interface IPaymentOrderParams {
  orderId: string;
}
interface INotification {
  message: string;
  requestId: string;
}
export type IOrderCreateParams = Omit<IOrder, "createdAt" | "updatedAt">;
export default class OrderService {
  static create = (order: IOrderCreateParams): Promise<IOrder> => {
    return Order.create({ ...order });
  };
  static update = async ({
    body,
    orderId,
  }: IUpdateOrderParams): Promise<IOrder> => {
    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      throw new APIError({
        message: "Order not found",
        status: httpStatus.NOT_FOUND,
      });
    }
    const order = await Order.findById(orderId);

    if (!order) {
      throw new APIError({
        message: "Order not found",
        status: httpStatus.NOT_FOUND,
      });
    }

    const productUpdated = await Order.findByIdAndUpdate(orderId, body, {
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

  static getAll = async ({
    pagination,
  }: IGetOrderParams): Promise<IOrder[]> => {
    const { limit, skip } = pagination;
    return Order.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "product",
          select: "name price trademark avatar ",
          // select: 'name price category avatar photos',
          populate: [
            {
              path: "trademark",
              select: "name",
            },
          ],
        },
        {
          path: "user",
          select: "fullName",
        },
      ])
      .lean();
  };

  static getByUser = async ({
    userId,
    pagination,
  }: IGetOrderByUserParams): Promise<IOrder[]> => {
    const user = User.find({ _id: userId });
    if (!user || userId === "") {
      throw new APIError({
        message: "User not found",
        status: httpStatus.NOT_FOUND,
      });
    }
    const { limit, skip } = pagination;
    return Order.find({ user: userId })
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "product",
          select: "name price trademark avatar ",
          populate: [
            {
              path: "trademark",
              select: "name",
            },
          ],
        },
        {
          path: "user",
          select: "avatar fullName address gender address phone role",
          populate: [{ path: "role", select: "roleName" }],
        },
      ])
      .lean();
  };
  static paymentMomo = async ({
    orderId,
  }: IPaymentOrderParams): Promise<{ payUrl: unknown }> => {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new APIError({
        message: "Order not found",
        status: httpStatus.NOT_FOUND,
      });
    }

    const payUrl = await payMomo(order._id);
    return { payUrl };
  };

  static paymentNotification = async ({
    message,
    requestId,
  }: INotification): Promise<void> => {
    const bill = await Bill.findOne({ requestId });

    if (message === "success") {
      await Order.findOneAndUpdate({ _id: bill?.order }, { status: "paid" });
    }
  };
}
