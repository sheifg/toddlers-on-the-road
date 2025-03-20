import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IForgotPassword, IResetPassword } from "../types/context";
import axios from "axios";
import { BASE_URL } from "../constants";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../utils/storage";
import { ICurrentUser, IUser } from "../types/user";
axios.defaults.withCredentials = true;
export interface AuthContextProps {
  register: (userData: IUser) => Promise<ICurrentUser>;
  userInfo: ICurrentUser | null;
  setUserInfo: React.Dispatch<React.SetStateAction<ICurrentUser | null>>;
  login: (userData: IUser) => Promise<ICurrentUser>;
  logout: () => Promise<void>;
  forgotPassword: (forgotPasswordData: IForgotPassword) => Promise<void>;
  resetPassword: (
    resetPasswordData: IResetPassword,
    resetToken: string
  ) => Promise<void>;
  updateRememberMe: (value: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<ICurrentUser | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  // Check authentication only once after the initial render of the functional component(when the component mounts)
  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = getStorageItem("user");
    // If user found in localStorage, they previously used "remember me"
    if (storedUser && window.localStorage.getItem("user")) {
      setRememberMe(true);
    }
    // If a user is stored locally but not yet loaded into the component's state, restore the user information from local storage
    if (storedUser && !userInfo) {
      setUserInfo(storedUser);
    }
  }, []);

  // Update storage when userInfo changes
  useEffect(() => {
    if (userInfo) {
      // Save user information in localStorage when rememberme true ,if it is fales store it in session
      setStorageItem("user", userInfo, rememberMe);
    } else {
      // Clear localStorage and session , when userInfo is null (user logged out)
      removeStorageItem("user");
    }
  }, [userInfo, rememberMe]); // TODO Check firebase [userInfo,firebaseToken]

  // Add this function to your context
  const updateRememberMe = (value: boolean) => {
    setRememberMe(value);
  };

  // Register function
  const register = async (userData: IUser) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/auth/register/`,
        method: "POST",
        data: userData,
        withCredentials: true,
      });
      const user = {
        token: data.token,
        ...data.user,
      };
      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Login function
  const login = async (userData: IUser) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/auth/login/`,
        method: "POST",
        data: userData,
        withCredentials: true, // Make sure credentials (cookies) are included
      });
      const user = {
        token: data.token,
        ...data.user,
      };
      // for remember me

      return Promise.resolve(user);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/auth/logout/`,
        method: "GET",
        withCredentials: true,
      });
      return Promise.resolve(data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const forgotPassword = async (forgotPasswordData: IForgotPassword) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/auth/forgot-password`,
        method: "POST",
        data: forgotPasswordData,
      });
      return Promise.resolve(data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const resetPassword = async (
    resetPasswordData: IResetPassword,
    resetToken: string
  ) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/auth/reset-password/${resetToken}`,
        method: "POST",
        data: resetPasswordData,
      });
      return Promise.resolve(data.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        userInfo,
        setUserInfo,
        logout,
        resetPassword,
        forgotPassword,
        updateRememberMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
