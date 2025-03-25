import { createContext, ReactNode, useContext, useState } from "react";
import { IMilestone, IProfile, PackList } from "../types/profile";
import { API_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import { getStorageItem } from "../utils/storage";

export interface ProfileContextProps {
  packLists: PackList[] | null;
  milestones: IMilestone[] | null;
  loadProfile: () => Promise<void>;
  updateProfile: (updatedProfile: IProfile) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [packLists, setPackLists] = useState<PackList[] | null>(null);
  const [milestones, setMilestones] = useState<IMilestone[] | null>(null);

  const { userInfo } = useAuth();

  const loadProfile = async () => {
    // Load the packlists and the milestones of the user
    try {
      // Use firebaseToken if userInfo.token is not available
      const token = userInfo?.token || getStorageItem("firebaseToken");
      if (!token) {
        throw new Error("No authentication token available");
      }

      const { data } = await axios.get(
        `${API_URL}/api/profiles/${userInfo?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPackLists(data.data.packLists);
      setMilestones(data.data.milestones);
    } catch (error) {
      console.error("Get Profile Error:", error);
      toast.error("Failed to fetch profile");
    }
  };

  const updateProfile = async (updatedProfile: IProfile) => {
    // Update the packlists and milestones of the user
    try {
      const { data } = await axios.put(
        `${API_URL}/api/profiles/${userInfo?._id}`,
        updatedProfile,
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` }, // User data is protected
        }
      );

      setPackLists(data.data.packLists);
      setMilestones(data.data.milestones);
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error("Failed to update profile");
    }
  };

  const value: ProfileContextProps = {
    packLists,
    milestones,
    loadProfile,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
