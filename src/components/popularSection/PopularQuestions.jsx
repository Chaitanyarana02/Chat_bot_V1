import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import authenticateAndSaveCredentials from "../../helper/awsAuth";
import suggestQuestion from "../awsFunctions/SuggestQuestion";
import { useSelector } from "react-redux";
import { selectOption } from "../../features/selectedOption/selectedOptionSlice";

const PopularQuestions = ({ onQuestionSelect ,explainData ,passingFlag }) => {
  const [questionsData, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [entiry, setIsentiry] = useState(true);
  const [optionVisible, setOptionVisible] = useState('');
  const [explanationData , setExplanationData ] = useState([]);

  useEffect( ()=> {

    if(explainData.explanation && !entiry ){
      setExplanationData(explainData.explanation)
    }
 
  },[explainData]);

  const selectedOption = useSelector(
    (state) => state.selectedOption.selectedOption
  );

  useEffect(() => {
    if (selectedOption === "deeper" || selectedOption === "tangential") {



      setExplanationData([]);
      setIsentiry(false);
      // suggestedQuestionApiCalling('');
      setOptionVisible(false);
      suggestedQuestionApiCalling(selectedOption);
      
      setOptionVisible(selectedOption);
    }
  }, [selectedOption]);

  

  useEffect(() => {
    if (isLoading ) {

      if(!optionVisible){
      suggestedQuestionApiCalling();

      }
    }
  }, [isLoading]);


  useEffect(()=>{
    setOptionVisible(false);  
    setIsentiry(false);
  },[passingFlag])


  const suggestedQuestionApiCalling = async (select_type) => {
    try {
      setIsLoading(true);
      const credentials = await authenticateAndSaveCredentials();
      const response = await suggestQuestion(credentials, select_type);
      const questions = JSON.parse(response.body);
      setQuestionsData(questions?.suggested_questions || null);
    setIsLoading(false);

      // dispatch(setQuestionsData(questions.suggested_questions));
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
  };

  const handleQuestionClick = (question) => {
    onQuestionSelect(question);
  };

  const markAsVsisble = () => {
    setExplanationData([]);
    if (optionVisible === "deeper" || optionVisible === "tangential") {
      suggestedQuestionApiCalling('');
    setOptionVisible(false)
    }else{
      setExplanationData([]);
      suggestedQuestionApiCalling('');
      setOptionVisible(false)
    }

  };

  const markAsVsisbleAgain = () => {
    if(passingFlag){
      setIsentiry(true);
    // alert(passingFlag);
    suggestedQuestionApiCalling();
    }else{  
      setExplanationData([]);
      setIsentiry(false);
      suggestedQuestionApiCalling('');
      setOptionVisible(false)
    }
  }

  return (
    <div className="bg-[#f4f4f8] p-[28px] h-screen w-[400px] min-w-[400px]">

      {  optionVisible && explanationData.length == 0 || entiry  ?

        (      
          
          <div className="flex  iteams-center justify-between p-0">
          <p  className="title p-0 text-[18px] font-semibold leading-[30px] whitespace-nowrap tracking-normal text-[#1c1c1f] mb-[36px]">  {entiry ? ( 'Popular Questions') : (selectedOption === 'deeper' ? 'Deeper Suggested Questions' : 'Tangential Suggested Questions')}</p>
          {entiry ? (<></>) : (<> <svg onClick={markAsVsisble} className="mb-[36px] cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15L15 5M5 5L15 15" stroke="#1C1C1F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></>) } 
          

          </div>
          
        
        
        
        )
        : (<p className="title text-[20px] font-semibold leading-[30px] tracking-normal text-[#1c1c1f] mb-[36px]">
          { explanationData.length  == undefined || passingFlag && !entiry?  ( <>
            <div className="flex iteams-center justify-between">
            <h1>Explanation</h1>

            <svg onClick={markAsVsisbleAgain} className="mb-[36px] cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15L15 5M5 5L15 15" stroke="#1C1C1F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            </div>
          </> ) : ("Popular Questions") }</p>)

      }

{ explanationData.length  == undefined ||passingFlag && !entiry   ? (


            <>
              {   passingFlag  ? (
                <div

                className="flex items-center justify-start mb-2 gap-3 bg-white white-card cursor-pointer py-[12px] px-[16px] rounded-[12px]"
              >
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
          </div>) : (   <div className="h-[calc(100% - 60px)] overflow-auto">

                    <div className="flex items-left flex-col justify-start mb-2  bg-white white-card cursor-pointer py-[12px] px-[16px] rounded-[12px]">

                    <div className="font-semibold text-[14px] mt-2 mb-2 ">Question Answered</div>


                    <div className=" text-[14px] mb-0 ">{explanationData.Question}</div>

                    <div className="font-semibold text-[14px] mt-2 mb-2">Logical Steps</div>

                    <ol className="list-decimal">
                    {explanationData.Steps.map((data, index) => (
                      <li
                        key={index}
                        className="flex items-start justify-start mb-2 gap-2 bg-white white-card cursor-pointer  rounded-[12px]"
                      >
                        <span className="text-[13px] mt-[1px]">  {index + 1}.</span>
                        <div className="text-[13px] font-normal leading-[22px] tracking-normal">
                           {data.Step}
                        </div>
                      </li>
                    ))}
                  </ol>



                    </div>


                    </div>)}

            </>

        )

          //blow code Populare condition

          :( <div>
        {isLoading ? (
         <div

         className="flex items-center justify-start mb-2 gap-3 bg-white white-card cursor-pointer py-[12px] px-[16px] rounded-[12px]"
       >
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
        ) : (
          <div>{!questionsData ? (

          <>
         <div

                  className="flex items-center justify-start mb-2 gap-3 bg-white white-card cursor-pointer py-[12px] px-[16px] rounded-[12px]"
                  onClick={() => suggestedQuestionApiCalling(selectedOption)}
                >
                  {/* <img
                    src="/assets/popular/chat.svg"
                    alt="chat"
                    className="chat-icon"
                  /> */}
                  <div className="text-[14px] font-normal leading-[22px] tracking-normal">
                   Question Was Not Avaliable
                  </div>
                </div>
          </>

          ) : (

          <>
             <div className="h-[calc(100% - 60px)] overflow-auto">
              {questionsData.map((question, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start mb-2 gap-3 bg-white white-card cursor-pointer py-[12px] px-[16px] rounded-[12px]"
                  onClick={() => handleQuestionClick(question.question_text)}
                >
                  <img
                    src="/assets/popular/chat.svg"
                    alt="chat"
                    className="chat-icon"
                  />
                  <div className="text-[14px] font-normal leading-[22px] tracking-normal">
                    {question.question_text}
                  </div>
                </div>
              ))}
          </div>
          </>





        )}</div>



        )}
      </div>
    )  }


    </div>
  );
};

PopularQuestions.propTypes = {
  onQuestionSelect: PropTypes.func.isRequired,
};

export default PopularQuestions;
