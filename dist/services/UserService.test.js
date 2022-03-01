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
const User_1 = require("../models/User");
const UserService = __importStar(require("./UserService"));
describe('Testing form system', () => {
    let email = 'test@jest.com';
    let password = '1234';
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        //sincroniza com o DB e deleta qlq tabela q existir e cria depois
        yield User_1.User.sync({ force: true });
    }));
    // beforeEach(async () => {
    //   ...
    // });
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = (yield UserService.createUser(email, password));
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty('id');
        expect(newUser.email).toBe(email);
    }));
    it('should not allow to create a user with existing email', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield UserService.createUser(email, password);
        expect(newUser).toBeInstanceOf(Error);
    }));
    it('should find a user by email', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (yield UserService.findByEmail(email));
        expect(user.email).toBe(email);
    }));
    it('should match the password from database', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (yield UserService.findByEmail(email));
        const match = UserService.matchPassword(password, user.password);
        expect(match).toBeTruthy();
    }));
    it('should not match the password from database', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = (yield UserService.findByEmail(email));
        const match = UserService.matchPassword('invalid', user.password);
        expect(match).toBeFalsy();
    }));
    it('should get a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield UserService.allUsers();
        expect(users.length).toBeGreaterThanOrEqual(1);
        for (let i in users) {
            expect(users[i]).toBeInstanceOf(User_1.User);
        }
    }));
});
// export const Math = {
//   sum: (n1: number, n2: number) => {
//     return n1 + n2;
//   },
//   sub: (n1: number, n2: number) => {
//     return n1 - n2;
//   },
//   mut: (n1: number, n2: number) => {
//     return n1 * n2;
//   },
//   div: (n1: number, n2: number) => {
//     // return (n2 === 0) ? false : n1 / n2;
//     if(n2 === 0) {
//       throw 'Cannot divide a number by 0';
//     } else {
//       return n1 / n2;
//     }
//   }
// }
// describe('Testing Math library', () => {
// it('should sum two numbers correctly', () => {
//   const response = Math.sum(5, 10);
//   expect(response).toBe(15);
// });
// it('should subtract two numbers correctly', () => {
//   const response = Math.sub(4, 2);
//   expect(response).toBe(2);
// });
// it('should multiply two numbers correctly', () => {
//   const response = Math.mut(5, 7);
//   expect(response).toBe(35);
// });
// it.only('should divide two numbers correctly', () => {
//   const response = Math.div(5, 1);
//   expect(response).toBe(5);
//   const response2 = Math.div(5, 0);
//   expect(response2).toThrow(new Error('Cannot divide a number by 0'));
// });
// it.only('if has property email', () => {
//   const response = {
//     name: 'Bonieky',
//     email: 'superte@b7web.com.br'
//   }
//   expect(response).toHaveProperty('age');
// })
// it.only('if is email', () => {
//   const response = 'suporte@b7web.com.br';
//   expect(response).toMatch(/([a-z]{2,})@([a-z0-9]{1,})\.([a-z]{1,})(\.[a-z]{2,})?/);
// })
// });
