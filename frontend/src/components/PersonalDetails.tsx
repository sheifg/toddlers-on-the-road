import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import { useState } from "react";
import PersonalDetailsModal from "./PersonalDetailsModal";
import { useAuth } from "../context/AuthContext";

const PersonalDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useAuth();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto my-3 w-[80vw] lg:w-[65vw] xl:w-[60vw] font-Mali pb-10">
        <div className="max-w rounded-lg overflow-hidden shadow-lg text-center bg-light-pink bg-opacity-80">
          <div className="pt-3 pb-3 lg:pb-4 text-marine-blue">
            <h4 className="font-medium text-lg md:text-2xl lg:text-3xl drop-shadow-[3px_3px_0px_rgba(96,211,214,0.6)] ]">
              Personal details
            </h4>
            <hr className="w-full border-t-2 border-light-pink border-opacity-90 my-2" />
            <div className="py-4">
              <div className="text-blue-water text-2xl flex justify-end pr-2 md:pr-6 md:text-3xl">
                <button type="button" onClick={() => openModal()}>
                  <GoPencil />
                </button>
              </div>
              <h2 className="font-extrabold text-4xl md:text-7xl lg:text-9xl px-3 py-2 md:p-2">
                {userInfo?.first_name} {userInfo?.last_name}
              </h2>
              <p className="font-normal text-lg md:text-xl py-1 lg:text-2xl">
                {userInfo?.email}
              </p>
            </div>
            <hr className="w-full border-t-2 border-light-pink border-opacity-90 my-2" />
            <Link
              to="/profile/change-password"
              className="text-lg font-semibold md:text-xl lg:text-2xl md:px-3 hover:underline"
            >
              CHANGE PASSWORD
            </Link>
            <hr className="w-full border-t-2 border-light-pink border-opacity-90 my-2" />
            <Link
              to="/profile/delete-account"
              className="text-base font-normal lg:text-xl md:px-3 hover:underline"
            >
              Delete account
            </Link>
          </div>
        </div>
        {isOpen && <PersonalDetailsModal closeModal={closeModal} />}
      </div>
    </>
  );
};

export default PersonalDetails;
