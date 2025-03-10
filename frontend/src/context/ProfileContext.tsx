import { createContext, ReactNode, useContext, useState } from "react";
import { PackList } from "../types/profile";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

export interface ProfileContextProps {
  packLists: PackList[] | null;
  loadProfile: () => Promise<void>;
  updateProfile: (updatedPackLists: PackList[]) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [packLists, setPackLists] = useState<PackList[] | null>(null);

  const { userInfo } = useAuth();

  const loadProfile = async () => {
    //get  just the packLists from the user
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/profiles/${userInfo?._id}`,
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      setPackLists(data.data.packLists);
    } catch (error) {
      console.error("Get Profile Error:", error);
      toast.error("Failed to fetch profile");
    }
  };

  const updateProfile = async (updatedPackLists: PackList[]) => {
    //update here to add packList to this property packLists in the user
    try {
      /*  const data = */
      const { data } = await axios.put(
        `${BASE_URL}/api/profiles/${userInfo?._id}`,
        { packLists: updatedPackLists },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` }, //we need this token because user data is protected in backend
        }
      );

      setPackLists(data.data.packLists);
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error("Failed to update profile");
    }
  };

  const value: ProfileContextProps = {
    packLists,
    loadProfile,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
