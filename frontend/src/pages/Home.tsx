import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCountryContext } from "../context/CountryContext";
import HeroSection from "../components/HeroSection";
import CardsContainer from "../components/CardsContainer";
import BlurbCtaSection from "../components/BlurbCtaSection";

const Home = () => {
  const navigate = useNavigate();
  const { countries = [], getCountries } = useCountryContext();

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
      <CardsContainer countries={countries} />
    </>
  );
};

export default Home;
