import { object, ref, string } from "yup";
import { useAuth } from "../context/AuthContext";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useNavigate } from "react-router-dom";
import { UserContextProps, useUserContext } from "../context/UserContext";
import { IChangePassword } from "../types/user";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const { userInfo } = useAuth();
  const { changePassword } = useUserContext() as UserContextProps;
  const navigate = useNavigate();

  const inputs = [
    {
      name: "old_password",
      label: "Old password",
      inputType: "password",
      placeholder: "Enter old password",
    },
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

  const initialValues: IChangePassword = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const ChangePasswordSchema = object().shape({
    old_password: string().required("Old password is required"),
    new_password: string()
      .min(8, "Min 8 characters")
      .required("Password is required!"),
    confirm_password: string()
      .required("Password is required!")
      .oneOf([ref("new_password")], "Password does not match"),
  });

  const checkPasswordMatch = (values: {
    new_password: string;
    confirm_password: string;
  }) => {
    if (values.new_password && values.confirm_password) {
      const match = values.new_password === values.confirm_password;
      return match;
    }
    return true; // Return true if either password field is empty
  };

  const handleSubmit = (values: IChangePassword, actions: any) => {
    if (
      values.old_password !== userInfo?.password &&
      !checkPasswordMatch(values)
    ) {
      return;
    }
    changePassword(values);
    toast.success("Change password successfully!");
    navigate("/profile");
    actions.setSubmitting(false);
  };
  return (
    <>
      <ChangePasswordForm
        initialValues={initialValues}
        validationSchema={ChangePasswordSchema}
        handleSubmit={handleSubmit}
        title={"Change password"}
        inputs={inputs}
        buttonText={"Submit"}
      />
    </>
  );
};

export default ChangePassword;
