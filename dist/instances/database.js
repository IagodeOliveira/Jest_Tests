"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let db = {
    db: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
};
if (process.env.NODE_ENV === 'test') {
    db = {
        db: process.env.PG_TEST_DB,
        user: process.env.PG_TEST_USER,
        password: process.env.PG_TEST_PASSWORD,
        port: process.env.PG_TEST_PORT
    };
}
exports.default = db;
