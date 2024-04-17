import { Home } from "./pages";
import LeftNavBar from "../navBar/LeftNavBar";
import PopularQuestions from "../popularSection/PopularQuestions";
import EnterQuestion from "../chatBox/EnterQuestion";
import { useState } from "react";

const DashboardLayout = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [askQuestionsData, setAskQuestionsData] = useState([]);
  const [explainData , setExplainData] = useState([]);
  const [passingFlag , setPassingFlag] = useState();

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  const handleAskQuestionData = (askQuestionData) => {
    setAskQuestionsData(askQuestionData);
  };

  const handelExplanation = (explainationDatas) => {
    setExplainData(explainationDatas);
  };
  

  const handlePassingData = (pssingFlag) => {
    setPassingFlag(pssingFlag)
  };

  return (
    <>
      <div className="flex items-start gap-4">
        <div className="min-h-screen">
          <LeftNavBar />
        </div>

        <div className="flex w-full">
          <PopularQuestions onQuestionSelect={handleQuestionSelect} explainData={explainData} passingFlag={passingFlag}  />

          <div className="flex flex-col w-full">
            <Home askQuestionsData={askQuestionsData} selectedQuestion={selectedQuestion}    setSelectedQuestion={setSelectedQuestion} onAskQuestionData={handleAskQuestionData} onExplainationData ={handelExplanation} onPassingData={handlePassingData} />

            {/* <EnterQuestion
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              onAskQuestionData={handleAskQuestionData}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
