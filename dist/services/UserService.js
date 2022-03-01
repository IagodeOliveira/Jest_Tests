"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = exports.matchPassword = exports.findByEmail = exports.createUser = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let hasUser = yield User_1.User.findOne({ where: { email } });
    if (!hasUser) {
        const hash = bcrypt_1.default.hashSync(password, 10);
        let newUser = yield User_1.User.create({ email, password: hash });
        return newUser;
    }
    else {
        return new Error('Email already exist');
    }
});
exports.createUser = createUser;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.findOne({ where: { email } });
});
exports.findByEmail = findByEmail;
const matchPassword = (passwordText, encrypted) => {
    return bcrypt_1.default.compareSync(passwordText, encrypted);
};
exports.matchPassword = matchPassword;
const allUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.findAll();
});
exports.allUsers = allUsers;
