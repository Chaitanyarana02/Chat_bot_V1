import PropTypes from "prop-types";
import HowHelpToday from "./HowHelpToday";
import DropDownButton from "./DropDownButton";
import Warning from "./Warning";
import './home.css'

//notification toaster
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

import authenticateAndSaveCredentials from "../../../helper/awsAuth";
import AskQuestion from "../../awsFunctions/AskQuestion";
import LogIssu from "../../awsFunctions/LogIssue";
import ExplainAnswer from "../../awsFunctions/ExplainAns";

import { useRef, useState, useEffect } from "react";

import { MdCheckCircle } from 'react-icons/md'; // Import the success icon
import { json } from "react-router-dom";


const Home = ({ selectedQuestion, setSelectedQuestion, onAskQuestionData ,onExplainationData ,onPassingData }) => {
  const [askQuestionsData, setAskQuestionsData] = useState([]);
  const [landinDeisgn, setLandingDesign] = useState(true);
  const [passQuasation, setPassQuasation] = useState();




  //AskQuestion page 
  const [answerDataHistory, setAnswerDataHistory] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([]);

  const scrollRef = useRef(null);
  const prevAnswerDataRef = useRef();


  // Geting value from Warning
  const [issues, setIssue]  = useState('');
  const [otherIssue, setOtherIssue]  = useState('');
  const [required_id, setRequiredId]  = useState();
  const [showPopup, setShowPopup] = useState(false);

  //explaination state
  const [explaination, setShowExplainationPopup] = useState(false);
  const [explainationData, setExplainationData] = useState([]);

  



  const handleInputChange = (event) => {
    setSelectedQuestion(event.target.value);
  };


  const notify = (Message) => {
    toast.success(Message, {
      position: "top-right", // Position the toast at the top-right corner
      autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM15.6103 10.1859C15.8511 9.84887 15.773 9.38046 15.4359 9.1397C15.0989 8.89894 14.6305 8.97701 14.3897 9.31407L11.1543 13.8436L9.53033 12.2197C9.23744 11.9268 8.76256 11.9268 8.46967 12.2197C8.17678 12.5126 8.17678 12.9874 8.46967 13.2803L10.7197 15.5303C10.8756 15.6862 11.0921 15.7656 11.3119 15.7474C11.5316 15.7293 11.7322 15.6153 11.8603 15.4359L15.6103 10.1859Z" fill="#55C54B" />
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


  // is Like Flag
  const handleClick = (item, requiredRequestId) => {
    if (item.answer && item.answer.request_id === requiredRequestId) {
      const img = document.getElementById(`likeButton_${item.answer.request_id}`);
      if (img.src.endsWith("/assets/home/darkThumbh.svg")) {
        img.src = "/assets/home/handThumbup.svg";

      } else {
        img.src = "/assets/home/darkThumbh.svg";
      }
    }
  };


  //handle Validation

  const handleWarning = ( item , required_id) => {
    if (item.answer && item.answer.request_id === required_id) {
    setRequiredId(required_id);
    setShowPopup(!showPopup);
    }
  } 
  const closeWarning = () =>{
    setShowPopup(!showPopup);

  } 

  


  const getIssu = (  issue  ) => {    
      setIssue(issue );
  } 
  const getOtherIssue = ( other ) => {    
    setOtherIssue(other);
} 

  const sendIssu = async () =>{
    const credentials = await authenticateAndSaveCredentials();
    LogIssu(credentials, required_id , issues ,otherIssue);
    setShowPopup(!showPopup);
  }



  // Handle Explain

  const explaiNation = (require_id) => {
    setRequiredId(require_id);
    setShowExplainationPopup(true);
  } 
  const closeExplainantion = () => {
    setRequiredId('');
    setShowExplainationPopup(false);
  }

  const sendExplaination = async () => {
    onPassingData(true);
    closeExplainantion();
    const credentials = await authenticateAndSaveCredentials();
    const response =  await ExplainAnswer(credentials, required_id);
    setExplainationData(JSON.parse(response.body));
    onExplainationData(JSON.parse(response.body));
    
    onPassingData(false);

  }



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
                className={`py-2 px-4 text-xs font-semibold leading-4 text-white ${index === 0 ? "rounded-tl-2xl" : ""
                  } ${index === columns.length - 1 ? "rounded-tr-2xl" : ""
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



// Handle Enter Key press
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    // Call your function here
    handleAskQuestion();
  }
};


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
                    <div className="text-start bg-[#f3f4f5] py-[14px] pl-[18px] pr-[3px] text-[14px] font-normal leading-[20px] rounded-2xl w-full max-w-[700px]"style={{ borderRadius: "18px 18px 18px 0px " }}>
                    <svg
                      width="50"
                      height="18"
                      viewBox="0 0 120 40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="15" cy="20" r="3" fill="lightgray">
                        <animate
                          attributeName="fill"
                          values="lightgray; black; lightgray"
                          dur="1s"
                          repeatCount="indefinite"
                          keyTimes="0; 0.5; 1"
                          keySplines="0.42, 0, 0.58, 1; 0.42, 0, 0.58, 1"
                          begin="0s" // Start animation immediately
                        />
                        <animate
                          attributeName="r"
                          values="3; 7; 3"
                          dur="1s"
                          repeatCount="indefinite"
                          keyTimes="0; 0.5; 1"
                          keySplines="0.42, 0, 0.58, 1; 0.42, 0, 0.58, 1"
                          begin="0s" // Start animation immediately
                        />
                      </circle>
                      <circle cx="40" cy="20" r="3" fill="lightgray">
                        <animate
                          attributeName="fill"
                          values="lightgray; black; lightgray"
                          dur="1s"
                          repeatCount="indefinite"
                          keyTimes="0; 0.5; 1"
                          keySplines="0.42, 0, 0.58, 1; 0.42, 0, 0.58, 1"
                          begin="0.3s" // Delay animation for 0.3 seconds
                        />
                        <animate
                          attributeName="r"
                          values="3; 7; 3"
                          dur="1s"
                          repeatCount="indefinite"
                          keyTimes="0; 0.5; 1"
                          keySplines="0.42, 0, 0.58, 1; 0.42, 0, 0.58, 1"
                          begin="0.3s" // Delay animation for 0.3 seconds
                        />
                      </circle>
                      <circle cx="65" cy="20" r="3" fill="lightgray">
                        <animate
                          attributeName="fill"
                          values="lightgray; black; lightgray"
                          dur="1s"
                          repeatCount="indefinite"
                          keyTimes="0; 0.5; 1"
                          keySplines="0.42, 0, 0.58, 1; 0.42, 0, 0.58, 1"
                          begin="0.6s" // Delay animation for 0.6 seconds
                        />
                        <animate
                          attributeName="r"
                          values="3; 7; 3"
                          dur="1s"
                          repeatCount="indefinite"
                          keyTimes="0; 0.5; 1"
                          keySplines="0.42, 0, 0.58, 1; 0.42, 0, 0.58, 1"
                          begin="0.6s" // Delay animation for 0.6 seconds
                        />
                      </circle>
                    </svg>

                      </div>
                    </div>
                
                ) : (

                  <div className="flex items-start w-full gap-2">
                    <div className="text-start bg-[#f3f4f5] py-[16px] px-[24px] text-[14px] font-normal leading-[20px] rounded-2xl w-full max-w-[700px]"style={{ borderRadius: "18px 18px 18px 0px" }}>
                      <div className="flex flex-col gap-2">
                        <p className="mb-2">Here is your sales by category in 2022</p>


                        {generateTable(item.answer.answer)}
                        {/* {generateTable(testData)} */}

                      
                      <div className="flex gap-2">
                      <DropDownButton   />
                        <button onClick={() => explaiNation(item.answer.request_id)} className="bg-white w-[120px] px-4 py-2 text-black rounded-full flex items-center gap-2 justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-gray-100"> Explain 
                                <span className="ml-1">
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.58594 4.01256C6.36699 3.32915 7.63332 3.32915 8.41436 4.01256C9.19541 4.69598 9.19541 5.80402 8.41436 6.48744C8.27842 6.60639 8.12778 6.70463 7.96755 6.78217C7.47043 7.02276 7.00015 7.44772 7.00015 8V8.5M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7ZM7 10.5H7.005V10.505H7V10.5Z" stroke="#1C1C1F" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg></span> 
                       </button>
                      </div>
                       
                      {explaination && ( 
                                    <div className="cover-window">
                                      <div className="popup-container  w-[500px]  mx:w-[100%]">
                                          <div className="popup-header text-center mb-4 font-semibold leading-7 ">Please confirm you'd like <br/>  to  get an explanation?</div>
                                          <div className="popup-content  text-center text-[16px] leading-6 mb-3">Crafting one might require some time.<br/> 
In the left panel you will see an explanation of why this answer was given and how it was calculated </div>
                                        
                                          <div className="popup-buttons mt-[30px] mb-2 ">
                                            <button className="popup-button text-[14px] border-black border-solid border px-[40px] rounded-full font-semibold "  onClick={closeExplainantion} >Cancel</button>
                                            <button className="popup-button text-[14px] bg-black text-white border-none px-[40px] rounded-full "   onClick={sendExplaination}  >Confirm</button>
                                          </div>
                                        </div>
                                    </div>
                                      
                                      )}
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

                        onClick={() => handleClick(item, item.answer.request_id)} // Pass the required request ID for each item
                        src="/assets/home/handThumbup.svg"
                        alt="handthumbup"
                        className="cursor-pointer"
                        width={16}
                        height={16}
                        id={`likeButton_${item.answer.request_id}`} // Add a dynamic ID to the image element
                      />
                      <img
                        // onClick={() => notify("Email was successfully sent to support team")}
                        onClick={ () => {handleWarning( item , item.answer.request_id)}}
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



            {showPopup && required_id && ( 
                <div className="cover-window">
                  <div className="popup-container  w-[500px]  mx:w-[100%]">
                      <div className="popup-header text-center mb-4 font-semibold ">Tell us more</div>
                      <div className="popup-content  text-center text-[16px] mb-3">AI responses are validated through various methods to ensure accuracy and reliability. If you encounter any issues or have further questions, you can send <br/> a message to our support team </div>
                      <div className="popup-header flex flex-col text-left text-[14px] font-semibold mt-[23px] mb-1 px-4">What problem did you face?
                      <Warning onWarning={getIssu} getOtherIssue={getOtherIssue} />
                      </div>
                  
                      <div className="popup-buttons mt-[23px] mb-3">
                        <button className="popup-button text-[14px] border-black border-solid border px-[40px] rounded-full font-semibold "  onClick={closeWarning} >Cancel</button>
                        <button className="popup-button text-[14px] bg-black text-white border-none px-[40px] rounded-full "   onClick={sendIssu}  >Send report</button>
                      </div>
                    </div>
                </div>
                  
                  )}
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
            onKeyPress={handleKeyPress}
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
