import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuth } from "../context/AuthContext";
import { object, string } from "yup";
import { UserContextProps, useUserContext } from "../context/UserContext";
import { IUpdatePersonalDetails } from "../types/user";
import { toast } from "react-toastify";
import axios from "axios";

interface PersonalDetailsModalProps {
  closeModal: () => void;
}
const PersonalDetailsModal = ({ closeModal }: PersonalDetailsModalProps) => {
  const { userInfo, setUserInfo } = useAuth();
  const { updatePersonalDetails } = useUserContext() as UserContextProps;

  const initialValues = {
    first_name: userInfo?.first_name || "",
    last_name: userInfo?.last_name || "",
    email: userInfo?.email || "",
  };

  const validationSchema = object({
    first_name: string().required("First name is required"),
    last_name: string().required("Last name is required"),
    email: string().email("Invalid Email").required("Email is required!"),
  });

  const handleSubmit = async (values: IUpdatePersonalDetails, actions: any) => {
    try {
      const updatedPersonalDetails = await updatePersonalDetails(values);
      setUserInfo(updatedPersonalDetails);
      toast.success("Update personal details successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    actions.setSubmitting(false);
    closeModal();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 font-Mali z-[100]">
        <div className="bg-beige max-w rounded-lg overflow-hidden shadow-lg p-6 max-w-md w-[80vw] relative">
          <button
            className="text-marine-blue top-2 right-2 w-8 h-8 rounded-lg mb-2 absolute"
            onClick={closeModal}
          >
            &#128473;
          </button>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="flex flex-col space-y-4">
                <div>
                  <label className="block text-marine-blue">First Name</label>
                  <Field
                    type="text"
                    name="first_name"
                    className="w-full p-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-poppy-red text-sm"
                  />
                </div>
                <div>
                  <label className="block text-marine-blue">Last Name</label>
                  <Field
                    type="text"
                    name="last_name"
                    className="w-full p-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-poppy-red text-sm"
                  />
                </div>
                <div>
                  <label className="block text-marine-blue">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full p-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-poppy-red text-sm"
                  />
                </div>
                <div className="flex flex-col justify-center items-center space-y-4 font-Mali">
                  <button
                    type="submit"
                    className="px-2 bg-marine-blue text-mustard py-2 rounded-lg hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default PersonalDetailsModal;
