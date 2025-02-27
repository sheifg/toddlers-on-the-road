import { createContext, ReactNode, useContext, useState } from "react";
import { Profile } from "../types/profile";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

export interface ProfileContextProps {
  profile: Profile | null;
  loadProfile: () => Promise<void>;
  updateProfile: (updatedProfile: Profile) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  const { userInfo } = useAuth();

  const loadProfile = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/profiles/${userInfo?._id}`,
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      setProfile({ packLists: data.data.packLists });
    } catch (error) {
      console.error("Get Profile Error:", error);
      toast.error("Failed to fetch profile");
    }
  };



  // const getUserProfile = async (profileId: string) => {
  //   try {
  //     const token = getToken();
  //     if (!token) {
  //       toast.error("Please login first");
  //       return;
  //     }
  //     const { data } = await axios.get(`${BASE_URL}/api/users/${profileId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setProfile(data.data);
  //   } catch (error) {
  //     console.error("Get Profile Error:", error);
  //     toast.error("Failed to fetch profile");
  //   }
  // };

  const updateProfile = async (updatedProfile: Profile) => {
    try {
      await axios.put(
        `${BASE_URL}/api/profiles/${userInfo?._id}`,
        updatedProfile,
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      setProfile(updatedProfile);
      toast.success("Profile updated successfully!"); // TODO Toast here makes no sense
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error("Failed to update profile");
    }
  };

  // const deleteUserAccount = async (profileId: string) => {
  //   try {
  //     const token = getToken();
  //     if (!token) {
  //       toast.error("Please login first");
  //       return;
  //     }
  //     await axios.delete(`${BASE_URL}/api/users/${profileId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setProfile(null);
  //     toast.success("Profile deleted successfully!");
  //   } catch (error) {
  //     console.error("Delete Profile Error:", error);
  //     toast.error("Failed to delete profile");
  //   }
  // };

  const value: ProfileContextProps = {
    profile,
    loadProfile,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
