import { IMilestone } from "../types/profile";
import MilestoneImagesContainer from "./MilestoneImagesContainer";

interface MilestoneCardProps {
  milestone: IMilestone;
  cardsPerSlide: number;
  openModal: (milestone: IMilestone) => void;
  handleDeleteMilestone: (milestone: IMilestone) => void;
}

const MilestoneCard = ({ milestone, cardsPerSlide, openModal, handleDeleteMilestone }: MilestoneCardProps) => {
  const milestoneImages = milestone.images;
  console.log("Milestone images:", milestoneImages)
  const totalImages = milestoneImages.length;
  console.log("Milestones images length:", totalImages)

  return (
    <div
      className={`container mx-auto font-Mali md:w-[22.5rem] lg:w-[27rem] xl:w-[33rem] ${
        cardsPerSlide === 2 ? "md:w-1/2" : "w-11/12"
      }`}
    >
      <div className="max-w w-11/12 rounded-lg overflow-hidden shadow-lg text-center bg-blue-water bg-opacity-60 mx-auto">
        <MilestoneImagesContainer
          milestoneImages={milestoneImages}
          totalImages={totalImages}
        />
        <div className="px-2 pt-3 pb-2 text-marine-blue">
          <h4 className="font-bold text-xl mb-1 md:text-2xl">
            {milestone.title}
          </h4>
          <p className="text-base lg:text-lg">{milestone.date}</p>
          <p className="text-base lg:text-lg">{milestone.place}</p>
          <p className="text-base lg:text-lg">{milestone.description}</p>
        </div>
        <button
          type="button"
          className="text-mustard px-2 py-2 my-3 mx-2 text-sm lg:text-md xl:text-lg lg:mt-4 bg-marine-blue rounded-lg font-semibold hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
          onClick={() => openModal(milestone)}
        >
          Edit
        </button>
        {!milestone.isExample &&
        <button
          type="button"
          className="text-mustard px-2 py-2 mb-3 mx-2 text-sm lg:text-md xl:text-lg lg:mt-4 bg-marine-blue rounded-lg font-semibold hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
          onClick={() => handleDeleteMilestone(milestone)}
        >
          Delete
        </button>
        }
      </div>
    </div>
  );
};

export default MilestoneCard;
