import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCountryContext } from "../context/CountryContext";
import HeroSection from "../components/HeroSection";
import CardsContainer from "../components/CardsContainer";

const Home = () => {
  const navigate = useNavigate();
  const {countries = [], getCountries} = useCountryContext();

  const handleClick = () => {
    navigate("/about");
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <>
      <HeroSection handleClick={handleClick} />
      <CardsContainer countries={countries} />
    </>
  );
};

export default Home;
