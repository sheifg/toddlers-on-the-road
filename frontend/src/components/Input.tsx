import { Field, FormikErrors, FormikTouched } from "formik";

interface InputProps<T> {
  name: keyof T;
  label: string;
  inputType?: string;
  placeholder?: string;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
}

const Input = <T extends object>({
  name,
  label,
  inputType = "text",
  placeholder,
  errors,
  touched,
}: InputProps<T>) => {
  const isMessageField = name === "message"; // Check if it's the message field
  return (
    <div className="font-Roboto">
      
      <label htmlFor={name as string} className="form-label">
           {label}:
      </label>
       
      
      <Field
        as={isMessageField ? "textarea" : "input"} 
        type={inputType}
        name={name as string}
        id={name as string}
        placeholder={placeholder}
        className={`form-control ${isMessageField ? "h-32 resize-none" : "h-10"}`} 
        />
      
      {errors[name] && touched[name] && (
        <p className="mt-1 text-poppy-red text-xs">{errors[name] as string}</p>
      )}
    </div>
  );
};

export default Input;
