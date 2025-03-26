import { object, string } from "yup";
import AuthForm from "../components/AuthForm";
import { AuthFormLink } from "../types/form";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signUpProvider } from "../config/firebase";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { register, setUserInfo } = useAuth();
  const toastMessage = "User registered successfully!";
  const BOTTOM_LINKS: AuthFormLink[] = [
    {
      text: "Already have an account?",
      link: {
        text: "Sign In",
        url: "/login",
      },
    },
    {
      link: {
        text: "Continue with Google",
        onClick: async () => {
          try {
            const user = await signUpProvider(navigate, toastMessage);
            setUserInfo(user);
          } catch (error) {
            console.error("Google sign-up error:", error);
          }
        },
      },
      icon: FcGoogle,
    },
  ];

  const inputs = [
    {
      name: "first_name",
      label: "First name",
      inputType: "text",
      placeholder: "Jane",
    },
    {
      name: "last_name",
      label: "Last name",
      inputType: "text",
      placeholder: "Doe",
    },
    {
      name: "username",
      label: "Username",
      inputType: "text",
      placeholder: "JaneD",
    },
    {
      name: "email",
      label: "Email",
      inputType: "email",
      placeholder: "janedoe@email.com",
    },
    {
      name: "password",
      label: "Password",
      inputType: "password",
      placeholder: "**********",
    },
  ];

  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  };

  const registerSchema = object().shape({
    first_name: string().required("First name is required!"),
    last_name: string().required("Last name is required!"),
    username: string().required("Username is required!"),
    email: string().email("Invalid Email").required("Email is required!"),
    password: string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must include at least one lowercase letter (a-z)")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter (A-Z)")
    .matches(/\d/, "Password must include at least one number (0-9)")
    .matches(
      /[@$!%*?&]/,
      "Password must include at least one special character (@, $, !, %, *, ?, &)"
    )
    .required("Password is required!"),
  });

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const userDataRegister = await register(values);
      setUserInfo(userDataRegister);
      sessionStorage.setItem("user", JSON.stringify(userDataRegister));
      toast.success("Register successful!");
      navigate("/");
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
    <div className="flex items-center justify-center">
      <AuthForm
        initialValues={initialValues}
        validationSchema={registerSchema}
        handleSubmit={handleSubmit}
        title="Register"
        inputs={inputs}
        buttonText="Sign Up"
        bottomLinks={BOTTOM_LINKS}
      />
    </div>
  );
};

export default Register;
