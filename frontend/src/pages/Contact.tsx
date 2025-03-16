import { object, string } from "yup";
import ContactForm from "../components/ContactForm";


const Contact = () => {

  const inputs = [
    {
      name: "first_name",
      inputType: "text",
      placeholder: "First Name",
    },
    {
      name: "last_name",
      inputType: "text",
      placeholder: "Last Name",
    },
    {
      name: "message",
      inputType: "text",
      placeholder: "Your Message",
    },

  ];

  const initialValues = {
    first_name: "",
    last_name: "",
    message:"",
  };

  const ContactSchema = object().shape({
    first_name: string()
      .required("First Name is required!"),
    last_name: string()
      .required("Last Name is required!"),
    message: string()
      .required("Your Message is required!"),
     
  })
 
  return (<div>

          <ContactForm
           inputs={inputs}
           initialValues={initialValues}
           validationSchema={ContactSchema}
           title="Contact"
           buttonText="Send"
           />

  </div>);
};

export default Contact;
