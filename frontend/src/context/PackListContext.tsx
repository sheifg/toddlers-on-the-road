import { createContext, ReactNode, useContext, useState } from "react";
import {PackList} from "../types/packlist";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

 export interface PackListContextProps {
    getPackLists: () => Promise<void>;
 /*    handleAdd: () => void; */
  
    packLists:  PackList[],
  /*   handleAddNewList: () => void; */
}

const PackListContext = createContext<PackListContextProps | undefined>(undefined)


export const PackListProvider = ({children}: {children: ReactNode}) => {

 const [ packLists, setPackLists]= useState<PackList[]>([]);//hold just the original packList in home 

 const getPackLists = async() => {
    try {
        const {data} = await axios({
            url: `${BASE_URL}/api/packlist`,
            method: "GET",
        })
        setPackLists(data.data);
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
    getPackLists,
   /*  handleAdd,
   
    handleAddNewList, */
    packLists
  };

  return <PackListContext.Provider value={value}>{children}</PackListContext.Provider>;
}

export const usePackListContext = () => useContext(PackListContext);