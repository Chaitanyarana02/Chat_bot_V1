import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { selectOption } from "../../../features/selectedOption/selectedOptionSlice";
import questionSvg from "../../../assets/question.svg";

import authenticateAndSaveCredentials from "../../../helper/awsAuth";
import GetIssueReasons from "../../awsFunctions/GetIssueReasons";

const Warning = ( {onWarning ,getOtherIssue } ) => {
  const [selectedOption, setSelectedOption] = useState("Choose your question");
  const [isOpen, setIsOpen] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const [arrayGetissu, setArrayGetissu] = useState({ issue_reasons: [] }); // Initialize with empty issue_reasons
  const dispatch = useDispatch();

  const GetIssue = async () => {
    try {
      const credentials = await authenticateAndSaveCredentials();
      const response = await GetIssueReasons(credentials);
      setArrayGetissu(JSON.parse(response.body));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    GetIssue();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onWarning(option);
    setIsOpen(false);
    if (option.toLowerCase() === "other") { // Adjusted comparison to handle case sensitivity
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  };

  const handleInputChange = (e) => {
    setOtherInputValue(e.target.value);
    getOtherIssue(e.target.value );
  };

  return (
    <>
      <div className="relative flex flex-col gap-2 inline-block text-left">
        <button
          onClick={toggleDropdown}
          type="button"
          className="flex bg-[#F6F7F8] text-[12px] items-center mt-2 gap-2 w-full text-start justify-between rounded-full shadow-sm px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
        >
          {selectedOption}
          {isOpen ? (
            <FaChevronUp className="transform text-black transition-transform duration-300" />
          ) : (
            <FaChevronDown className="transition-transform duration-300 text-black" />
          )}
        </button>

        {isOpen && (
          <div
            className="origin-top-right text-[12px !important] border-none absolute left-0 mt-[3rem] ease-in-out transform translate-y-0 w-[100%] rounded-md shadow-lg bg-white divide-y divide-gray-100 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1" role="none">
              {arrayGetissu.issue_reasons.map((reason, index) => (
                <a
                  key={index}
                  href="#"
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 ${
                    index !== arrayGetissu.issue_reasons.length - 1 ? 'border-b-[1px]' : ''
                  }`}
                  role="menuitem"
                  onClick={() => handleOptionSelect(reason.reason_text)}
                >
                  {reason.reason_text}
                </a>
              ))}
            
            </div>
          </div>
        )}

        {showOtherInput && (
          <div className="popup-header flex flex-col text-left text-[14px] font-semibold mt-2 gap-1">
            Please specify your issue  
            <input
              type="text"
              value={otherInputValue}
              onChange={handleInputChange}
              className="bg-[#F6F7F8] py-[12px] px-4 rounded-full font-[400] mt-1 text-[12px]"
              placeholder="Write your question"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Warning;
