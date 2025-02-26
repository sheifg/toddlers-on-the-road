import { createContext, ReactNode, useContext, useState } from "react";
import { Profile } from "../types/profile";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";


export interface ProfileContextProps {
  profile: Profile | null;
  createProfile: (data: Profile) => Promise<void>;
  getProfile: (profileId: string) => Promise<void>;
  updateProfile: (data: Profile, profileId: string) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

 
  const getToken = (): string | null => {
    const userString = sessionStorage.getItem("user");
    if (!userString) return null;
    try {
      const user = JSON.parse(userString);
      return user.token;
    } catch {
      return null;
    }
  };


  

 
  const getUserProfile = async (profileId: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const { data } = await axios.get(`${BASE_URL}/api/users/${profileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(data.data);
    } catch (error) {
      console.error("Get Profile Error:", error);
      toast.error("Failed to fetch profile");
    }
  };

  const updateProfile = async (data: Profile, profileId: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await axios.put(`${BASE_URL}/api/users/${profileId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(response.data.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Profile Error:", error);
      toast.error("Failed to update profile");
    }
  };

  
  const deleteUserAccount = async (profileId: string) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("Please login first");
        return;
      }

      await axios.delete(`${BASE_URL}/api/users/${profileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProfile(null);
      toast.success("Profile deleted successfully!");
    } catch (error) {
      console.error("Delete Profile Error:", error);
      toast.error("Failed to delete profile");
    }
  };

 
  const value: ProfileContextProps = {
    profile,
    getUserProfile,
    updateProfile,
    deleteUserAccount,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};


export const useProfileContext  = () => useContext(ProfileContext );
