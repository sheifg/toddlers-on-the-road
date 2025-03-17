import { Form, Formik, FormikHelpers } from "formik";
import { InputProps } from "../types/form";
import * as Yup from "yup";
import Input from "./Input";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { RiEmotionHappyLine } from "react-icons/ri";
import { LuPartyPopper } from "react-icons/lu";

interface ContactFormProps<T> {
  inputs: InputProps[];
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  title: string;
  buttonText: string;
  showMessage: boolean;
  handleSubmit: (values: T, actions: FormikHelpers<T>) => void;
}

const ContactForm = <T extends object & {first_name : string, last_name:string, message:string }>({
  inputs,
  initialValues,
  validationSchema,
  title,
  buttonText,
}: ContactFormProps<T>) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = ( values: T,actions: FormikHelpers<T>) => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <div className="w-full max-w-sm p-8 mx-auto rounded-lg ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched }) => (
          <Form className="  space-y-4">
            <h5 className="text-3xl pb-4 text-center  font-bold text-marine-blue font-Mali md:text-4xl">
              {title}
            </h5>

            {inputs.map((input) => (
              <Input
                key={input.name}
                label={input.label}
                name={input.name as keyof T}
                inputType={input.inputType}
                placeholder={input.placeholder}
                errors={errors}
                touched={touched}
              />
            ))}

            <div className="flex flex-col justify-center items-center space-y-4 font-Roboto">
              <button
                type="submit"
                disabled={
                  !values.first_name || !values.last_name || !values.message
                }
                className={`px-5 py-2  m-2 text-center text-lg  rounded-lg font-medium  font-Mali 
                ${
                  !values.first_name || !values.last_name || !values.message
                    ? "bg-gray-200 text-black cursor-not-allowed"
                    : "bg-blue-water text-white hover:bg-light-pink hover:text-marine-blue "
                }`}
              >
                {buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {showMessage && (
        <div className="msg-container  text-balance">
        <div className="msg-inner bg-mustard opacity-70 p-4 flex flex-col item-center justify-center gap-2">
          <p>
            We are happy to hear your thoughts and suggestions!
          </p>
          <p className="flex items-center  ">
            <span>Your message has been successfully sent</span>
            <LuPartyPopper className="w-5 h-5" />
          </p>
          <p className="flex items-center  ">
            <span>We will get back to you as soon as possible </span>
            <RiEmotionHappyLine className="w-5 h-5" />
          </p>
          <p className="flex items-center  ">
            <span> In the meantime, grab a cup of coffee ☕ and relax—we’ve got this!</span>
            </p>
        </div>
        </div>
      )}
      <div className="grid grid-col space-y-6 py-6 m-5  text-marine-blue text-sm md:text-m">
        <div className="grid grid-cols-1 gap-2 md:col-span-1 md:text-m">
          <div className="flex items-center justify-start gap-2 pt-2">
            <span>
              <MdEmail />
            </span>
            <p>toddlersontheroad@gmail.com</p>
          </div>
          <div className="flex items-center justify-start gap-2 pt-2">
            <span>
              <BsFillTelephoneFill />
            </span>
            <p>0178234634</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-8 p-x-4 pr-6">
          <Link to="/">
            <FaInstagram className="w-5 h-5" />
          </Link>
          <Link to="/">
            <FaFacebook className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ContactForm;
