import { object, string } from "yup";
import AuthForm from "../components/AuthForm";
import { AuthFormLink } from "../types/form";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signUpProvider } from "../config/firebase";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();
  const toastMessage = "Login successful!";
  const { login, setUserInfo, updateRememberMe } = useAuth();
  let redirectionPath: any;

  const BOTTOM_LINKS: AuthFormLink[] = [
    {
      text: "Don't have an account?",
      link: {
        text: "Sign Up",
        url: "/register",
      },
    },
    {
      link: {
        text: "Continue with Google",
        onClick: async () => {
          try {
            const user = await signUpProvider(navigate, toastMessage);
            setUserInfo(user);
            const redirectTo = locationState?.redirectTo;
            navigate(
              redirectTo ? `${redirectTo.pathname}${redirectTo.search}` : "/"
            );
          } catch (error) {
            console.error("Google sign-in error:", error);
          }
        },
      },
      icon: FcGoogle,
    },
    {
      link: {
        text: "Forgot your password?",
        url: "/forgot-password",
      },
    },
  ];

  const inputs = [
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
    email: "",
    password: "",
    rememberMe: false,
  };

  const loginSchema = object().shape({
    email: string().email("Invalid Email").required("Email is required!"),
    password: string()
      .min(8, "Min 8 characters")
      .required("Password is required!"),
  });

  if (locationState) {
    const { redirectTo } = locationState;
    redirectionPath = `${redirectTo.pathname}${redirectTo.search}`;
  }

  const handleSubmit = async (values: any, actions: any) => {
    try {
      const userDataLogin = await login(values);
      setUserInfo(userDataLogin);

      // Update the rememberMe preference in context
      updateRememberMe(values.rememberMe);

      // Storage is now handled by the context useEffect

      toast.success("Login successful!");
      navigate(redirectionPath ? redirectionPath : "/");
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
      <AuthForm
        initialValues={initialValues}
        validationSchema={loginSchema}
        handleSubmit={handleSubmit}
        title="Login"
        inputs={inputs}
        buttonText="Sign In"
        bottomLinks={BOTTOM_LINKS}
        isReminderShown
      />
    </div>
  );
};

export default Login;
