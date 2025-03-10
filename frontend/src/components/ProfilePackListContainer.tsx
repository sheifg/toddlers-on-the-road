import { useEffect, useState } from "react";
import { PackList } from "../types/profile";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import ProfilePackListCard from "./ProfilePackListCard";
import { useAuth } from "../context/AuthContext";
import {
  ProfileContextProps,
  useProfileContext,
} from "../context/ProfileContext";
import ProfilePackListModal from "./ProfilePackListModal";

const ProfilePackListContainer = () => {
  const { userInfo } = useAuth();
  const { packLists, updateProfile } =
    useProfileContext() as ProfileContextProps; //here fix state and func ,updateProfile will call inside another func

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackList, setSelectedPackList] = useState<PackList | null>(
    null
  );

  const [isCreation, setIsCreation] = useState<boolean>(false); // This state shows if it is added a new list from btn AddNewPackList,or updating  exist packList  from the modal wich include

  const openModal = (packList: PackList) => {
    setIsModalOpen(true);
    const copiedPackList = { name: packList.name, items: [...packList.items] };
    if (isCreation) {
      setSelectedPackList(copiedPackList); // (create)from btn addnewList it will created new packList without id
    } else {
      setSelectedPackList(packList); // (update) exist packList from  edit btn in the PackListCard in the modal
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addUserPackList = async (selectedPackList: PackList) => {
    try {
      const updatedPackLists = packLists
        ? [selectedPackList, ...packLists]
        : [selectedPackList];

      await updateProfile(updatedPackLists);
      toast.success("packList is added!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    setIsCreation(false);
  };

  const updateUserPackList = async (updatedPackList: PackList) => {
    const packListId = updatedPackList._id;
    try {
      const updatedPackLists = packLists
        ? packLists.map((packList) =>
            packList._id === packListId ? updatedPackList : packList
          )
        : [];

      await updateProfile(updatedPackLists);
      //here the console will not show the updated packLists
      toast.success("packList is updated!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  //here is the correct place to console the packList after updating

  const handleDelete = async (packList: PackList) => {
    const packListId = packList._id;
    try {
      const newUpdatedPackLists = packLists
        ? packLists.filter((packList) => packList._id !== packListId)
        : [];

      await updateProfile(newUpdatedPackLists);
      toast.success("packList is deleted!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  //after the func finish  the state will updated ,here console the packList
  const getDefaultPackList = async (packListId: string) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/api/packlist/${packListId}`,
        method: "GET",
      });
      return data.data;
    } catch (error) {
      // TODO These errors should ideally be in the function caller
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  const handleAddNewList = async () => {
    setIsCreation(true);

    /* get the default packList from the backend getdefaultPackList()*/
    const defaultPackListId = "67bc61f1d52d552624756648";

    const defaultPackList = await getDefaultPackList(defaultPackListId);

    if (defaultPackList) {
      openModal(defaultPackList);
    }
  };

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3); // Large screens (lg)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2); // Medium screens (md)
      } else {
        setCardsPerView(1); // Small screens (sm)
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  // Navigation for carousel
  const handleNext = () => {
    if (packLists && currentIndex + cardsPerView < packLists.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-Mali text-center mt-10 text-xl md:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-marine-blue">
        What do I need?
      </h2>
      {packLists && (
        <div className="relative w-11/12 mt-6">
          {" "}
          {/* PackList Cards Container */}
          <div className="flex justify-between items-center gap-4">
            {/* Left Button */}
            {currentIndex > 0 && (
              <button
                className="w-8 h-8 md:w-10 md:h-10 text-white bg-blue-water rounded-full flex items-center justify-center transition-colors"
                onClick={handlePrev}
              >
                &lt;
              </button>
            )}
            {/* Cards Display */}
            <div className=" mx-auto grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full  lg:text-lg 2xl:gap-10">
              {packLists
                .slice(currentIndex, currentIndex + cardsPerView)
                .map((packList, index) => (
                  <div key={index} className="  rounded-lg  lg:text-lg">
                    <ProfilePackListCard
                      packList={packList}
                      handleDelete={() => handleDelete(packList)}
                      openModal={() => openModal(packList)}
                    />
                  </div>
                ))}
            </div>

            {/* Right Button */}
            {currentIndex + cardsPerView < packLists.length && (
              <button
                className="w-8 h-8 md:w-10 md:h-10 text-white bg-blue-water rounded-full flex items-center justify-center transition-colors"
                onClick={handleNext}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      )}

      {/* Add New List Button */}
      <div className="text-center mt-6 mb-6">
        <button
          onClick={() => handleAddNewList()}
          disabled={!userInfo}
          className="text-white px-2 py-2 mb-3 text-sm md:py-4 md:px-4 lg:text-md xl:text-lg lg:mt-4 2xl:py-5 2xl:px-5 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
        >
          Add new List
        </button>
      </div>
      {isModalOpen && selectedPackList && (
        <ProfilePackListModal
          closeModal={closeModal}
          selectedPackList={selectedPackList}
          isCreation={isCreation}
          onSubmit={isCreation ? addUserPackList : updateUserPackList}
          setIsCreation={setIsCreation}
        />
      )}
    </div>
  );
};
export default ProfilePackListContainer;
