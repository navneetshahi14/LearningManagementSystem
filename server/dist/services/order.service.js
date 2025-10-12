"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrderService = exports.newOrder = void 0;
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const order_model_1 = __importDefault(require("../model/order.model"));
exports.newOrder = (0, catchAsyncError_1.CatchAsyncError)(async (data) => {
    const order = await order_model_1.default.create(data);
    return order;
});
const getAllOrderService = async (res) => {
    const order = await order_model_1.default.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        order,
    });
};
exports.getAllOrderService = getAllOrderService;
