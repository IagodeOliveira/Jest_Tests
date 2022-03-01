"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("./database"));
exports.sequelize = new sequelize_1.Sequelize(database_1.default.db, database_1.default.user, database_1.default.password, {
    dialect: 'postgres',
    port: parseInt(database_1.default.port)
});
