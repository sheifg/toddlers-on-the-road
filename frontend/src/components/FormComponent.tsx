import { Formik, FormikHelpers, Form } from "formik";
import * as Yup from "yup";
import Input from "./Input";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

interface InputProps {
  name: string;
  label: string;
  inputType?: string;
  placeholder?: string;
}

interface FormProps<T> {
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  handleSubmit: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<void>;
  title: string;
  inputs: InputProps[];
  buttonText: string;
  bottomLink1?: string;
  bottomLink2?: string;
  bottomLink3?: string;
  bottomText1?: string;
  bottomText2?: string;
  bottomText3?: string;
  bottomText4?: string;
}

const FormComponent = <T extends object>({
  initialValues,
  validationSchema,
  handleSubmit,
  title,
  inputs,
  buttonText,
  bottomLink1,
  bottomLink2,
  bottomLink3,
  bottomText1,
  bottomText2,
  bottomText3,
  bottomText4,
}: FormProps<T>) => {
  return (
    <div className="w-full max-w-sm p-8 mx-auto rounded-lg ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <h5 className="text-2xl text-center font-bold text-marine-blue font-Mali">
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
            <div className="flex flex-col justify-center items-center space-y-4">
              <button type="submit" className="btn-primary m-2">
                {buttonText}
              </button>
            </div>
            {bottomText1 && (
              <p className="text-sm font-medium text-marine-blue text-center">
                {bottomText1}{" "}
                <Link
                  to={bottomLink1 as string}
                  className="text-marine-blue hover:underline"
                >
                  {bottomText2}
                </Link>
              </p>
            )}
            <div className="container mx-auto flex items-center justify-center p-2">
              <div className="flex items-center space-x-3">
                <Link
                  to={bottomLink2 as string}
                  className="text-marine-blue hover:underline"
                >
                  <p className="text-sm font-medium text-marine-blue text-center">
                    {bottomText3}
                  </p>
                </Link>
                <FcGoogle />
              </div>
            </div>
            <div>
              <Link
                to={bottomLink3 as string}
                className="text-marine-blue hover:underline"
              >
                <p className="text-sm font-medium text-marine-blue text-center">
                  {bottomText4}
                </p>
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
