import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ProfileContextProps,
  useProfileContext,
} from "../context/ProfileContext";
import ProfilePackListContainer from "../components/ProfilePackListContainer";
import MilestonesContainer from "../components/MilestonesContainer";
import PersonalDetails from "../components/PersonalDetails";
import { getStorageItem } from "../utils/storage";

const Profile = () => {
  const { userInfo } = useAuth();
  const { loadProfile } = useProfileContext() as ProfileContextProps;
  const firebaseToken = getStorageItem("firebaseToken");

  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      await loadProfile();
    };
    if (userInfo?._id || firebaseToken) {
      fetchData();
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {!loading ? <PersonalDetails /> : "Personal details are loading..."}
      <MilestonesContainer />
      <ProfilePackListContainer />
    </div>
  );
};

export default Profile;
