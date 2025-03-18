import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  CountryContextProps,
  useCountryContext,
} from "../context/CountryContext";
import { usePackListContext } from "../context/PackListContext";
import { PackListContextProps } from "../context/PackListContext";
import HeroSection from "../components/HeroSection";
import BlurbCtaSection from "../components/BlurbCtaSection";
import Carousel from "../components/Carousel";
import PackListContainer from "../components/PackListContainer";
import {
  ProfileContextProps,
  useProfileContext,
} from "../context/ProfileContext";
import { useAuth } from "../context/AuthContext";
import HomeMilestonesContainer from "../components/HomeMilestonesContainer";


const Home = () => {
  const navigate = useNavigate();
  const { countries = [], getCountries } =
    useCountryContext() as CountryContextProps;
  const { loadPredefinedPackLists } =
    usePackListContext() as PackListContextProps;
  const { loadProfile } = useProfileContext() as ProfileContextProps;
  const { userInfo } = useAuth();

  const handleClick = () => {
    navigate("/about");
  };

  const handleClickCtaButton = () => {
    navigate("/register");
  };

  useEffect(() => {
    getCountries();
    loadPredefinedPackLists();
    if (userInfo) {
      loadProfile();
    }
  }, []);

  return (
    <>
      <HeroSection handleClick={handleClick} />
      <BlurbCtaSection handleClickCtaButton={handleClickCtaButton} />
      <Carousel countries={countries} />
      <HomeMilestonesContainer/>
      <PackListContainer />
    </>
  );
};

export default Home;
