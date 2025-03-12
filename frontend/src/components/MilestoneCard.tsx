import { IMilestone } from "../types/profile";

interface MilestoneCardProps {
  milestone: IMilestone;
  cardsPerSlide: number;
}

const MilestoneCard = ({ milestone, cardsPerSlide }: MilestoneCardProps) => {
  console.log("Milestone:", milestone);
  return (
    <div
      className={`container mx-auto font-Mali md:w-[22.5rem] lg:w-[27rem] xl:w-[33rem] ${
        cardsPerSlide === 2 ? "md:w-1/2" : "w-11/12"
      }`}
    >
      <div className="max-w w-11/12 rounded-lg overflow-hidden shadow-lg text-center bg-blue-water bg-opacity-60 mx-auto">
        <img
          className="h-[12.5rem] object-containt w-full"
          src={milestone.images[0]}
          alt={milestone.place}
        />
        <div className="px-2 pt-3 pb-2 text-marine-blue">
          <h4 className="font-bold text-xl mb-1 md:text-2xl">
            {milestone.title}
          </h4>
          <p className="text-base lg:text-lg">{milestone.date}</p>
          <p className="text-base lg:text-lg">{milestone.place}</p>
        </div>
        <button
          type="button"
          className="text-mustard px-2 py-2 my-3 mx-2 text-sm lg:text-md xl:text-lg lg:mt-4 bg-marine-blue rounded-lg font-semibold hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
        >
          Edit
        </button>
        <button
          type="button"
          className="text-mustard px-2 py-2 mb-3 mx-2 text-sm lg:text-md xl:text-lg lg:mt-4 bg-marine-blue rounded-lg font-semibold hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MilestoneCard;
