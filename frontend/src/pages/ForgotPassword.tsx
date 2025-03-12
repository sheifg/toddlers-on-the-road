import { object, string } from "yup";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IForgotPassword } from "../types/context";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const inputs = [
    {
      name: "email",
      label: "Email",
      inputType: "email",
      placeholder: "Enter your email",
    },
  ];

  const initialValues = {
    email: "",
  };

  const forgotPasswordSchema = object().shape({
    email: string().email("Invalid Email").required("Email is required!"),
  });

  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const handleSubmit = async (values: IForgotPassword, actions: any) => {
    try {
      await forgotPassword(values);
      toast.success("Reset password email sent successfully!");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    actions.setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center py-16">
      <ForgotPasswordForm
        initialValues={initialValues}
        validationSchema={forgotPasswordSchema}
        handleSubmit={handleSubmit}
        title="Forgot password"
        inputs={inputs}
        buttonText="Submit"
      />
    </div>
  );
};

export default ForgotPassword;
