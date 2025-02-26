import { useEffect, useState } from "react";
import { PackList } from "../types/packlist";
import { Field, Form, Formik } from "formik";
import { MdEdit, MdDelete } from "react-icons/md";
import { IUser } from "../types/context";
/* import { Profile } from '../types/profile'; */

interface PackListModalProps {
  open: boolean;
  closeModal: () => void;
  selectedPackList: PackList | null;
  userData: IUser | null;
  updateUser: (
    userId: string,
    selectedPackList: PackList,
    token: string,
    userData: IUser | null
  ) => Promise<void>;
  addNew: boolean;
}

export default function PackListModal({
  open,
  closeModal,
  selectedPackList,
  userData,
  updateUser,
  addNew,
}: PackListModalProps) {
  console.log(selectedPackList);

  if (!open || !selectedPackList) return null;

  const [modalItems, setModalItems] = useState<string[]>([
    ...selectedPackList.items,
  ]); //to collecte all the updated items,at first no change ,just the same data of the copedpacklist

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({}); // Manage checkbox states

  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track editing index mode

  const [title, setTitle] = useState<string>(selectedPackList.name);

  useEffect(() => {
    // to be sure each time we open the modal we will have packList data with same data as the card (without changing , maybe i change it and close it befor save it,and i open it again )
    setModalItems([...selectedPackList.items]);
  }, [selectedPackList]);

  const initialValues = {
    items: modalItems,
  };

  const handleCheckboxChange = (index: number) => {
    // to collecte all the update checked input in obj (toggle between true and false)
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleItemChange = (index: number, newValue: string) => {
    //this func will copy everything in modalItems array and put it in another array updatedItem than update one item and return the updatedItems array in modalItems

    const updatedItems = [...modalItems];
    updatedItems[index] = newValue;
    setModalItems(updatedItems);
  };

  const handleDeleteItem = (index: number) => {
    setModalItems((prevItems) => prevItems.filter((_, i) => i !== index));
     //to be sure it will removed just from the state not from selected packlist
  };

  const handleSubmit = () => {
    const userstring = sessionStorage.getItem("user");
    if (!userstring) {
      console.error("you have to login");
      return;
    }
    const user = JSON.parse(userstring);
    const userId = user._id;
    const token = user.token;
  
    if (!userData) {
      console.error("User Data is missing");
      return;
    }
    // assign it to variable with same name (title,items) as mongoDB to have the matching (not add empty array )
    const name = title; // Use the state title here ,
    const items = modalItems;
    const copiedPackList = { name, items };
   
    updateUser(userId, copiedPackList, token, userData);
    // we can just see the privouse one not the latest version of userData
    closeModal();
  };
 
  const handleAddItem = () => {
    setModalItems((prevItems) => [...prevItems, ""]);
  };

  const handleDeleteAll = () => {
    setModalItems([]);
    //to be sure it will removed just from the state not from selected packlist
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 font-Mali ">
      <div className=" rounded-lg bg-mustard shadow-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-4 right-5 text-white bg-blue-water w-10 h-10 rounded-lg mb-2"
          onClick={closeModal}
        >
          &#x2715; {/* Close button */}
        </button>
        <h2 className="text-3xl font-bold text-start text-marine-blue">
          Create your PackList
        </h2>
        {addNew ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-4 bg-white border border-gray-300 rounded-lg"
          />
        ) : (
          <h3 className="text-2xl font-bold text-marine-blue text-center mt-4">
            {/*  {selectedPackList.name} */}
            {title}
          </h3>
        )}

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => (
            <Form className="mt-2 ">
              {modalItems.map((item, index) => (
                <div key={index} className="grid grid-cols-2 ">
                  <div className="mb-2  flex justify-start items-center">
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
                        className={`bg-mustard p-1 w-full text-nowrap ${
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
