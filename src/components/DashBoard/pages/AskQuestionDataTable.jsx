import PropTypes from "prop-types";
import DropDownButton from "./DropDownButton";
import { useEffect, useState, useRef } from "react";
import CircularProgress from '@mui/material/CircularProgress';


const AskQuestionDataTable = ({ answerData }) => {
  const [answerDataHistory, setAnswerDataHistory] = useState([]);
  const scrollRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    const isDuplicate = answerDataHistory.length > 0 &&
      JSON.stringify(answerData) === JSON.stringify(answerDataHistory[answerDataHistory.length - 1]);

    if (!isDuplicate) {
      setAnswerDataHistory(prevHistory => [...prevHistory, answerData]);
    }
    setIsLoading(false);

  }, [answerData, answerDataHistory]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [answerDataHistory]);

  return (
    <>
      <div className="flex flex-col gap-4 overflow-y-auto w-full px-[40px]" style={{ height: "calc(100vh - 20vh)" }}>
        {answerDataHistory.map((message, index) => (
          index !== 0 &&
          <div className="flex flex-col text-start gap-4 w-full" key={index}>
            <div className="flex items-start gap-3 ms-auto">
              <div className="text-start bg-[#c4f0f2] py-[16px] px-[24px] font-normal leading-[20px] max-w-[700px]" style={{ borderRadius: "18px 18px 0px 18px" }}>
                <p className="text-[14px] font-normal leading-[22px] tracking-normal m-0">{message.question}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="text-start bg-[#f3f4f5] py-[16px] px-[24px] text-[14px] font-normal leading-[20px] rounded-2xl w-full max-w-[700px]">
                <div className="flex flex-col gap-2">
                  <p className="mb-2">Here is your sales by category in 2022</p>

                  {message.answer && (
                    <table className="mb-2">
                      <thead>
                        <tr className="bg-[#1c1c1f]">
                          {message.answer.map((item, index) => (
                            <th
                              key={index}
                              className={`py-2 px-4 text-xs font-semibold leading-4 text-white ${
                                index === 0 ? "rounded-tl-2xl" : ""
                              } ${
                                index === message.answer.length - 1 ? "rounded-tr-2xl" : ""
                              }`}
                            >
                              {item.Category}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-[#f6f7f8]">
                          {message.answer.map((item, index) => (
                            <td
                              key={index}
                              className="bg-[#fff] py-[8px] px-[16px] font-normal leading-[14.63px]"
                            >
                              {item["Net Sales Dollars"]}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  )}

                  <DropDownButton />

                  <p className="mb-0">
                    The total amount of rows is {message.num_rows}. In order to see full info please pick the download icon on the right panel of the answer
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <img src="/assets/home/download.svg" alt="download" className="cursor-pointer" width={16} height={16} />
                <img src="/assets/home/emailLogo.svg" alt="emailLogo" className="cursor-pointer" width={16} height={16} />
                <img src="/assets/home/handThumbup.svg" alt="handthumbup" className="cursor-pointer" width={16} height={16} />
                <img src="/assets/home/warning.svg" alt="warning" className="cursor-pointer" width={16} height={16} />
              </div>
            </div>
          </div>
        ))}
      {isLoading ? (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    {/* Render your content here */}
                    <div ref={scrollRef} />
                </div>
            )}
         <div ref={scrollRef} />
      </div>
    </>
  );
};

AskQuestionDataTable.propTypes = {
  answerData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default AskQuestionDataTable;
