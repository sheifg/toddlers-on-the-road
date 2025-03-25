import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import { Country } from "../types/countries";
import { API_URL } from "../constants";
import axios from "axios";
import { toast } from "react-toastify";

export interface CountryContextProps {
  getCountries: () => Promise<void>;
  countries: Country[];
  getCountryDetails: (countryId: string) => Promise<void>;
  countryDetails: Country | null;
  loading: boolean;
  home: boolean;
  setHome: React.Dispatch<React.SetStateAction<boolean>>;
}
const CountryContext = createContext<CountryContextProps | null>(null);

export const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countryDetails, setCountryDetails] = useState<Country | null>(null);
  const [loading, setLoading] = useState(false);
  const [home, setHome] = useState(true);

  const getCountries = async () => {
    try {
      const { data } = await axios({
        url: `${API_URL}/api/country/`,
        method: "GET",
      });
      setCountries(data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Use useCallback to ensure the function reference stays stable between renders
  const getCountryDetails = useCallback(async (countryId: string) => {
    try {
      setLoading(true);
      // Try to get from sessionStorage first, then localStorage as fallback
      let userString = sessionStorage.getItem("user");
      if (!userString) {
        userString = localStorage.getItem("user");
      }
      if (!userString) {
        toast.error("Please login first");
        throw new Error("Authentication required");
      }
      // Parse the user data
      const user = JSON.parse(userString);
      const token = user.token;
      if (!token) {
        toast.error("Invalid authentication. Please login again");
        throw new Error("Invalid token");
      }
      // Make the API call with the token
      const { data } = await axios({
        url: `${API_URL}/api/country/${countryId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Check if we received valid data
      if (data && data.data) {
        setCountryDetails(data.data);
      } else {
        throw new Error("No data returned from server");
      }
    } catch (error) {
      console.error("Error fetching country details:", error);
      setCountryDetails(null);

      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;

        // Handle authentication errors
        if (statusCode === 401 || statusCode === 403) {
          toast.error("Your session has expired. Please login again");
        } else {
          toast.error(
            error.response?.data?.message || "Failed to fetch country details"
          );
        }
      } else if (error instanceof Error) {
        throw error; // Re-throw to handle in component
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const value: CountryContextProps = {
    getCountries,
    countries,
    getCountryDetails,
    countryDetails,
    loading,
    home,
    setHome,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
};
