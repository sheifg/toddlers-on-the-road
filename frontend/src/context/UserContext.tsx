import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
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
  ) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { userInfo, setUserInfo } = useAuth();

  const changePassword = async (changePasswordData: IChangePassword) => {
    try {
      await axios({
        url: `${BASE_URL}/api/users/change-password`,
        method: "PUT",
        data: { user_id: userInfo?._id, ...changePasswordData },
      });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
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
      await axios({
        url: `${BASE_URL}/api/users/update-personal-details`,
        method: "PUT",
        data: updatedPersonalDetails,
      });
      setUserInfo(updatedPersonalDetails);
      toast.success("Update personal details successfully!");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const deleteAccount = async () => {
    try {
      await axios({
        url: `${BASE_URL}/api/users/delete-account/${userInfo?._id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      toast.success("Delete user account successfully!");
      setUserInfo(null);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
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
