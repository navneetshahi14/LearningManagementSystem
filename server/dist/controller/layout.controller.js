"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayout = exports.editLayout = exports.createLayout = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncError_1 = require("../middleware/catchAsyncError");
const layout_model_1 = __importDefault(require("../model/layout.model"));
const cloudinary_1 = __importDefault(require("cloudinary"));
// import { title } from "process";
exports.createLayout = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        const isTypeExist = await layout_model_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default(`${type} already exist`, 400));
        }
        if (type === 'Banner') {
            const { image, title, subTitle } = req.body;
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout"
            });
            const banner = {
                type: "Banner",
                banner: {
                    image: {
                        public_id: myCloud.public_id,
                        url: myCloud.secure_url
                    },
                    title,
                    subTitle
                },
            };
            const data = await layout_model_1.default.create(banner);
        }
        if (type === 'FAQ') {
            const { faqdata } = req.body;
            const FaqItems = await Promise.all(faqdata.map(async (item) => {
                return {
                    question: item.question,
                    answer: item.answer
                };
            }));
            await layout_model_1.default.create({ type: "FAQ", faq: FaqItems });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesItems = await Promise.all(categories.map(async (item) => {
                return {
                    title: item.title
                };
            }));
            await layout_model_1.default.create({ type: "Categories", categories: categoriesItems });
        }
        res.status(200).json({
            success: true,
            message: "Successfully created"
        });
    }
    catch (error) {
        console.log(error.message);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.editLayout = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        if (type === 'Banner') {
            const bannarData = await layout_model_1.default.findOne({ type: "Banner" });
            const { image, title, subTitle } = req.body;
            const data = image.startsWith('https')
                ? bannarData : await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout"
            });
            console.log(data);
            if (bannarData) {
                await cloudinary_1.default.v2.uploader.destroy(bannarData?.image.public_id);
            }
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout"
            });
            console.log("My Cloud", myCloud);
            const banner = {
                type: "Banner",
                image: {
                    public_id: image.startsWith('https') ? bannarData.banner.image.public_id : data.public_id,
                    url: image.startsWith('https') ? bannarData.banner.image.url : data.secure_url
                },
                title,
                subTitle
            };
            await layout_model_1.default.findByIdAndUpdate(bannarData._id, { banner });
        }
        if (type === 'FAQ') {
            const { faqdata } = req.body;
            const faqitem = await layout_model_1.default.findOne({ type: "FAQ" });
            const FaqItems = await Promise.all(faqdata.map(async (item) => {
                return {
                    question: item.question,
                    answer: item.answer
                };
            }));
            await layout_model_1.default.findByIdAndUpdate(faqitem?._id, { type: "FAQ", faq: FaqItems });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const categoryItem = await layout_model_1.default.findOne({ type: "Categories" });
            const categoriesItems = await Promise.all(categories.map(async (item) => {
                return {
                    title: item.title
                };
            }));
            await layout_model_1.default.findByIdAndUpdate(categoryItem?._id, { type: "Categories", categories: categoriesItems });
        }
        res.status(200).json({
            success: true,
            message: "Successfully Updated"
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
exports.getLayout = (0, catchAsyncError_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.params;
        const layout = await layout_model_1.default.findOne({ type });
        res.status(200).json({
            success: true,
            layout
        });
    }
    catch (err) {
        return next(new ErrorHandler_1.default(err.message, 500));
    }
});
