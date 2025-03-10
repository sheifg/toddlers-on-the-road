import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { UserContextProps, useUserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAuth();
  const { deleteAccount } = useUserContext() as UserContextProps;
  const handleGoBack = () => {
    navigate("/profile");
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setUserInfo(null);
      toast.success("Delete user account successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <div className="container mx-auto w-[80vw] lg:max-w-[38rem] font-Mali py-5 text-marine-blue">
        <div className="rounded-lg shadow-lg text-center bg-mustard bg-opacity-70 px-3 md:px-6 py-4">
          <div className="flex justify-center py-4">
            <div className="flex justify-center items-center h-10 w-10 bg-blue-water bg-opacity-50 rounded-full">
              <BsTrash className="text-marine-blue" />
            </div>
          </div>
          <h3 className="font-bold text-2xl">Delete account</h3>
          <p className="pt-5 text-sm md:text-base">
            We're sad to see you go! Deleting your account will permanently
            remove all your data, including:
          </p>
          <div className="flex justify-center">
            <ul className="list-disc list-inside text-left pt-2 text-sm md:text-base">
              <li>Your profile information</li>
              <li>Travel milestones & memories</li>
              <li>Packlists</li>
            </ul>
          </div>
          <p className="text-poppy-red font-bold py-3 text-sm md:text-base">
            ⚠ This action is irreversible and cannot be undone. Your travel
            memories will be lost forever.
          </p>
          <p className="pb-3 text-sm md:text-base">
            If you’re sure, click the "Delete my account" button below:
          </p>
          <button
            type="button"
            onClick={handleDeleteAccount}
            className=" text-white px-2 py-2 mb-3 text-sm lg:text-md xl:text-lg lg:mt-4 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
          >
            Delete my account
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-marine-blue text-mustard px-4 md:px-5 py-2 text-center text-base md:text-lg rounded-lg font-medium hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue mb-10 lg:mb-14 font-Mali"
          onClick={handleGoBack}
        >
          Go back
        </button>
      </div>
    </>
  );
};

export default DeleteAccount;
