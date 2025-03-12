import { useEffect, useState } from "react";
import MilestoneCard from "./MilestoneCard";

const MilestonesContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  const milestones = [
    {
      images: [
        "milestone-travel.jpg",
        "milestone-travel.jpg",
        "milestone-travel.jpg",
      ],
      title: "Title of your milestone",
      date: "Date of travel",
      place: "Place of your travel",
      description: "Description of your travel (Optional)",
    },
  ];

  useEffect(() => {
    const updateCardsPerSlide = () => {
      setCardsPerSlide(window.innerWidth >= 768 ? 2 : 1);
    };
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);

    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Group cards into slides
  const groupedSlides = [];
  for (let i = 0; i < milestones.length; i += cardsPerSlide) {
    groupedSlides.push(milestones.slice(i, i + cardsPerSlide));
  }

  const totalSlides = groupedSlides.length;

  const prevSlide = () => {
    setCurrentIndex((slideIndex) => slideIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex((slideIndex) => slideIndex + 1);
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
          {groupedSlides.map((slide, index) => (
            <div key={index} className="w-full flex flex-shrink-0 p-4">
              {slide.map((milestone, idx) => (
                <MilestoneCard
                  key={idx}
                  milestone={milestone}
                  cardsPerSlide={cardsPerSlide}
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
        <div className="flex justify-center md:mt-5 mb-4 space-x-2">
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
        <button
          type="button"
          className="text-mustard px-2 py-2 mb-3 mx-2 text-sm lg:text-md xl:text-lg lg:mt-4 bg-marine-blue rounded-lg font-semibold hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
        >
          Create new milestone
        </button>
      </div>
    </div>
  );
};

export default MilestonesContainer;
