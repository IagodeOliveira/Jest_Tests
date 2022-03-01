import { User } from "../models/User";
import bcrypt from 'bcrypt';

export const createUser = async (email: string, password: string) => {
  let hasUser = await User.findOne({ where: { email } });
  if(!hasUser) {
    const hash = bcrypt.hashSync(password, 10);
    let newUser = await User.create({ email, password: hash });
    return newUser;
  } else {
    return new Error('Email already exist');
  }
};

export const findByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const matchPassword = (
  passwordText: string,
  encrypted: string
) => {
  return bcrypt.compareSync(passwordText, encrypted);
};

export const allUsers = async () => {
  return await User.findAll();
};