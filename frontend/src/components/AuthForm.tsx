import { Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { Link } from "react-router-dom";
import { AuthFormLink } from "../types/form";

interface InputProps {
  name: string;
  label: string;
  inputType?: string;
  placeholder?: string;
}

interface AuthFormProps<T> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  handleSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<void>;
  title: string;
  inputs: InputProps[];
  buttonText: string;
  bottomLinks: AuthFormLink[];
  isReminderShown?: boolean;
}

const AuthForm = <T extends object>({
  initialValues,
  validationSchema,
  handleSubmit,
  title,
  inputs,
  buttonText,
  bottomLinks,
  isReminderShown = false,
}: AuthFormProps<T>) => {
  return (
    <div className="w-full max-w-sm p-8 mx-auto rounded-lg ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <h5 className="text-3xl pb-4 text-center font-bold text-marine-blue font-Mali">
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

            {isReminderShown && (
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded ml-2 accent-blue-water checked:bg-white bg-gray-100 border-gray-100 cursor-pointer text-white-600"
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm font-medium text-marine-blue pl-1 font-Roboto"
                >
                  <p className="text-sm font-medium text-marine-blue pl-1">
                    Remember me
                  </p>
                </label>
              </div>
            )}

            <div className="flex flex-col justify-center items-center space-y-4 font-Roboto">
              <button type="submit" className="btn-primary m-2 font-Mali">
                {buttonText}
              </button>
            </div>

            {bottomLinks.map((bottomLink, index) => (
              <div
                key={index}
                className="container mx-auto flex items-center justify-center p-2 font-Roboto"
              >
                <div className="flex items-center space-x-1">
                  {bottomLink.text && (
                    <p className="text-sm font-medium text-marine-blue text-center font-Roboto">
                      {`${bottomLink.text}`}
                    </p>
                  )}
                  <Link
                    to={bottomLink.link.url}
                    className="text-marine-blue hover:underline"
                  >
                    <p className="text-sm font-medium text-marine-blue text-center">
                      {bottomLink.link.text}
                    </p>
                  </Link>
                  {bottomLink.icon && <bottomLink.icon />}
                </div>
              </div>
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;
