import { object, string } from "yup";
import AuthForm from "../components/AuthForm";
import { AuthFormLink } from "../types/form";
import { FcGoogle } from "react-icons/fc";

const BOTTOM_LINKS: AuthFormLink[] = [
    {
        text: "Already have an account?",
        link: {
            text: "Sign In",
            url: "/login"
        },
        
    },
    {
        link: {
            text: "Continue with Google",
            url: "...."
        },
        icon: FcGoogle   
    },
]

const Register = () => {
  const inputs = [
    {
      name: "firstName",
      label: "First name",
      inputType: "text",
      placeholder: "Jane",
    },
    {
      name: "lastName",
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
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };

  const registerSchema = object().shape({
    firstName: string().required("First name is required!"),
    lastName: string().required("Last name is required!"),
    username: string().required("Username is required!"),
    email: string().email("Invalid Email").required("Email is required!"),
    password: string()
      .min(9, "Min 9 characters")
      .required("Password is required!"),
  });

  const handleSubmit = () => {};

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
