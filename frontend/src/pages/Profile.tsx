import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const {userInfo} = useAuth();
  console.log("User:", userInfo)
  return <div>Profile</div>;
};

export default Profile;
