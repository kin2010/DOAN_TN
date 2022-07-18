import httpStatus from "http-status";
import { Order } from "../models";
import Revenue from "../models/revenue.model";
import APIError from "../utils/APIError";
import log from "../utils/logger";
import {
  format,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  endOfDay,
  addWeeks,
  subWeeks,
  startOfYear,
  endOfMonth,
  endOfYear,
  addMonths,
  startOfMonth,
} from "date-fns";
export interface IRevenueGetWeek {
  startTime: string;
}

export default class RevenueServices {
  static getByWeek = async ({ startTime }: IRevenueGetWeek) => {
    if (!startTime) {
      throw new APIError({
        message: "Time is not defined",
        status: httpStatus.NOT_FOUND,
      });
    }
    const startWeek = startOfWeek(new Date(startTime), { weekStartsOn: 1 });
    const endWeek = lastDayOfWeek(new Date(startTime), { weekStartsOn: 1 });
    let day = startWeek;
    const dateFormat = "d";
    let formattedDate = "";
    let preDate = startWeek;
    let rs = [];
    let count = 0;
    log.info(startWeek.toString());
    log.info(endWeek.toString());
    const endW = addDays(new Date(endWeek), 1);
    while (day <= endW) {
      if (count > 0) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        // log.info(preDate.toString());
        // log.info(cloneDay.toString());
        const orders = await Order.find({
          isPaid: true,
          createdAt: {
            //new Date(endOfDay(new Date(preDate)))
            $gte: new Date(preDate),
            $lt: new Date(cloneDay),
          },
        });
        // log.info(orders);
        const revenue = await orders.reduce((pre, cur) => {
          return pre + cur?.totalPrice;
        }, 0);
        rs.push({
          date: preDate,
          revenue: revenue,
          dateEnd: cloneDay,
          order: orders,
        });
      }
      count++;
      preDate = day;
      day = addDays(day, 1);
    }

    await Revenue.create({
      data: rs,
    });
    return rs;
    // log.info(endWeek.toString());
    const orders = await Order.find({
      isPaid: true,
      createdAt: { $gte: new Date(startTime), $lt: new Date(startTime) },
    })
      .populate([
        {
          path: "orders",
          select: "_id totalPrice paidTime",
        },
      ])
      .lean();
    log.info("ozz", orders[0].totalPrice);
    const revenue = await orders.reduce((pre, cur) => {
      return pre + cur?.totalPrice;
    }, 0);
    if (orders.length > 0) {
      const idOrder = orders?.map((order) => order?._id);
      const rev = await Revenue.create({
        orders: [...idOrder],
        revenue: revenue,
      });
      if (!rev) {
        throw new APIError({
          message: "Error when create Revenue",
          status: httpStatus.NOT_FOUND,
        });
      }
      return rev;
      // console.log(rev);
    }

    return 0;
  };
  static getByYear = async ({ startTime }: IRevenueGetWeek) => {
    if (!startTime) {
      throw new APIError({
        message: "Time is not defined",
        status: httpStatus.NOT_FOUND,
      });
    }
    const startYear = startOfYear(new Date(startTime));
    const endYear = endOfYear(new Date(startTime));
    let startY = startYear;
    const rs = [];
    while (startY <= endYear) {
      const startMonth = startY;
      const endMonth = endOfMonth(new Date(startMonth));
      log.info("start");
      log.info(startMonth.toString());
      log.info("end");
      log.info(endMonth.toString());
      const orders = await Order.find({
        isPaid: true,
        createdAt: {
          //new Date(endOfDay(new Date(preDate)))
          $gte: new Date(startMonth),
          $lt: new Date(endMonth),
        },
      });
      log.info(orders);
      const revenue = await orders.reduce((pre, cur) => {
        return pre + cur?.totalPrice;
      }, 0);
      rs.push({
        revenue: revenue,
        date: startMonth,
        dateEnd: endMonth,
        order: orders,
      });
      const nextMonth = startOfMonth(new Date(addMonths(startMonth, 1)));
      startY = nextMonth;
    }
    await Revenue.create({
      data: rs,
    });
    return rs;
  };
}
// {
//   "startTime":"2022-07-15T00:00:00.000Z",
//   "endTime":"2022-07-17T15:03:49.085Z"
// }
