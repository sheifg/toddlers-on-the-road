import { useNavigate, useParams } from "react-router-dom";
import { object, ref, string } from "yup";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useAuth } from "../context/AuthContext";
import { IResetPassword } from "../types/context";
import { toast } from "react-toastify";
import axios from "axios";

const ResetPassword = () => {
  const inputs = [
    {
      name: "new_password",
      label: "New password",
      inputType: "password",
      placeholder: "Enter new password",
    },
    {
      name: "confirm_password",
      label: "Confirm password",
      inputType: "password",
      placeholder: "Confirm new password",
    },
  ];

  const initialValues = {
    new_password: "",
    confirm_password: "",
  };

  const ResetPasswordSchema = object().shape({
    new_password:string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must include at least one lowercase letter (a-z)")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter (A-Z)")
    .matches(/\d/, "Password must include at least one number (0-9)")
    .matches(
      /[@$!%*?&]/,
      "Password must include at least one special character (@, $, !, %, *, ?, &)"
    )
    .required("Password is required!"),
    confirm_password: string()
      .required("Password is required!")
      .oneOf([ref("new_password")], "Password does not match"),
  });

  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  if (!resetToken) {
    navigate("/login");
    return;
  }

  const checkPasswordMatch = (values: {
    new_password: string;
    confirm_password: string;
  }) => values.new_password === values.confirm_password;

  const handleSubmit = async (values: IResetPassword, actions: any) => {
    // Check password match before submitting
    if (!checkPasswordMatch(values)) {
      return;
    }
    try {
      await resetPassword(values, resetToken);
      toast.success("Reset password successfully!");
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
      <ResetPasswordForm
        initialValues={initialValues}
        validationSchema={ResetPasswordSchema}
        handleSubmit={handleSubmit}
        title="Reset password"
        inputs={inputs}
        buttonText="Submit"
      />
    </div>
  );
};

export default ResetPassword;
