import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import authenticateAndSaveCredentials from "../../helper/awsAuth";
import suggestQuestion from "../awsFunctions/SuggestQuestion";
import { useSelector } from "react-redux";
import { selectOption } from "../../features/selectedOption/selectedOptionSlice";

const PopularQuestions = ({ onQuestionSelect ,explainData ,passingFlag }) => {
  const [questionsData, setQuestionsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [optionVisible, setOptionVisible] = useState('');

  const [explanationLoader , setexplanationLoader ] = useState(true);
  const [explanationData , setExplanationData ] = useState([]);

  useEffect( ()=> {

    if(explainData && explainData.Question){
      setExplanationData(explainData)
    } 

  },[explainData]);

  const selectedOption = useSelector(
    (state) => state.selectedOption.selectedOption
  );

  useEffect(() => {
    if (selectedOption === "deeper" || selectedOption === "tangential") {
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

  const suggestedQuestionApiCalling = async (select_type) => {
    try {
      setIsLoading(true);
      const credentials = await authenticateAndSaveCredentials();
      const response = await suggestQuestion(credentials, select_type);
      const questions = JSON.parse(response.body);
      setQuestionsData(questions.suggested_questions);
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
      suggestedQuestionApiCalling('');
      setOptionVisible(false)
    }
    
  };  

    
  return (
    <div className="bg-[#f4f4f8] p-[28px] h-screen w-[400px] min-w-[400px]">

      {  optionVisible && explanationData.length == 0   ?

        ( <div className="flex  iteams-center justify-between p-0">
          <p  className="title p-0 text-[18px] font-semibold leading-[30px] whitespace-nowrap tracking-normal text-[#1c1c1f] mb-[36px]">Suggested questions:{selectedOption}</p>
          <svg onClick={markAsVsisble} className="mb-[36px] cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15L15 5M5 5L15 15" stroke="#1C1C1F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          </div>)
        : (<p className="title text-[20px] font-semibold leading-[30px] tracking-normal text-[#1c1c1f] mb-[36px]">
          { explanationData.length  == undefined?  ( <>
            <div className="flex iteams-center justify-between">
            <h1>Explanation</h1>
          
            <svg onClick={markAsVsisble} className="mb-[36px] cursor-pointer" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15L15 5M5 5L15 15" stroke="#1C1C1F" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
            </div>
          
          
          
          
          
          </> ) : ("Popular questions") }</p>)

      }

{ explanationData.length  == undefined ||passingFlag  ? (

  
            <>
              {   passingFlag  ? ( <div>
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
          </div>) : (   <div className="h-[calc(100% - 60px)] overflow-auto">
                            {explanationData.Steps.map((data, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-start mb-2 gap-3 bg-white white-card cursor-pointer py-[12px] px-[16px] rounded-[12px]"
                              >
                                <div className="text-[14px] font-normal leading-[22px] tracking-normal">
                                  {data.Step}
                                </div>
                              </div>
                            ))}
                          </div>)}
            
            </> 
          
        )
      
          //blow code Populare condition
          
          :( <div>
        {isLoading ? (
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
        ) : (

            

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
