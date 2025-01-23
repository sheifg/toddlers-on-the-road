import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContextProps {
  register: (
    userData: IUser,
    navigate: (path: string) => void
  ) => Promise<void>;
  userInfo: ICurrentUser | null;
  login: (userData: IUser, navigate: (path: string) => void) => Promise<void>;
  logout: (navigate: (path: string) => void) => Promise<void>;
  updateUser: (userData: IUser, message: string) => Promise<void>;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

//TODO: after Sara finishs Authentication API
const BASE_URL = "https://......."

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [userInfo, setUserInfo] = useState<ICurrentUser | null>(() => {
        const storedUser = localStorage.getItem("user");
        return stored ?  JSON.parse(storedUser) : null;
    });
  
    return <AuthContext.Provider value={{register, login, logout, userInfo, updatedUser}}>
        {children}
    </AuthContext.Provider>

};

export const useAuth = (): IAuthContextProps => {
    useContext(AuthContext);
}


