export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  packLists: [];
  rememberMe?: boolean;
}

export interface ICurrentUser extends IUser {
  token: string;
  refreshToken?: string;
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export type IUpdatePersonalDetails = Pick<
  IUser,
  "first_name" | "last_name" | "email"
>;
