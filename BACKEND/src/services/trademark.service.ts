import { ITrademark, Trademark } from "../models";

export interface ITrademarkCreateParams {
  name: string;
  description: string;
}
export default class TrademarkService {
  static create = async ({
    name,
    description,
  }: ITrademarkCreateParams): Promise<ITrademark> => {
    const trade = await Trademark.create({ name, description });
    return trade;
  };
  static get = async (): Promise<ITrademark[]> => {
    const trades = await Trademark.find({});
    return trades;
  };
}
