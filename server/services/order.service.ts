import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import OrderModel from "../model/order.model";

export const newOrder = CatchAsyncError(
  async (data: any) => {
    const order = await OrderModel.create(data);
    return order
  }
);

export const getAllOrderService = async (res: Response) => {
  const order = await OrderModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    order,
  });
};
