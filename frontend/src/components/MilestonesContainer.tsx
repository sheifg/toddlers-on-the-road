import { useEffect, useState } from "react";
import MilestoneCard from "./MilestoneCard";
import {
  ProfileContextProps,
  useProfileContext,
} from "../context/ProfileContext";
import { IMilestone } from "../types/profile";
import MilestoneModal from "./MilestoneModal";
import { toast } from "react-toastify";
import axios from "axios";

const MilestonesContainer = () => {
  const { milestones, updateProfile } =
    useProfileContext() as ProfileContextProps;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreation, setIsCreation] = useState<boolean>(false); // Show if a new milestone is created or an existing one is edited
  const [selectedMilestone, setSelectedMilestone] = useState<IMilestone | null>(
    null
  );

  const EXAMPLE_MILESTONE = {
    images: [
      "milestone-travel.jpg",
      "milestone-travel.jpg",
      "milestone-travel.jpg",
      "milestone-travel.jpg",
      "milestone-travel.jpg",
    ],
    title: "Title of your milestone",
    date: "Date of travel",
    place: "Place of your travel",
    description: "Description of your travel (Optional)",
    isExample: true,
  };

  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    };
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const displayedMilestones =
    milestones && milestones.length > 0 ? milestones : [EXAMPLE_MILESTONE];

  // Group cards into slides
  const groupedSlides = [];
  for (let i = 0; i < displayedMilestones.length; i += cardsPerSlide) {
    groupedSlides.push(displayedMilestones.slice(i, i + cardsPerSlide));
  }

  const totalSlides = groupedSlides.length;

  const prevSlide = () => {
    setCurrentIndex((slideIndex) => slideIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((slideIndex) => slideIndex + 1);
  };

  // Prepares the empty data structure to be displayed in the dialog to create a new milestone
  const openCreateMilestoneModal = () => {
    setIsCreation(true);
    const emptyMilestone = {
      images: ["milestone-travel.jpg"],
      title: "",
      date: "",
      place: "",
      description: "",
    };
    openModal(emptyMilestone);
  };

  const openModal = (selectedMilestone: IMilestone) => {
    setIsModalOpen(true);
    setSelectedMilestone(selectedMilestone);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handles the creation of a new user milestone in the backend with the data provided in the dialog
  const handleCreateMilestone = async (selectedMilestone: IMilestone) => {
    try {
      const updatedMilestones = milestones
        ? [selectedMilestone, ...milestones]
        : [selectedMilestone];

      await updateProfile({ milestones: updatedMilestones });
      toast.success("The milestone is created");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setIsCreation(false);
  };

  // Handles the update of an existing user milestone or the creation of the first one(editing the example milestone) applying changes from the dialog in the backend
  const handleUpdateMilestone = async (updatedMilestone: IMilestone) => {
    const milestoneId = selectedMilestone?._id;

    const isExample = selectedMilestone.isExample;

    try {
      let updatedMilestones;

      if (isExample) {
        // Create a copy instead of updating
        const copiedMilestone = { ...updatedMilestone, _id: undefined }; // Generate a new ID in the backend
        updatedMilestones = [copiedMilestone, ...milestones];
        toast.success("Your first milestone is created!");
      } else {
        // Update the milestone normally
        updatedMilestones = milestones
          ? milestones.map((milestone) =>
              milestone._id === milestoneId ? updatedMilestone : milestone
            )
          : [];
        toast.success("The milestone is updated");
      }

      await updateProfile({ milestones: updatedMilestones });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleDeleteMilestone = async (milestone: IMilestone) => {
    const milestoneId = milestone._id;
    try {
      const newUpdatedMilestones = milestones
        ? milestones.filter((milestone) => milestone._id !== milestoneId)
        : [];

      await updateProfile({ milestones: newUpdatedMilestones });
      toast.success("The milestone is deleted");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="py-3 lg:pb-4 text-marine-blue font-Mali text-center">
      <h4 className="font-medium text-lg mb-2 md:text-2xl lg:text-3xl drop-shadow-[3px_3px_0px_rgba(96,211,214,0.6)] ]">
        Milestone family trips
      </h4>
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {groupedSlides.map((slides, index) => (
            <div key={index} className="w-full flex flex-shrink-0 p-4">
              {slides.map((milestone, slideIndex) => (
                <MilestoneCard
                  key={slideIndex}
                  milestone={milestone}
                  cardsPerSlide={cardsPerSlide}
                  openModal={openModal}
                  handleDeleteMilestone={handleDeleteMilestone}
                />
              ))}
            </div>
          ))}
        </div>
        {currentIndex > 0 && (
          <button
            className={
              "absolute left-2 md:left-1 lg:left-7 xl:left-14 top-1/2 transform-translate-y-1/2 bg-blue-water bg-opacity-70 text-white p-2 rounded-full"
            }
            onClick={prevSlide}
          >
            ❮
          </button>
        )}
        {currentIndex < totalSlides - 1 && (
          <button
            className={
              "absolute right-2 md:right-1 lg:right-7 xl:right-14 top-1/2 transform-translate-y-1/2 bg-blue-water bg-opacity-70 text-white p-2 rounded-full"
            }
            onClick={nextSlide}
          >
            ❯
          </button>
        )}
        {totalSlides > 1 && (
          <div className="flex justify-center md:mt-3 mb-4 space-x-2">
            {groupedSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 md:h-3 md:w-3 rounded-full ${
                  currentIndex === index ? "bg-marine-blue" : "bg-gray-200"
                } transition-all duration-500`}
              ></button>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={() => openCreateMilestoneModal()}
          className="text-mustard px-2 py-2 m-3 mx-2 text-sm lg:text-md xl:text-lg lg:mt-4 bg-marine-blue rounded-lg font-semibold hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
        >
          Create milestone
        </button>
      </div>
      {isModalOpen && selectedMilestone && (
        <MilestoneModal
          closeModal={closeModal}
          isCreation={isCreation}
          onSubmit={isCreation ? handleCreateMilestone : handleUpdateMilestone}
          selectedMilestone={selectedMilestone}
        />
      )}
    </div>
  );
};

export default MilestonesContainer;
