import { object, string } from "yup";
import AuthForm from "../components/AuthForm";
import { AuthFormLink } from "../types/form";

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
  };

  const loginSchema = object().shape({
    email: string().email("Invalid Email").required("Email is required!"),
    password: string()
      .min(9, "Min 9 characters")
      .required("Password is required!"),
  });

  const handleSubmit = () => {};

  return (
    <div className="flex items-center justify-center py-16">
      <AuthForm
        initialValues={initialValues}
        validationSchema={registerSchema}
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
