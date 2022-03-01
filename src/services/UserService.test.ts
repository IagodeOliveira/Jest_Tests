import { User, UserInstance } from '../models/User';
import * as UserService from './UserService';

describe('Testing form system', () => {
  let email = 'test@jest.com';
  let password = '1234';
  beforeAll(async () => {
    //syncs with database and deletes then recreates every table
    await User.sync({ force: true });
  });

  // beforeEach(async () => {
  //   ...
  // });

  it('should create a new user', async () => {
    const newUser = (await UserService.createUser(
      email,
      password
    )) as UserInstance;
    expect(newUser).not.toBeInstanceOf(Error);
    expect(newUser).toHaveProperty('id');
    expect(newUser.email).toBe(email);
  });

  it('should not allow to create a user with existing email', async () => {
    const newUser = await UserService.createUser(email, password);
    expect(newUser).toBeInstanceOf(Error);
  });

  it('should find a user by email', async () => {
    const user = (await UserService.findByEmail(email)) as UserInstance;
    expect(user.email).toBe(email);
  });

  it('should match the password from database', async () => {
    const user = (await UserService.findByEmail(email)) as UserInstance;
    const match = UserService.matchPassword(password, user.password);
    expect(match).toBeTruthy();
  });

  it('should not match the password from database', async () => {
    const user = (await UserService.findByEmail(email)) as UserInstance;
    const match = UserService.matchPassword('invalid', user.password);
    expect(match).toBeFalsy();
  });

  it('should get a list of users', async () => {
    const users = await UserService.allUsers();
    expect(users.length).toBeGreaterThanOrEqual(1);
    for (let i in users) {
      expect(users[i]).toBeInstanceOf(User);
    }
  });
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
