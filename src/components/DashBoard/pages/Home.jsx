import PropTypes from "prop-types";
import HowHelpToday from "./HowHelpToday";
import DropDownButton from "./DropDownButton";

// import isLikes from '../../../../public/assets/home/handThumbup.svg'
// import darkLike from '../../../../public/assets/home/darkThumbh.svg'

//notification toaster
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import authenticateAndSaveCredentials from "../../../helper/awsAuth";
import AskQuestion from "../../awsFunctions/AskQuestion";
import { useRef, useState, useEffect } from "react";

import { MdCheckCircle } from 'react-icons/md'; // Import the success icon


const Home = ({ selectedQuestion, setSelectedQuestion, onAskQuestionData }) => {
  const [askQuestionsData, setAskQuestionsData] = useState([]);
  const [landinDeisgn, setLandingDesign] = useState(true);
  const [passQuasation, setPassQuasation] = useState();

  // is Like Flag
  


  //AskQuestion page 
  const [answerDataHistory, setAnswerDataHistory] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([]);

  const scrollRef = useRef(null);
  const prevAnswerDataRef = useRef();


  const handleInputChange = (event) => {
    setSelectedQuestion(event.target.value);
  };


  const notify = (Message) => {
    toast.success(Message, {
      position: "top-right", // Position the toast at the top-right corner
      autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM15.6103 10.1859C15.8511 9.84887 15.773 9.38046 15.4359 9.1397C15.0989 8.89894 14.6305 8.97701 14.3897 9.31407L11.1543 13.8436L9.53033 12.2197C9.23744 11.9268 8.76256 11.9268 8.46967 12.2197C8.17678 12.5126 8.17678 12.9874 8.46967 13.2803L10.7197 15.5303C10.8756 15.6862 11.0921 15.7656 11.3119 15.7474C11.5316 15.7293 11.7322 15.6153 11.8603 15.4359L15.6103 10.1859Z" fill="#55C54B"/>
      </svg>, // Customize the success icon
      style: {
        fontFamily: "'Montserrat', sans-serif", // Change the font family
        borderRadius: "15px", // Add border radius
        boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" // Add box shadow
      },
      className: "success-toast" // Add a custom class for additional styling
    });
  };

  const printQuestion = () => {
    const currentQuestion = selectedQuestion.trim();
    if (currentQuestion !== "") {
      setQuestionsArray(prevQuestions => [...prevQuestions, currentQuestion]);
      // Clear the input box after printing the question
      setSelectedQuestion("");
    }
  };



  const handleAskQuestion = async () => {
    try {
      setLandingDesign(false);
      handlePassquasation();
      const credentials = await authenticateAndSaveCredentials();
      const response = await AskQuestion(credentials, selectedQuestion);
      const askQuestions = JSON.parse(response.body);

      setAnswerDataHistory(prevData => [...prevData, askQuestions]);


    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handlePassquasation = () => {
    printQuestion();
    setPassQuasation(selectedQuestion)
  }


  const handleClick = (item ,  requiredRequestId) => {
    // Get the item based on its ID (assuming you have an array of items)
   
  
    // Check if the item exists and if its request_id matches the required one
    if ( item.answer && item.answer.request_id === requiredRequestId) {
      // Change the src attribute of the image with the corresponding item ID
      const img = document.getElementById(`likeButton_${item.answer.request_id}`);
      // if (img) {
      //   img.src = "/assets/home/darkThumbh.svg";
      //   // Notify the user
      //   notify("Email was successfully sent");
      // }
      if (img.src.endsWith("/assets/home/darkThumbh.svg")) {
        // If yes, change it back to the normal image src
        img.src = "/assets/home/handThumbup.svg";
        // Notify the user
      
      } else {
        // Otherwise, change it to the dark image src
        img.src = "/assets/home/darkThumbh.svg";
        // Notify the user
      
      }
    }
  };
  

  const testData = [
    {
      "Category": "Clothing",
      "Net Sales Dollars": "$3,720,662.34",
      "Growth Sales": "$100,000",
      "Growth nott": "$50,000"

    },
    {
      "Category": "Clothing",
      "Net Sales Dollars": "$3,720,662.34",
      "Growth Sales": "$100,000"
    },
    {
      "Category": "Clothing",
      "Net Sales Dollars": "$3,720,662.34",
      "Growth Sales": "$100,000"
    },
    {
      "Category": "Electronics",
      "Net Sales Dollars": "$26,559,829.38",
      "Growth Sales": "$200,000"
    },
    {
      "Category": "Electronics",
      "Net Sales Dollars": "$26,559,829.38",
     
    },
    {
      "Category": "Electronics",
      "Net Sales Dollars": "$26,559,829.38",
     
    },
    {
      "Category": "Health & Beauty",
      "Net Sales Dollars": "$948,591.50",
      "Growth Sales": "$50,000",
      "Growth nott": "$50,000"
    },
    {
      "Category": "Health & Beauty",
      "Net Sales Dollars": "$948,591.50",
      "Growth Sales": "$50,000"
    },
    {
      "Category": "Health & Beauty",
      "Net Sales Dollars": "$948,591.50",
      "Growth Sales": "$50,000"
    }
  ];
  

  const generateTable = (data) => {
    if (!data || !data.length) {
      return <p>No data available</p>;
    }
  
    const columns = Object.keys(data[0]);
  
    return (
      <table className="mb-2">
        <thead>
          <tr className="bg-[#1c1c1f]">
            {columns.map((columnName, index) => (
              <th
                key={index}
                className={`py-2 px-4 text-xs font-semibold leading-4 text-white ${
                  index === 0 ? "rounded-tl-2xl" : ""
                } ${
                  index === columns.length - 1 ? "rounded-tr-2xl" : ""
                }`}
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-[#f6f7f8]" : ""}>
              {columns.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className="bg-[#fff] py-[8px] px-[16px] font-normal leading-[14.63px]"
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  




  // Scroll to the bottom when answerDataHistory changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questionsArray, answerDataHistory]);




  const mergedData = questionsArray.map((question, index) => ({
    question: question,
    answer: answerDataHistory[index] // Assuming both arrays are of the same length
  }));


  return (
    <>
      {!landinDeisgn ? (
        <div className="flex flex-1 justify-center items-center">
          <div
            className="flex flex-col gap-4 overflow-y-auto w-full px-[40px]"
            style={{ height: "calc(100vh - 20vh)" }}
          >
            {mergedData.map((item, index) => (
              
              <div key={index} className="flex w-full flex-col items-start gap-4 ms-auto">
                <div className="flex items-start gap-3 ms-auto">
                  <div
                    className="text-start bg-[#c4f0f2] py-[16px] px-[24px] font-normal leading-[20px] max-w-[700px]"
                    style={{ borderRadius: "18px 18px 0px 18px" }}
                  >
                    <p className="text-[14px] font-normal leading-[22px] tracking-normal m-0">
                      {item.question}
                    </p>
                  </div>
                </div>


                {!item.answer ? (

                  <div className="flex items-start gap-2">
                    <div className="text-start bg-[#f3f4f5] py-[16px] px-[24px] text-[14px] font-normal leading-[20px] rounded-2xl w-full max-w-[700px]">
                      <div>
                        <svg
                          width="24"
                          height="26"
                          viewBox="0 0 24 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="2.25"
                            cy="14.25"
                            r="2.25"
                            fill="#1C1C1F"
                            fillOpacity="0.3"
                          >
                            <animate
                              attributeName="fill"
                              values="#1C1C1F; #707070; #1C1C1F"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          <circle cx="10.5" cy="14.25" r="3" fill="#707070">
                            <animate
                              attributeName="fill"
                              values="#707070; #1C1C1F; #707070"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </circle>
                          <circle cx="20.25" cy="14.25" r="3.75" fill="#1C1C1F">
                            <animate
                              attributeName="fill"
                              values="#1C1C1F; #707070; #1C1C1F"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="r"
                              values="3.75; 4; 3.75"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (

                  <div className="flex items-start w-full gap-2">
                    <div className="text-start bg-[#f3f4f5] py-[16px] px-[24px] text-[14px] font-normal leading-[20px] rounded-2xl w-full max-w-[700px]">
                      <div className="flex flex-col gap-2">
                        <p className="mb-2">Here is your sales by category in 2022</p>

            
                          {generateTable(item.answer.answer)}
                          {/* {generateTable(testData)} */}

                          
                           <DropDownButton />

                           <ToastContainer />
                   
                           {item.answer.num_rows >= 10 ? (
                              <p className="mb-0">
                                The total amount of rows is {item.answer.num_rows}. In order to see full info,
                                please pick the download icon on the right panel of the answer.
                              </p>
                            ) : null}

                       
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                    <img
                      onClick={() => notify("Download Successfully !!")}
                      src="/assets/home/download.svg"
                      alt="download"
                      className="cursor-pointer"
                      width={16}
                      height={16}
                    />
                      <img
                       onClick={() => notify("Email was successfully sent")}
                        src="/assets/home/emailLogo.svg"
                        alt="emailLogo"
                        className="cursor-pointer"
                        width={16}
                        height={16}
                      />
                      {/* <img
                        onClick={() => notify("Email was successfully sent")}
                        src="/assets/home/handThumbup.svg"
                        alt="handthumbup"
                        className="cursor-pointer"
                        width={16}
                        height={16}
                      /> */}
                     <img
                          
                          onClick={() => handleClick(item,  item.answer.request_id)} // Pass the required request ID for each item
                          src="/assets/home/handThumbup.svg"
                          alt="handthumbup"
                          className="cursor-pointer"
                          width={16}
                          height={16}
                          id={`likeButton_${item.answer.request_id}`} // Add a dynamic ID to the image element
                        />
                      <img
                        onClick={() => notify("Email was successfully sent to support team")}

                        src="/assets/home/warning.svg"
                        alt="warning"
                        className="cursor-pointer"
                        width={16}
                        height={16}
                      />
                    </div>

                  </div>


                )}


                <div ref={scrollRef} />
              </div>
            ))}




          </div>
        </div>
      ) : (
        <HowHelpToday />
      )}
      <div
        className="flex items-center justify-center gap-2 w-full"
        style={{
          borderTop: "1px solid #f4f4f8",
          padding: "20px 56px 30px 56px",
        }}
      >
        <div className="w-full relative">
          <input
            value={selectedQuestion}
            onChange={handleInputChange}
            type="text"
            placeholder="Enter your question here"
            className="text-[14px] leading-[20px] font-medium font-[Montserrat, sans-serif] border-none bg-[#f7f8f8] px-[16px] py-[12px] pr-[50px] pl-[16px] rounded-[22px] text-[#000] outline-none placeholder:text-[#1c1c1f99] w-full"
          />

          <img
            src="/assets/chatbox/mic.svg"
            alt="mic"
            className="cursor-pointer absolute right-[15px] top-[10px]"
          />
        </div>
        <img
          src={
            selectedQuestion && selectedQuestion.length > 0
              ? "/assets/chatbox/sendColor.svg"
              : "/assets/chatbox/send.svg"
          }
          alt="send"
          className="cursor-pointer send-icon"
          onClick={selectedQuestion && selectedQuestion.length > 0 ? handleAskQuestion : ''}
        />
      </div>
    </>
  );
};

Home.propTypes = {
  askQuestionsData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Home;
