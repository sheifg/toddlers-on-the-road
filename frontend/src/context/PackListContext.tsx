import { createContext, ReactNode, useContext, useState } from "react";
import { PackList } from "../types/profile";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

export interface PackListContextProps {
  loadPredefinedPackLists: () => Promise<void>;
  predefinedPackLists: PackList[];
}

const PackListContext = createContext<PackListContextProps | undefined>(
  undefined
);

export const PackListProvider = ({ children }: { children: ReactNode }) => {
  const [predefinedPackLists, setPredefinedPackLists] = useState<PackList[]>([]); // it holds just the original packList in home

  const loadPredefinedPackLists = async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/packlist`,
        method: "GET",
      });
      setPredefinedPackLists(data.data);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const value: PackListContextProps = {
    loadPredefinedPackLists,
    predefinedPackLists
  };

  return (
    <PackListContext.Provider value={value}>
      {children}
    </PackListContext.Provider>
  );
};

export const usePackListContext = () => useContext(PackListContext);
