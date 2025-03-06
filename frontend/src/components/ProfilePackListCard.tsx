import { useState } from "react";
import { PackList } from "../types/profile";
import { useAuth } from "../context/AuthContext";
interface ProfilePackListCardProps {
  handleDelete: (packList: PackList) => void;
  openModal: (packList: PackList) => void;
  packList: PackList;
}
const ProfilePackListCard = ({
  packList,
  handleDelete,
  openModal,
}: ProfilePackListCardProps) => {
  const { userInfo } = useAuth();
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({}); // Manage checkbox states
  const handleCheckboxChange = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container mx-auto mustard font-Mali ">
      <div className="container mx-auto  w-full rounded-lg overflow-hidden shadow-lg text-center bg-mustard bg-opacity-60 lg:gap-x-5">
        <div className="px-6 pt-4 pb-2 lg:pb-0 text-marine-blue">
          <h4 className="font-bold text-xl mb-1 md:text-2xl 2xl:text-3xl">
            {packList.name}
          </h4>
        </div>
        <div className="container grid grid-cols-1 gap-y-8 mt-4 mb-8 ml-2.5 lg:ml-0.5">
          <ul>
            {packList.items.map((item, index) => (
              <li
                className="flex justify-start items-center gap-0.5 space-x-1 space-y-3 text-sm md:ml-1 md:text-base md:flex md:space-x-1.5 lg:text-md lg:space-x-3 xl:text-2xl xl:ml-4 xl:space-x-5 2xl:gap-1.75 2xl:text-3xl"
                key={index}
              >
                <input
                  type="checkbox"
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                  className="cursor-pointer items-center text-blue-water w-5 h-5 md:w-6 md:h-6 2xl:w-9 2xl:h-9 rounded-lg"
                />
                <span
                  className={` pb-3.5 items-center  w-full text-start text-nowrap  ${
                    checkedItems[index] ? "line-through" : ""
                  }`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="container flex justify-center items-center gap-4 pb-3 md:gap-8 md:pb-5 lg:pb-7 lg:gap-10">
          <button
            type="button"
            onClick={() => handleDelete(packList)}
            disabled={!userInfo}
            className="text-white px-2 py-2 mb-3 text-sm md:py-4 md:px-4 lg:text-md xl:text-lg lg:mt-4 2xl:py-5 2xl:px-5 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => openModal(packList)}
            disabled={!userInfo}
            className="text-white px-2 py-2 mb-3 text-sm md:py-4 md:px-4 lg:text-md xl:text-lg lg:mt-4 2xl:py-5 2xl:px-5 bg-blue-water rounded-lg font-semibold hover:bg-light-pink hover:text-marine-blue focus:ring-4 focus:ring-marine-blue transition-colors"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePackListCard;
