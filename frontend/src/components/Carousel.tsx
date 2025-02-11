import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Country } from "../types/countries";
import CarouselCard from "./CarouselCard";

interface CarouselProps {
  countries: Country[];
}

const Carousel: React.FC<CarouselProps> = ({ countries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);
  const navigate = useNavigate();

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
  for (let i = 0; i < countries.length; i += cardsPerSlide) {
    groupedSlides.push(countries.slice(i, i + cardsPerSlide));
  }

  const totalSlides = groupedSlides.length;

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const handleClick = () => {
    navigate("/details");
  };

  return (
    <div className="justify-items-center mt-10 mb-10">
      <h2 className="font-Mali text-center mb-3 md:mb-6 text-xl md:text-2xl lg:text-3xl font-bold text-marine-blue">
        Travel destinations
      </h2>
      <div className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-1000 ease-in-1out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {groupedSlides.map((slide, index) => (
            <div key={index} className="w-full flex flex-shrink-0 p-4">
              {slide.map((country) => (
                <CarouselCard
                  key={country._id}
                  country={country}
                    handleClick={handleClick}
                  cardsPerSlide={cardsPerSlide}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Navigation buttons */}
        <button
          className="absolute left-2 top-1/2 transform-translate-y-1/2 bg-blue-water bg-opacity-70 text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          ❮
        </button>
        <button
          className="absolute right-2 top-1/2 transform-translate-y-1/2 bg-blue-water bg-opacity-70 text-white p-2 rounded-full"
          onClick={nextSlide}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
