import { useEffect, useState } from "react";
import { PackList } from "../types/profile";
import axios from "axios";
import { API_URL } from "../constants";
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
    useProfileContext() as ProfileContextProps; //updateProfile will call inside another func

  const [defaultPackList, setDefaultPackList] = useState<PackList | null>(null); //without this state  this data (defaultPackList) can not be used directly as variable from async func

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackList, setSelectedPackList] = useState<PackList | null>(
    null
  );

  const [isCreation, setIsCreation] = useState<boolean>(false); // This state shows if it is added a new list from btn AddNewPackList, or updating  exist packList  from the modal wich include

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

      await updateProfile({ packLists: updatedPackLists });
      toast.success("Packlist is added!");
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

      await updateProfile({ packLists: updatedPackLists });
      //here the console will not show the updated packLists
      toast.success("Packlist is updated!");
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
      const updatedPackLists = packLists
        ? packLists.filter((packList) => packList._id !== packListId)
        : [];

      await updateProfile({ packLists: updatedPackLists }); //here include packList and Milestone ,it has to be  destructured  just send packList or just mileston
      toast.success("Packlist is deleted!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  //after the func finish  the state will updated ,here console the packList

  const getDefaultPackList = async () => {
    const packListId = "67bc61f1d52d552624756648";
    try {
      const { data } = await axios({
        url: `${API_URL}/api/packlist/${packListId}`,
        method: "GET",
      });
      setDefaultPackList(data.data); // Store default pack list in a state
      return data.data; //important without this the defaultPackList can not be checked in  handleAddNewList
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };
  //call the func
  useEffect(() => {
    getDefaultPackList();
  }, []);

  const handleAddNewList = async () => {
    setIsCreation(true);

    /* get the default packList from the backend getdefaultPackList()*/
    const defaultPackList = await getDefaultPackList();

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
    <div className="flex flex-col justify-center items-center text-marine-blue font-Mali mt-8">
      <h2 className="font-medium text-lg mb-2 md:text-2xl lg:text-3xl drop-shadow-[3px_3px_0px_rgba(96,211,214,0.6)] ]">
        What do I need?
      </h2>
      {packLists && (
        <div className="relative w-11/12 mt-6">
          {/* PackList Cards Container */}
          <div className="flex justify-between items-center gap-4">
            {/* Left Button */}
            {currentIndex > 0 && (
              <button
                className="right-2 md:right-1 lg:right-7 xl:right-14 top-1/2 transform-translate-y-1/2 bg-blue-water bg-opacity-70 text-white p-2 rounded-full"
                onClick={handlePrev}
              >
                ❮
              </button>
            )}
            {/* Cards Display */}
            <div className=" mx-auto w-full items-center ">
              {packLists.length === 0 && defaultPackList && (
                <div className="  justify-center md:w-[22.5rem] lg:w-[27rem] xl:w-[33rem]">
                  <div className="rounded-lg lg:text-lg  ">
                    <ProfilePackListCard
                      packList={defaultPackList}
                      openModal={() => handleAddNewList()}
                    />
                  </div>
                </div>
              )}

              {/* Grid for Other PackLists */}
              <div className="mx-auto grid grid-cols-1 items-center md:grid-cols-2 lg:grid-cols-3 gap-6 w-full lg:text-lg 2xl:gap-10">
                {packLists.length > 0 &&
                  packLists
                    .slice(currentIndex, currentIndex + cardsPerView)
                    .map((packList, index) => (
                      <div key={index} className="rounded-lg lg:text-lg">
                        <ProfilePackListCard
                          packList={packList}
                          handleDelete={() => handleDelete(packList)}
                          openModal={() => openModal(packList)}
                        />
                      </div>
                    ))}
              </div>
            </div>

            {/* Right Button */}
            {currentIndex + cardsPerView < packLists.length && (
              <button
                className="right-2 md:right-1 lg:right-7 xl:right-14 top-1/2 transform-translate-y-1/2 bg-blue-water bg-opacity-70 text-white p-2 rounded-full"
                onClick={handleNext}
              >
                ❯
              </button>
            )}
          </div>

          
        </div>
      )}

      {/* Add New List Button */}
      <div className="text-center mt-8 mb-6 font-Mali">
        <button
          onClick={() => handleAddNewList()}
          disabled={!userInfo}
          className="text-white px-2 py-2   m-3 text-sm md:py-4 md:px-4 lg:text-md xl:text-lg lg:mt-4 2xl:py-5 2xl:px-5 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
        >
          Add New List
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
