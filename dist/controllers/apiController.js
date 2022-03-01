"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.login = exports.register = exports.ping = void 0;
const UserService = __importStar(require("../services/UserService"));
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;
        const newUser = yield UserService.createUser(email, password);
        if (newUser instanceof Error) {
            res.json({ error: 'Email already exist' });
            return;
        }
        else {
            res.status(201);
            res.json({ id: newUser.id });
            return;
        }
    }
    res.json({ error: 'Email and/or password not sent' });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;
        const user = yield UserService.findByEmail(email);
        if (user && UserService.matchPassword(password, user.password)) {
            res.json({ status: true });
            return;
        }
    }
    res.json({ status: false });
});
exports.login = login;
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let users = yield UserService.allUsers();
    let list = [];
    for (let i in users) {
        list.push(users[i].email);
    }
    res.json({ list });
});
exports.list = list;
