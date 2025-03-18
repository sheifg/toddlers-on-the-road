import { array, object, string } from "yup";
import {
  ProfileContextProps,
  useProfileContext,
} from "../context/ProfileContext";
import { IMilestone } from "../types/profile";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";

interface MilestoneModalProps {
  closeModal: () => void;
  selectedMilestone: IMilestone;
  isCreation: boolean;
  onSubmit: (selectedMilestone: IMilestone) => Promise<void>;
}
const MilestoneModal = ({
  closeModal,
  selectedMilestone,
  isCreation,
  onSubmit,
}: MilestoneModalProps) => {

  // Store preview URLs for uploaded images
  const [previewImages, setPreviewImages] = useState<string[]>(
    selectedMilestone.images || []
  );

  const initialValues = {
    images: selectedMilestone.images || ["milestone-travel.jpg"],
    title: selectedMilestone.title || "",
    date: selectedMilestone.date || "",
    place: selectedMilestone.place || "",
    description: selectedMilestone.description || "",
  };

  const validationSchema = object({
    images: array().of(string()).max(5, "You can upload up to 5 images"),
    title: string().required("Title is required"),
    date: string().required("Date is required!"),
    place: string().required("Place is required!"),
    description: string(),
  });

  const handleFileChange = (event, index, setFieldValue) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      
      fileReader.onloadend = () => {
        const base64Image = fileReader.result as string; // The base64 image string  

        // Update preview images state with base64 string
        const updatedPreviews = [...previewImages];
        updatedPreviews[index] = base64Image;
        setPreviewImages(updatedPreviews);

        // Store base64 image in Formik values
        setFieldValue(`images[${index}]`, base64Image);
      };
      fileReader.readAsDataURL(file); // Start reading the file as a data URL (base64 string)
    }
  };

  const handleSubmit = async (values) => {
    try {
      await onSubmit(values);
      closeModal();
    } catch (error) {
      console.error("Error submitting milestone:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 font-Mali z-[100]">
      <div className="bg-beige max-w rounded-lg overflow-y-auto shadow-lg p-6 max-w-md w-[90vw] max-h-[90vh] relative">
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
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col space-y-4">
              <div>
                <label className="block text-marine-blue text-left">
                  Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-poppy-red text-sm"
                />
              </div>
              <div>
                <label className="block text-marine-blue text-left">Date</label>
                <Field
                  type="text"
                  name="date"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="date"
                  component="div"
                  className="text-poppy-red text-sm"
                />
              </div>
              <div>
                <label className="block text-marine-blue text-left">
                  Place
                </label>
                <Field
                  type="text"
                  name="place"
                  className="w-full p-2 border rounded-lg"
                />
                <ErrorMessage
                  name="place"
                  component="div"
                  className="text-poppy-red text-sm"
                />
              </div>
              <div>
                <label className="block text-marine-blue text-left">
                  Description
                </label>
                <Field
                  type="text"
                  name="description"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-marine-blue text-left">
                  Images (Upload up to 5)
                </label>
                <FieldArray name="images">
                  {({ push, remove }) => (
                    <div>
                      {/* Iterate over the current images */}
                      {values.images.map((_, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          {/*
                          {/* Image preview}
                          {previewImages[index] && (
                            <img
                              src={previewImages[index]}
                              alt={`Preview ${index}`}
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                          )}
                           */}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                              handleFileChange(e, index, setFieldValue)
                            }
                            className="w-full p-2 border rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              // Remove from preview state
                              setPreviewImages((prev) =>
                                prev.filter((_, i) => i !== index)
                              );
                              remove(index);
                            }}
                            className="bg-poppy-red text-white px-2 py-1 rounded"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {values.images.length < 5 && (
                        <button
                          type="button"
                          onClick={() => push("")}
                          className="bg-lawn-green text-white px-4 py-2 rounded mt-2"
                        >
                          Add Image
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>
                <ErrorMessage
                  name="images"
                  component="div"
                  className="text-poppy-red text-sm"
                />
              </div>
              <div className="flex flex-col justify-center items-center space-y-4 font-Mali">
                <button
                  type="submit"
                  className="px-2 bg-marine-blue text-mustard py-2 rounded-lg hover:bg-mustard hover:text-marine-blue focus:ring-4 focus:ring-marine-blue"
                >
                  {isCreation ? "Create" : "Update"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MilestoneModal;