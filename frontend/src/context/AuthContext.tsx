import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ICurrentUser, IUser } from "../types/context";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from "../utils/storage";

interface AuthContextProps {
  register: (
    userData: IUser,
    navigate: (path: string) => void
  ) => Promise<void>;
  userInfo: ICurrentUser | null;
  login: (userData: IUser, navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  // updateUser: (userData: IUser, message: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userInfo, setUserInfo] = useState<ICurrentUser | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (userInfo) {
      // localStorage.setItem("user", JSON.stringify(userInfo));
      setStorageItem("user", userInfo);
    } else {
      // localStorage.removeItem("user");
      removeStorageItem("user");
    }
  }, [userInfo]);

  useEffect(() => {
    // const storedUser = localStorage.getItem("user");
    const storedUser = getStorageItem("user");

    if (storedUser && !userInfo) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  // Register function
  const register = async (
    userData: IUser,
    navigate: (path: string) => void
  ) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/auth/register/`,
        method: "POST",
        data: userData,
      });
      const user = {
        token: data.token,
        ...data.user,
      };
      setUserInfo(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("User registered successfully!");
      navigate("/");
      //TODO: check to navigate previous click and try to implement it!
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Login function
  const login = async (userData: IUser, navigate: (path: string) => void) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/auth/login/`,
        method: "POST",
        data: userData,
      });
      const user = {
        token: data.token,
        ...data.user,
      };
      setUserInfo(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");
      navigate("/");
      //TODO: check to navigate previous click and try to implement it!
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const logout = async (navigate: (path: string) => void) => {
    try {
      await axios({
        url: `${BASE_URL}/api/auth/logout/`,
        method: "GET",
        headers: {
          Authorization: `Token ${userInfo?.token}`,
        },
      });
      setUserInfo(null);
      localStorage.removeItem("user");
      navigate("/auth/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, userInfo, logout }}>
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
