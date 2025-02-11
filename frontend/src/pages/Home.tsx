import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  CountryContextProps,
  useCountryContext,
} from "../context/CountryContext";
import HeroSection from "../components/HeroSection";
// import CardsContainer from "../components/CardsContainer";
import BlurbCtaSection from "../components/BlurbCtaSection";
import Carousel from "../components/Carousel";

const Home = () => {
  const navigate = useNavigate();
  const { countries = [], getCountries } =
    useCountryContext() as CountryContextProps;

  const handleClick = () => {
    navigate("/about");
  };
  const handleClickCtaButton = () => {
    navigate("/register");
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <HeroSection handleClick={handleClick} />
      <BlurbCtaSection handleClickCtaButton={handleClickCtaButton} />
      <Carousel countries={countries} />
    </>
  );
};

export default Home;
