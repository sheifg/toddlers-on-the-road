import { IUser } from "./user";

export interface IResetPassword {
  new_password: string;
  confirm_password: string
}

export type IForgotPassword = Pick<IUser, 'email' >





