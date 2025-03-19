import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ProfileContextProps,
  useProfileContext,
} from "../context/ProfileContext";
import ProfilePackListContainer from "../components/ProfilePackListContainer";
import MilestonesContainer from "../components/MilestonesContainer";
import PersonalDetails from "../components/PersonalDetails";

const Profile = () => {
  const { userInfo } = useAuth();
  const { loadProfile } = useProfileContext() as ProfileContextProps;

  useEffect(() => {
    const fetchData = async () => {
      await loadProfile();
    };
    if (userInfo) {
      fetchData();
    }
  }, []);

  return (
    <>
      <PersonalDetails />
      <MilestonesContainer />
      <ProfilePackListContainer />
    </>
  );
};

export default Profile;
