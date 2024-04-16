import PropTypes from "prop-types";
import authenticateAndSaveCredentials from "../../helper/awsAuth";
import AskQuestion from "../awsFunctions/AskQuestion";
import { useState } from "react";

const EnterQuestion = ({
  selectedQuestion,
  setSelectedQuestion,
  onAskQuestionData,
}) => {
  const [askQuestionsData, setAskQuestionsData] = useState([]);

  const handleInputChange = (event) => {
    setSelectedQuestion(event.target.value);
  };

  const handleAskQuestion = async (question) => {
    try {
      setSelectedQuestion("");

      const credentials = await authenticateAndSaveCredentials();
      const response = await AskQuestion(credentials, question);
      const askQuestions = JSON.parse(response.body);

      setAskQuestionsData(askQuestions);
      onAskQuestionData(askQuestions);
      // console.log("handle ask questions =", askQuestions);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
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
            selectedQuestion
              ? "/assets/chatbox/sendColor.svg"
              : "/assets/chatbox/send.svg"
          }
          alt="send"
          className="cursor-pointer send-icon"
          onClick={() => handleAskQuestion(selectedQuestion)}
        />
      </div>
    </>
  );
};

EnterQuestion.propTypes = {
  selectedQuestion: PropTypes.string.isRequired,
  setSelectedQuestion: PropTypes.func.isRequired,
  onAskQuestionData: PropTypes.func.isRequired,
};

export default EnterQuestion;
