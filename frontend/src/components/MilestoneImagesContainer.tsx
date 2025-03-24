import { useState } from "react"; 
import { BASE_URL } from "../constants";

interface MilestoneCardImagesProps {
  milestoneImages: string[];
  totalImages: number;
}
const MilestoneImagesContainer = ({
  milestoneImages,
  totalImages,
}: MilestoneCardImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevSlide = () => {
    setCurrentImageIndex((slideIndex) => slideIndex - 1);
  };

  const nextSlide = () => {
    setCurrentImageIndex((slideIndex) => slideIndex + 1);
  };  

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
        }}
      >
        {milestoneImages.map((image, index) => (
          <img
            key={index}
            className="h-[12.5rem] object-containt w-full flex-shrink-0"
            src={image === "milestone-travel.jpg" ? image : `${BASE_URL}${image}`}
            alt="Travel image"
          />
        ))}
      </div>
      {currentImageIndex > 0 && (
        <button
          className={
            "absolute left-1 top-1/2 transform-translate-y-1/2 text-marine-blue font-bold text-2xl px-1"
          }
          onClick={prevSlide}
        >
          ❮
        </button>
      )}
      {currentImageIndex < totalImages - 1 && (
        <button
          className={
            "absolute right-1 top-1/2 transform-translate-y-1/2 text-marine-blue font-bold text-2xl px-1"
          }
          onClick={nextSlide}
        >
          ❯
        </button>
      )}
      {totalImages > 1 && 
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center space-x-2">
        {milestoneImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1 w-1 md:h-2 md:w-2 rounded-full ${
              currentImageIndex === index ? "bg-marine-blue" : "bg-gray-200"
            } transition-all duration-500`}
          ></button>
        ))}
      </div>
      }
    </div>
  );
};

export default MilestoneImagesContainer;
