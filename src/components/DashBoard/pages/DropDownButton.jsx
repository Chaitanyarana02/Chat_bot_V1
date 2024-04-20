import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectOption } from "../../../features/selectedOption/selectedOptionSlice";
import questionSvg from "../../../assets/question.svg";
const DropDownButton = ({explaiNation}) => {
  const [selectedOption, setSelectedOption] = useState("Suggested Questions");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    // console.log("Selected option:", option);
    setSelectedOption(option);
    dispatch(selectOption(option));
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative  gap-2 inline-block text-left" style={{display:"flex"}}>
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex items-center gap-2 justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          {selectedOption == 'deeper' ? "Deeper" : "Tangential"}
          {isOpen ? (
        <FaChevronUp className="transform  transition-transform duration-300" />
      ) : (
        <FaChevronDown className="transition-transform duration-300" />
      )}
        </button>

        {isOpen && (
          <div
            className="origin-top-right absolute left-0 mt-[2.5rem] ease-in-out transform translate-y-0 w-[100%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleOptionSelect("deeper")}
              >
                Deeper
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleOptionSelect("tangential")}
              >
                Tangential
              </a>
            </div>
          </div>
        )}
     

      </div>

    </>
  );
};

export default DropDownButton;
