import { useState, useEffect } from "react";
import PackListCard from "./PackListCard";
import { PackListContextProps } from "../context/PackListContext";

const PackListContainer = ({ packLists, handleAdd, handleEdit, handleAddNewList }: PackListContextProps) => {
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);

  // Determine how many cards to show based on screen size
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

    if (currentIndex + cardsPerView < packLists.length) {
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
      <h2 className="font-Mali text-center mt-10 text-xl md:text-2xl lg:text-3xl   2xl:text-4xl font-bold text-marine-blue">
        What do I need?
      </h2>

      {/* PackList Cards Container */}
      <div className="relative w-11/12 mt-6">
        <div className="flex justify-between items-center gap-4">
          {/* Left Button */}
         {currentIndex > 0 && ( 
          <button 
            className="w-8 h-8 md:w-10 md:h-10 bg-blue-water rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
            onClick={handlePrev}
          >
            &lt;
          </button>
             )} 

          {/* Cards Display */}
          <div className=" mx-auto grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full  lg:text-lg 2xl:gap-10">
            {packLists.slice(currentIndex, currentIndex + cardsPerView).map((packList, index) => (
              <div 
                key={index} 
                className="  rounded-lg  lg:text-lg"
              >
                <PackListCard 
                  packList={packList}
                  handleAdd={handleAdd}
                  handleEdit={handleEdit}
                />
              </div>
            ))}
          </div>

          {/* Right Button */}
          {currentIndex + cardsPerView < packLists.length && (
          <button 
            className="w-8 h-8 md:w-10 md:h-10 bg-blue-water rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
            onClick={handleNext}
          >
            &gt;
          </button>
          )}
        </div>
      </div>

      {/* Add New List Button */}
      <div className="text-center mt-6 mb-6">
        <button
          onClick={handleAddNewList}
          className="text-white px-4 py-2 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue transition-colors"
        >
          Add new List
        </button>
      </div>
    </div>
  );
};

export default PackListContainer;
