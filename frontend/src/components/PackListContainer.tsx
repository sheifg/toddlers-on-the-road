import { useState, useEffect } from "react";
import PackListCard from "./PackListCard";
import PackListModal from "./PackListModal";
import { PackList } from "../types/packlist";
import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import {
  PackListContextProps,
  usePackListContext,
} from "../context/PackListContext";
import {
  ProfileContextProps,
  useProfileContext,
} from "../context/ProfileContext";

const PackListContainer = () => {
  const { userInfo } = useAuth();
  const { predefinedPackLists } = usePackListContext() as PackListContextProps;
  const { profile, updateProfile } = useProfileContext() as ProfileContextProps;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackList, setSelectedPackList] = useState<PackList | null>(
    null
  );

  const [isCreation, setIsCreation] = useState<boolean>(false); // This state shows if it is added a new list (update the default packList)

  const openModal = (packList: PackList) => {
    setIsModalOpen(true);
    // TODO This below has nothing to do with the method name Move outside
    const copiedPackList = { ...packList, items: [...packList.items] };
    const { _id, ...copyWithoutId } = copiedPackList; // eslint-disable-line @typescript-eslint/no-unused-vars
    setSelectedPackList(copyWithoutId); // Copied packList (shallow copy)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Move updateUser outside submit
  const updateUserPackLists = async (selectedPackList: PackList) => {
    try {
      // Merge new packlist with existing ones
      const updatedPackLists = profile?.packLists
        ? [...profile.packLists, selectedPackList]
        : [selectedPackList];

      updateProfile({ ...profile, packLists: updatedPackLists });
      toast.success("packList is updated!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    setIsCreation(false);
  };

  const handleAdd = (packList: PackList) => {
    const copiedPackList = { ...packList, items: [...packList.items] };

    // This shallow copy, some how copy also the _id from the original packList here, so it ios necessary to destructure the data and send the packList to the user without _id
    const { _id, ...copyWithoutId } = copiedPackList; // eslint-disable-line @typescript-eslint/no-unused-vars
    setSelectedPackList(copyWithoutId); // This function updates the state after this function finishes

    updateUserPackLists(copyWithoutId);
    // copyWithoutId is included instead of selectedPackList, because the state will update after the function runs
  };

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

  const handleCreateList = async () => {
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
    if (currentIndex + cardsPerView < predefinedPackLists.length) {
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

      {/* PackList Cards Container */}
      <div className="relative w-11/12 mt-6">
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
            {predefinedPackLists
              .slice(0, predefinedPackLists.length - 1) //it is  used length just in case to add new packList in the future
              .slice(currentIndex, currentIndex + cardsPerView)
              .map((packList: PackList, index: number) => (
                <div key={index} className="  rounded-lg  lg:text-lg">
                  <PackListCard
                    packList={packList}
                    handleAdd={() => handleAdd(packList)}
                    openModal={() => openModal(packList)}
                  />
                </div>
              ))}
          </div>

          {/* Right Button */}
          {currentIndex + cardsPerView < predefinedPackLists.length && (
            <button
              className="w-8 h-8 md:w-10 md:h-10 text-white bg-blue-water rounded-full flex items-center justify-center transition-colors"
              onClick={handleNext}
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      {/* Create list button */}
      <div className="text-center mt-6 mb-6">
        <button
          onClick={() => handleCreateList()}
          disabled={!userInfo}
          className={` ${
            !userInfo
              ? "bg-gray-200 px-2 py-2 rounded-lg text-black cursor-not-allowed"
              : "text-white px-2 py-2 mb-3 text-sm md:py-4 md:px-4 lg:text-md xl:text-lg lg:mt-4 2xl:py-5 2xl:px-5 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
          } `}
        >
          Create list
        </button>
      </div>
      {isModalOpen && selectedPackList && (
        <PackListModal
          closeModal={closeModal}
          selectedPackList={selectedPackList}
          onSubmit={updateUserPackLists}
          isCreation={isCreation}
        />
      )}
    </div>
  );
};

export default PackListContainer;
