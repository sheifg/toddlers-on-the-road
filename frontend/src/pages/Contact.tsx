import { object, string } from "yup";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  const inputs = [
    {
      name: "userName",
      inputType: "text",
      label: "Your Name",
      placeholder: "Lara",
    },
    {
      name: "email",
      inputType: "email",
      label: "Your Email",
      placeholder: "Last123@gmail.com",
    },
    {
      name: "message",
      inputType: "text",
      label: "Your Message",
      placeholder: "Message ...",
    },
  ];

  const initialValues = {
    userName: "",
    email: "",
    message: "",
  };

  const ContactSchema = object().shape({
    userName: string().required("Your Name is required!"),
    email: string().email("Invalid Email").required("Your Email is required!"),
    message: string().required("Your Message is required!"),
  });

  return (
    <div>
      <ContactForm
        inputs={inputs}
        initialValues={initialValues}
        validationSchema={ContactSchema}
        title="Contact"
        buttonText="Send"
      />
    </div>
  );
};

export default Contact;
