import { createContext, ReactNode, useContext, useState } from "react";
import { Country } from "../types/countries";
import { BASE_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

interface CountryContextProps {
    getCountries : () => Promise<void>;
    countries: Country[],
}
const CountryContext = createContext<CountryContextProps | undefined>(undefined)

export const CountryProvider = ({children}: {children: ReactNode}) => {

    const [countries, setCountries] = useState<Country[]>([]);

    const getCountries = async() => {
        try {
            const {data} = await axios({
                url: `${BASE_URL}/api/country/`,
                method: "GET",
            })
            setCountries(data.data);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
              toast.error(error.response?.data?.message);
            } else if (error instanceof Error) {
              toast.error(error.message);
            }
          }
    }

    const value: CountryContextProps = {
        getCountries,
        countries
      };
    
      return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}

export const useCountryContext = () => useContext(CountryContext);
