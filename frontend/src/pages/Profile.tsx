import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ProfileContextProps,
  useProfileContext,
} from "../context/ProfileContext";
import ProfilePackListContainer from "../components/ProfilePackListContainer";

const Profile = () => {
  const { userInfo } = useAuth();
  console.log("User:", userInfo);
  const { loadProfile } = useProfileContext() as ProfileContextProps;

  useEffect(() => {
    if (userInfo) {
      loadProfile();
    }
  }, []);

  return (
    <>
      <ProfilePackListContainer />
    </>
  );
};

export default Profile;
