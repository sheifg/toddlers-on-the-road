import { object, string } from "yup";
import FormComponent from "../components/FormComponent";

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

  const handleSubmit = (values, actions) => {};

  return (
    <div className="flex items-center justify-center">
      <FormComponent
        initialValues={initialValues}
        validationSchema={registerSchema}
        handleSubmit={handleSubmit}
        title="Welcome to our App"
        inputs={inputs}
        buttonText="Sign Up"
        bottomText1="Already have an account?"
        bottomLink1="/login"
        bottomText2="Sign In"
        bottomText3="Continue with Google"
        // bottomLink2= "Register with Google"
      />
    </div>
  );
};

export default Register;
