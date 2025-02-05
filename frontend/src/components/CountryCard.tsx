import { Country } from "../types/countries";

interface CountryCardProps {
  handleClick: () => void;
  country: Country;
}

const CountryCard = ({ country, handleClick }: CountryCardProps) => {
  return (
    <div className="container mx-auto xl:w-[500px] mustard">
      <div className="max-w rounded-lg overflow-hidden shadow-lg text-center bg-mustard bg-opacity-60">
        <img className="h-[200px] object-containt w-full" src={`http://127.0.0.1:8000` + country.images[0]} alt={country.name} />
        <div className="px-6 pt-3 pb-2 lg:pb-0 text-marine-blue">
          <h4 className="font-bold text-2xl mb-1">{country.name}</h4>
          <p className="text-base">{country.capital_city}</p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className=" text-white px-2 py-2 mb-3 text-sm lg:text-md xl:text-lg lg:mt-4 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default CountryCard;
