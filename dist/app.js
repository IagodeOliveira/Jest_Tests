"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// import cors from 'cors';
// import passport from 'passport';
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
const server = (0, express_1.default)();
// server.use(cors());
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
console.log(path_1.default.resolve('abcd', '/bcd'));
server.use(express_1.default.urlencoded({ extended: true }));
// server.use(passport.initialize());
server.get('/ping', (req, res) => res.json({ pong: true }));
server.use(api_1.default);
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});
const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status);
    }
    else {
        res.status(400);
    }
    if (err.message) {
        res.json({ error: err.message });
    }
    else {
        res.json({ error: 'Ocorreu algum erro.' });
    }
};
server.use(errorHandler);
// server.listen(process.env.PORT);
//para Supertest
exports.default = server;
