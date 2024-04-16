import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectOption } from "../../../features/selectedOption/selectedOptionSlice";
import questionSvg from "../../../assets/question.svg";
const DropDownButton = () => {
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
          {selectedOption}
          <FaChevronDown />
        </button>

        {isOpen && (
          <div
            className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
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
      <button className="bg-white w-[120px] px-4 py-2 text-black rounded-full flex items-center gap-2 justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100"> Explain 
       <span className="ml-1">
         <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.58594 4.01256C6.36699 3.32915 7.63332 3.32915 8.41436 4.01256C9.19541 4.69598 9.19541 5.80402 8.41436 6.48744C8.27842 6.60639 8.12778 6.70463 7.96755 6.78217C7.47043 7.02276 7.00015 7.44772 7.00015 8V8.5M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM7 10.5H7.005V10.505H7V10.5Z" stroke="#1C1C1F" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </span> </button>

      </div>

    </>
  );
};

export default DropDownButton;
