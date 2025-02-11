import CardsContainer from "../components/CardsContainer";
import {
  CountryContextProps,
  useCountryContext,
} from "../context/CountryContext";

const TravelDestinations = () => {
  const { countries = [] } = useCountryContext() as CountryContextProps;

  return (
    <div>
      <CardsContainer countries={countries} />
    </div>
  );
};

export default TravelDestinations;
