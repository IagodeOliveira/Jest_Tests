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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const User_1 = require("../models/User");
describe('Testing api routes', () => {
    let email = 'test@jest.com';
    let password = '1234';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //sincroniza com o DB e deleta qlq tabela q existir e cria depois
        yield User_1.User.sync({ force: true });
    }));
    it('should ping pong', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/ping')
            .then(response => {
            expect(response.body.pong).toBeTruthy();
            return done();
        });
    });
    //register
    it('should register a new user', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then(response => {
            expect(response.body.error).toBeUndefined();
            expect(response.body).toHaveProperty('id');
            return done();
        });
    });
    it('should not allow to register with existing email', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then(response => {
            expect(response.body.error).not.toBeUndefined();
            return done();
        });
    });
    it('should not allow to register without password', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send(`email=${email}`)
            .then(response => {
            expect(response.body.error).not.toBeUndefined();
            return done();
        });
    });
    it('should not allow to register without email', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send(`password=${password}`)
            .then(response => {
            expect(response.body.error).not.toBeUndefined();
            return done();
        });
    });
    it('should not allow to register without data', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send()
            .then(response => {
            expect(response.body.error).not.toBeUndefined();
            return done();
        });
    });
    // login
    it('should login correctly', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send(`email=${email}&password=${password}`)
            .then(response => {
            expect(response.body.error).toBeUndefined();
            expect(response.body.status).toBeTruthy();
            return done();
        });
    });
    it('should not login with incorrect data', (done) => {
        (0, supertest_1.default)(app_1.default)
            .post('/login')
            .send(`email=${email}&password=invalid`)
            .then(response => {
            expect(response.body.error).toBeUndefined();
            expect(response.body.status).toBeFalsy();
            return done();
        });
    });
    //list
    it('should list users', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get('/list')
            .then(response => {
            expect(response.body.error).toBeUndefined();
            expect(response.body.list.length).toBeGreaterThanOrEqual(1);
            expect(response.body.list).toContain(email);
            return done();
        });
    });
});
