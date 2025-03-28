import { MdDelete, MdEdit } from "react-icons/md";
import { PackList } from "../types/profile";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";

interface ProfilePackListModalProps {
  closeModal: () => void;
  selectedPackList: PackList;
  isCreation: boolean;
  onSubmit: (selectedPackList: PackList) => Promise<void>;
  setIsCreation: (isCreation: boolean) => void;
}
export default function ProfilePackListModal({
  closeModal,
  selectedPackList,
  isCreation,
  onSubmit,
  setIsCreation,
}: ProfilePackListModalProps) {

  const [modalItems, setModalItems] = useState<string[]>([
    ...selectedPackList.items,
  ]); // to collect all the updated items, at first there is no change, just the same data of the copiedpacklist

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({}); // Manage checkbox states

  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track editing index mode

  const [title, setTitle] = useState<string>(selectedPackList.name);

  useEffect(() => {
    // To be sure each time the modal is opened, it will be had the packList data with the same data as the card(without any changes, in case that some data is being changed, then teh modal is closed before save it and it is opened again)
    setModalItems([...selectedPackList.items]);
  }, [selectedPackList]);

  const initialValues = {
    items: modalItems,
  };

  const handleCheckboxChange = (index: number) => {
    // To collect all the update checked input in object(toggle between true and false)
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleItemChange = (index: number, newValue: string) => {
    // This function will copy everything from modalItems array and put it in another array updatedItem. Then one item will be updated and the updatedItems array in modalItems will be returned
    const updatedItems = [...modalItems];
    updatedItems[index] = newValue;
    setModalItems(updatedItems);
  };

  const handleDeleteItem = (index: number) => {
    setModalItems((prevItems) => prevItems.filter((_, i) => i !== index));
    // To be sure it will removed just from the state, not from selected packlist
  };

  const handleSubmit = async () => {
    // Assigning the variable with the same name (title, items) as in mongoDB to match, avoiding getting an empty array
    const name = title; // Using the state title
    const items = modalItems;
    const updatedPackListWithoutId = { name, items };
    if (isCreation) {
      await onSubmit(updatedPackListWithoutId);      
    } else {
      const _id = selectedPackList._id;
      const updatedPackList = { _id, name, items };
      await onSubmit(updatedPackList);
    }

    setIsCreation(false);
    closeModal();
  };

  const handleAddItem = () => {
    setModalItems((prevItems) => [...prevItems, ""]);
  };

  const handleDeleteAll = () => {
    setModalItems([]);
    // To be sure it will removed just from the state, not from selected packlist
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center max-w bg-black bg-opacity-50 font-Mali ">
      <div className=" rounded-lg bg-mustard shadow-lg p-6  max-w-[19rem]  md:max-w-lg lg:max-w-lg relative">
       
        <button
          className=" absolute top-4 right-5 text-white bg-blue-water w-6 h-6 md:w-10 md:h-10 rounded-lg mb-2"
          onClick={closeModal}
        >
          &#x2715; {/* Close button */}
        </button>
        <h2 className=" text-xl md:text-2xl font-bold text-start text-marine-blue">
          Create your Packlist
        </h2>
        {isCreation ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-4 bg-white border border-gray-300 rounded-lg"
          />
        ) : (
          <h3 className=" text-md md:text-2xl font-bold text-marine-blue text-center mt-4">
            {title}
          </h3>
        )}
          
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form className="mt-2 ">
              {modalItems.map((item, index) => (
                <div key={index} className="grid grid-cols-2 ">
                  <div className="mb-2  flex justify-start items-center pb-2.5">
                    <input
                      type="checkbox"
                      checked={checkedItems[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="cursor-pointer text-blue-water w-5 h-5 rounded-lg"
                    />
                    {editingIndex === index ? (
                      <Field
                        type="text"
                        name={`items.${index}`}
                        className={`bg-mustard p-2 w-full ${
                          checkedItems[index] ? "line-through " : ""
                        }`}
                        value={item}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleItemChange(index, e.target.value)
                        }
                        onBlur={() => setEditingIndex(null)} // Exit edit mode on blur
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`bg-mustard p-1 text-nowrap w-1${
                          checkedItems[index] ? "line-through" : ""
                        }`}
                      >
                        {item}
                      </span>
                    )}
                  </div>

                  <div className=" flex justify-end items-center space-x-4">
                    <button
                      type="button"
                      className="ml-2 text-marine-blue"
                      onClick={() => setEditingIndex(index)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      type="button"
                      className="ml-2 text-marine-blue"
                      onClick={() => handleDeleteItem(index)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="mt-4 mx-4 bg-blue-water rounded-lg text-white px-5 py-2 "
                >
                  Save
                </button>
                <button
                  type="button"
                  className="mt-4 mx-4 bg-blue-water rounded-lg text-white px-4 py-2 "
                  onClick={handleAddItem}
                >
                  + item
                </button>
                <button
                  type="button"
                  className="mt-4 mx-4 bg-blue-water rounded-lg text-white px-4 py-2 "
                  onClick={handleDeleteAll}
                >
                  Delete
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
