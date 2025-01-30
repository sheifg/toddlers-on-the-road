export interface IUser {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}

export interface ICurrentUser extends IUser {
  token: string;
}

export interface IResetPassword {
  new_password: string;
}

export interface IForgotPassword {
  email: string;
}

