"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./middleware/error");
const user_route_1 = __importDefault(require("./routes/user.route"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
const layout_routes_1 = __importDefault(require("./routes/layout.routes"));
const cron_1 = __importDefault(require("./config/cron"));
if (process.env.NODE_ENV === "production")
    cron_1.default.start();
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: ['https://learning-management-system-5dmbcpyrc.vercel.app/'],
    credentials: true
}));
// routers
exports.app.use("/api/v1", user_route_1.default);
exports.app.use("/api/v1", course_routes_1.default);
exports.app.use("/api/v1", order_routes_1.default);
exports.app.use("/api/v1", notification_routes_1.default);
exports.app.use("/api/v1", analytics_routes_1.default);
exports.app.use("/api/v1", layout_routes_1.default);
exports.app.get('/', (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    });
});
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
exports.app.use(error_1.ErrorMiddleware);
