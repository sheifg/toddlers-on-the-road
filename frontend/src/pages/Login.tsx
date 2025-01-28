import { object, string } from "yup";
import AuthForm from "../components/AuthForm";
import { AuthFormLink } from "../types/form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


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
      text: "Forgot your password?",
      url: "....",
    },
  },
];


const Login = () => {
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
    rememberMe: false, // Explicitly add this field
  };

  const loginSchema = object().shape({
    email: string().email("Invalid Email").required("Email is required!"),
    password: string()
      .min(8, "Min 8 characters")
      .required("Password is required!"),
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (values , actions) => {
    login(values, navigate);
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
