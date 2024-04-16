import PropTypes from "prop-types";
import DropDownButton from "./DropDownButton";
import { useEffect, useRef, useState } from "react";

const AskQuestionDataTable = ({ answerData, selectedQuestion }) => {
  const [answerDataHistory, setAnswerDataHistory] = useState([]);
  const [questionsArray, setQuestionsArray] = useState([]);

  const scrollRef = useRef(null);
  const prevAnswerDataRef = useRef();

  // Scroll to the bottom when answerDataHistory changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [answerDataHistory]);

  // Store answerData in history when it changes
  useEffect(() => {
    if (prevAnswerDataRef.current !== answerData) {
      setAnswerDataHistory((prevHistory) => [...prevHistory, answerData]);
      prevAnswerDataRef.current = answerData;
    }
  }, [answerData]);

  // Store unique selected questions
  useEffect(() => {
    if (selectedQuestion.trim() !== "") {
      setQuestionsArray((prevQuestions) => {
        if (!prevQuestions.includes(selectedQuestion)) {
          return [...prevQuestions, selectedQuestion];
        }
        return prevQuestions;
      });
    }
  }, [selectedQuestion]);

  // Log questionsArray
  useEffect(() => {
    console.log(questionsArray);
  }, [questionsArray]);
  
  
  const quotationArray = questionsArray.map((question, index) => (
    <div key={index} className="flex items-start gap-3 ms-auto">
      <div
        className="text-start bg-[#c4f0f2] py-[16px] px-[24px] font-normal leading-[20px] max-w-[700px]"
        style={{ borderRadius: "18px 18px 0px 18px" }}
      >
        <p className="text-[14px] font-normal leading-[22px] tracking-normal m-0">
          {question}
        </p>
      </div>
    </div>
  ));


  return (
    <>
      <div
        className="flex flex-col gap-4 overflow-y-auto w-full px-[40px]"
        style={{ height: "calc(100vh - 20vh)" }}
      >
        { quotationArray}
            

        {answerDataHistory.map((table, index) => (
          <div className="flex flex-col text-start gap-4 w-full" key={index}>
           

            <div className="flex items-start gap-2">
              <div className="text-start bg-[#f3f4f5] py-[16px] px-[24px] text-[14px] font-normal leading-[20px] rounded-2xl w-full max-w-[700px]">
                <div className="flex flex-col gap-2">
                  <p className="mb-2">Here is your sales by category in 2022</p>

                  {table.answer && (
  <table className="mb-2">
    <thead>
      <tr className="bg-[#1c1c1f]">
        {Object.keys(table.answer[0]).map((columnName, index) => (
          <th
            key={index}
            className={`py-2 px-4 text-xs font-semibold leading-4 text-white ${
              index === 0 ? "rounded-tl-2xl" : ""
            } ${
              index === Object.keys(table.answer[0]).length - 1
                ? "rounded-tr-2xl"
                : ""
            }`}
          >
            {columnName}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {table.answer.map((rowData, index) => (
        <tr key={index} className={index % 2 === 0 ? "bg-[#f6f7f8]" : ""}>
          {Object.values(rowData).map((cellData, cellIndex) => (
            <td
              key={cellIndex}
              className="bg-[#fff] py-[8px] px-[16px] font-normal leading-[14.63px]"
            >
              {cellData}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)}

                  <DropDownButton />

                  <p className="mb-0">
                    The total amount of rows is 534. In order to see full info
                    please pick the download icon on the right panel of the
                    answer
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <img
                  src="/assets/home/download.svg"
                  alt="download"
                  className="cursor-pointer"
                  width={16}
                  height={16}
                />
                <img
                  src="/assets/home/emailLogo.svg"
                  alt="emailLogo"
                  className="cursor-pointer"
                  width={16}
                  height={16}
                />
                <img
                  src="/assets/home/handThumbup.svg"
                  alt="handthumbup"
                  className="cursor-pointer"
                  width={16}
                  height={16}
                />
                <img
                  src="/assets/home/warning.svg"
                  alt="warning"
                  className="cursor-pointer"
                  width={16}
                  height={16}
                />
              </div>
              
            </div>
            <div ref={scrollRef} />
          </div>

        ))}
      </div>
    </>
  );
};

AskQuestionDataTable.propTypes = {
  answerData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AskQuestionDataTable;
