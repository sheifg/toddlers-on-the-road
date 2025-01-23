import { object, string } from "yup";
import FormComponent from "../components/FormComponent";

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

  const handleSubmit = (values, actions) => {};

  return (
    <div className="flex items-center justify-center py-16">
      <FormComponent
        initialValues={initialValues}
        validationSchema={registerSchema}
        handleSubmit={handleSubmit}
        title="Welcome back"
        inputs={inputs}
        buttonText="Sign In"
        bottomText1="Don't have an account?"
        bottomLink1="/register"
        bottomText2="Sign Up"
        bottomText3="Continue with Google"
        // bottomLink2= "Login with Google"
        bottomText4="Forget password"
        // bottomLink3="Forget password"
      />
    </div>
  );
};

export default Login;
