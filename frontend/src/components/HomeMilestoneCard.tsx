import { IMilestone } from "../types/profile";
import MilestoneImagesContainer from "./MilestoneImagesContainer";

interface HomeMilestoneCardProps {
  milestone: IMilestone;
  cardsPerSlide: number;
}

const HomeMilestoneCard = ({ milestone, cardsPerSlide }:HomeMilestoneCardProps) => {
  const milestoneImages = milestone.images;
  const totalImages = milestoneImages.length;

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
       
      </div>
    </div>
  );
};

export default HomeMilestoneCard;
