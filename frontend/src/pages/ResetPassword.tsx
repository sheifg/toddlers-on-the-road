import { useNavigate, useParams } from "react-router-dom";
import { object, ref, string } from "yup";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useAuth } from "../context/AuthContext";

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
    new_password: string()
      .min(8, "Min 8 characters")
      .required("Password is required!"),
    confirm_password: string()
      .required("Password is required!")
      .oneOf([ref("new_password")], "Password does not match"),
  });

  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const { resetToken } = useParams();
  console.log("Reset token:", resetToken);

  if (!resetToken) {
    navigate("/login");
    return;
  }

  const handleSubmit = (values, actions) => {
    resetPassword(values, resetToken, navigate);
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
