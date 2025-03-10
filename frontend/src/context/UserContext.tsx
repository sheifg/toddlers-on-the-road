import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "./AuthContext";
import { BASE_URL } from "../constants";
import axios from "axios";
import {
  IChangePassword,
  ICurrentUser,
  IUpdatePersonalDetails,
} from "../types/user";

export interface UserContextProps {
  changePassword: (changePasswordData: IChangePassword) => Promise<void>;
  updatePersonalDetails: (
    updateValues: IUpdatePersonalDetails
  ) => Promise<ICurrentUser>;
  deleteAccount: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { userInfo } = useAuth();

  const changePassword = async (changePasswordData: IChangePassword) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/users/change-password`,
        method: "PUT",
        data: { user_id: userInfo?._id, ...changePasswordData },
      });
      return Promise.resolve(data.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const updatePersonalDetails = async (
    updatedValues: IUpdatePersonalDetails
  ) => {
    const updatedPersonalDetails = {
      ...(userInfo as ICurrentUser),
      ...updatedValues,
    };
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/users/update-personal-details`,
        method: "PUT",
        data: updatedPersonalDetails,
      });
      console.log("data:", data);
      return Promise.resolve(data.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const deleteAccount = async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/users/delete-account/${userInfo?._id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      return Promise.resolve(data.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const value: UserContextProps = {
    changePassword,
    updatePersonalDetails,
    deleteAccount,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
