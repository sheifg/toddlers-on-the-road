import { useNavigate, useParams } from "react-router-dom";
import CountryCardDetails from "../components/CountryCardDetails";
import {
  CountryContextProps,
  useCountryContext,
} from "../context/CountryContext";
import { useEffect, useState } from "react";

const Details = () => {
  const navigate = useNavigate();
  const { countryDetails, getCountryDetails, loading } =
    useCountryContext() as CountryContextProps;
  const { countryId } = useParams<{ countryId: string }>(); // Get countryId from URL params
  const [error, setError] = useState("");

  //we need that to still have access on details if the  remembered user open a new tab
  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (countryId) {
        try {
          await getCountryDetails(countryId);
        } catch (err) {
          setError(
            "Failed to load country details. Please try logging in again."
          );
          console.error("Error fetching country details:", err);
        }
      }
    };
    fetchCountryDetails();
  }, [countryId, getCountryDetails]);

  const handleBack = () => {
    if (home) {
      navigate("/");
    } else {
      navigate("/travel-destinations");
    }
  };

  if (loading) {
    return (
      <p className="text-center font-Mali mt-20">Loading country details...</p>
    );
  }

  if (error) {
    return (
      <div className="text-center font-Mali mt-20">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!countryDetails) {
    return (
      <p className="text-center font-Mali mt-20">Not country details found</p>
    );
  }

  return (
    <CountryCardDetails
      countryDetails={countryDetails}
      handleBack={handleBack}
    />
  );
};

export default Details;
