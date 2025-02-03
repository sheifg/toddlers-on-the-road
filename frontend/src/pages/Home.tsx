import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about");
  };
  
  return (
    <>
<HeroSection handleClick={handleClick} />
    </>
  );
};

export default Home;
