import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import HomeMilestoneCard from "./HomeMilestoneCard";

const HomeMilestonesContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  const milestones = [
    {
      images: [
        "milestone-travel.jpg",
        "milestone-travel.jpg",
        "milestone-travel.jpg",
        "milestone-travel.jpg",
        "milestone-travel.jpg",
      ],
      
        title: "Grand Family Getaway",
        date: "2023-07-15",
        place: "Disneyland, California",
        description: "A fun-filled trip with grandfather, grandmother, parents, and children. Enjoyed thrilling rides, family bonding, and magical experiences throughout the park."
      
    },
    {
        images: [
          "milestone-travel.jpg",
          "milestone-travel.jpg",
          "milestone-travel.jpg",
          "milestone-travel.jpg",
          "milestone-travel.jpg",
        ],
        title: "Parent-Child Adventure",
        date: "2023-09-20",
        place: "Yellowstone National Park, Wyoming",
        description: "An adventurous escape with just parents and children exploring geysers, wildlife, and scenic trails. A perfect opportunity for learning about nature and making lasting memories."
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
      <h4 className="font-Mali text-center mt-10 text-xl md:text-2xl lg:text-3xl font-bold text-marine-blue">
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
                <HomeMilestoneCard
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
       
      </div>
      <Link to={"/profile"}>
        <p className="flex justify-end text-base text-marine-blue text-center  pt-4 hover:underline font-semibold mr-5 md:mr-12 md:mt-8 lg:mr-14">
         Manage your memories→
        </p>
      </Link>
    </div>
  );
};

export default HomeMilestonesContainer;
