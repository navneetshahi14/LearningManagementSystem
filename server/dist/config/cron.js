"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const https_1 = __importDefault(require("https"));
const job = new cron_1.CronJob("*/14 * * * *", () => {
    https_1.default
        .get(process.env.API_URL, (res) => {
        if (res.statusCode === 200)
            console.log("Get Request sent successfully");
        else
            console.log("Get request failed", res.statusCode);
    })
        .on("error", (e) => console.error("Error while sending request", e));
});
exports.default = job;
