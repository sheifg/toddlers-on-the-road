import { object, ref, string } from "yup";
import { useAuth } from "../context/AuthContext";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { useNavigate } from "react-router-dom";
import { UserContextProps, useUserContext } from "../context/UserContext";
import { IChangePassword } from "../types/user";
import { toast } from "react-toastify";
import axios from "axios";

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
  }) => values.new_password === values.confirm_password;

  const handleSubmit = async (values: IChangePassword, actions: any) => {
    if (
      values.old_password !== userInfo?.password &&
      !checkPasswordMatch(values)
    ) {
      return;
    }
    try {
      await changePassword(values);
      toast.success("Change password successfully!");
      navigate("/profile");
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
