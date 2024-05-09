import { useEffect, useState } from "react";

// style
import { HomeWrapper } from "./HomePage.style";

// Icons
import logo from "../../assets/images/logo-small.svg";
import bag from "../../assets/images/bag.svg";
import browser from "../../assets/images/browser.svg";
import exit from "../../assets/images/exit.svg";
import chat from "../../assets/images/chat.svg";
import mic from "../../assets/images/mic.svg";
import send from "../../assets/images/send.svg";
// import { postApi } from "../../helper/api/Api";
// import { LIST_QUESTIONS } from "../../helper/api/endPoint";
// import { ACTION_TYPE } from "../../helper/constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LambdaCallSuggestion from "./LambdaCallSuggestion";
import AskQuestion from "./AskQuestion";
import ExplainAnswer from "./ExplainAnswer";
import LogThumbsUp from "./LogThumbsUp";

const HomePage = () => {
  const navigate = useNavigate();
  // const [loader, setLoader] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [response, setResponse] = useState("");

  const { suggestQuestion } = LambdaCallSuggestion();
  const { askQuestion } = AskQuestion();
  const { explainAnswer } = ExplainAnswer();
  const { logThumbsUp } = LogThumbsUp();

  // const getPopularQues = async () => {
  //   try {
  //     setLoader(true);
  //     const dataToSend = {
  //       action_type: ACTION_TYPE.POPULAR,
  //     };

  //     const response = await postApi(LIST_QUESTIONS.POPULAR_QUES, {
  //       ...dataToSend,
  //     });

  //     console.log(response);

  //     if (response?.status === CODES.SUCCESS) {
  //       const newData = response?.data?.data;
  //       setQuestionsData((prevData) => [
  //         ...prevData,
  //         {
  //           id: prevData.length,
  //           data: newData,
  //           type: "chat",
  //         },
  //       ]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  useEffect(() => {
    // getPopularQues();

    setQuestionsData([
      {
        question_text: "what were my net sales by category in 2022?",
      },
      {
        question_text: "in 2022 how many ipads were sold?",
      },
      {
        question_text: "how many total products do we have in our catalog?",
      },
      {
        question_text:
          "What were sales last week in the mid Atlantic district?",
      },
      {
        question_text:
          "what were my top selling products in the mid Atlantic district last year?",
      },
    ]);
  }, []);

  return (
    <HomeWrapper className="d-flex align-items-start">
      <div className="sidebar d-flex flex-column justify-content-center">
        <img src={logo} alt="logo" className="cursor-pointer logo" />
        <img src={bag} alt="bag" className="cursor-pointer" />
        <img src={browser} alt="browser" className="cursor-pointer mt-4" />
        <img src={exit} alt="exit" className="cursor-pointer mt-auto" />
      </div>

      <div className="popular-ques">
        <p className="title" onClick={logThumbsUp}>
          Popular questions
        </p>
        <div className="threads-container">
          {questionsData.map((question, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-start mb-2 gap-3 bg-white white-card cursor-pointer"
            >
              <img src={chat} alt="chat" className="chat-icon" />
              <div className="chat-content">{question.question_text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="message-chat h-100 w-100">
        <div className="d-flex flex-column align-items-center justify-content-center m-auto top-container">
          <img
            src={logo}
            alt="logo"
            className="cursor-pointer"
            width={"56px"}
            height={"56px"}
          />
          <p className="mt-3">How can I help you today?</p>
        </div>
        <div className="input-chat d-flex align-items-center justify-content-center m-auto gap-2">
          <div className="w-100 position-relative">
            <input type="text" placeholder="Enter your question here" />
            <img src={mic} alt="mic" className="cursor-pointer mic-icon" />
          </div>
          <img
            src={send}
            alt="send"
            className="cursor-pointer send-icon"
            onClick={() => navigate("/home-ans")}
          />
        </div>
      </div>
    </HomeWrapper>
  );
};

export default HomePage;
