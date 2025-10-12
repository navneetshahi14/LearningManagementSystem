"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleService = exports.getAllUsers = exports.getUserById = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
const redis_1 = require("../utils/redis");
const getUserById = async (id, res) => {
    const userjson = await redis_1.redis.get(id);
    if (userjson) {
        const user = JSON.parse(userjson);
        res.status(201).json({
            success: true,
            user
        });
    }
};
exports.getUserById = getUserById;
const getAllUsers = async (res) => {
    const users = await user_model_1.default.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        users
    });
};
exports.getAllUsers = getAllUsers;
const updateUserRoleService = async (res, id, role) => {
    const user = await user_model_1.default.findByIdAndUpdate(id, { role }, { new: true });
    res.status(201).json({
        success: true,
        user
    });
};
exports.updateUserRoleService = updateUserRoleService;
