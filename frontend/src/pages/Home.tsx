import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CountryContextProps,
  useCountryContext,
} from "../context/CountryContext";
import {usePackListContext} from "../context/PackListContext";
import {PackListContextProps} from "../context/PackListContext"  ;
import HeroSection from "../components/HeroSection";
import BlurbCtaSection from "../components/BlurbCtaSection";
import Carousel from "../components/Carousel";
import PackListContainer from "../components/PackListContainer";
import { IUser } from "../types/context";
import { useAuth } from "../context/AuthContext";
import { AuthContextProps } from "../context/AuthContext";


const Home = () => {

  const [userData,setUserData]=useState< IUser| null>(null)//that holds the currently logged-in user's information.

  const navigate = useNavigate();
  const { countries = [], getCountries } =
    useCountryContext() as CountryContextProps;

  const { packLists = [], getPackLists }=
    usePackListContext() as PackListContextProps ;
  const {userInfo} =useAuth()as AuthContextProps

  const handleClick = () => {
    navigate("/about");
  };
  const handleClickCtaButton = () => {
    navigate("/register");
  };

  useEffect(() => {
    getCountries();
    getPackLists(); 
  }, []);

  //get firebaseToken from sessionstorage:
   const firebaseToken =sessionStorage.getItem("firebaseToken");
  
  useEffect(() => {
    const userstring = sessionStorage.getItem("user");
    if (userstring) {
      const user = JSON.parse(userstring);
    
      setUserData(user);
    }
  }, [userInfo,firebaseToken]); //everytime user change the state userData will change
  console.log(userInfo);
  return (
    <>
      <HeroSection handleClick={handleClick} />
      <BlurbCtaSection handleClickCtaButton={handleClickCtaButton} />
      <Carousel countries={countries} />
      <PackListContainer packLists={packLists} userData={userData} setUserData={setUserData}/>

    </>
  );
};

export default Home;
