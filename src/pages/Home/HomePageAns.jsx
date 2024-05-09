import { useEffect, useRef, useState } from "react";

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
import { postApi } from "../../helper/api/Api";
import { LIST_QUESTIONS } from "../../helper/api/endPoint";
import { ACTION_TYPE } from "../../helper/constant";

const HomePageAns = () => {
  const chatRef = useRef(null);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);

  const getPopularQues = async () => {
    try {
      setLoader(true);
      const dataToSend = {
        action_type: ACTION_TYPE.POPULAR,
      };

      const response = await postApi(LIST_QUESTIONS.POPULAR_QUES, {
        ...dataToSend,
      });

      if (response?.status === CODES.SUCCESS) {
        const newData = response?.data?.data;
        setQuestionsData((prevData) => [
          ...prevData,
          {
            id: prevData.length,
            data: newData,
            type: "chat",
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setData([
      {
        id: 1,
        text: "What were my net sales by category in 2022?",
        type: "user",
      },
      {
        id: 2,
        text: [
          {
            Category: "Clothing",
            "Net Sales Dollars": "$3,720,662.34",
          },
          {
            Category: "Electronics",
            "Net Sales Dollars": "$26,559,829.38",
          },
          {
            Category: "Health & Beauty",
            "Net Sales Dollars": "$948,591.50",
          },
          {
            Category: "Home & Garden",
            "Net Sales Dollars": "$2,184,177.56",
          },
          {
            Category: "Sports & Outdoors",
            "Net Sales Dollars": "$5,522,862.92",
          },
        ],
        type: "chat",
      },
    ]);
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
        <p className="title">Popular questions</p>
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
        <div className="d-flex flex-column justify-content-start m-auto top-container">
          <div
            className="chat-container d-flex flex-column gap-4"
            ref={chatRef}
          >
            {data && data.length > 0
              ? data.map((item) => (
                  <>
                    {item.type === "user" ? (
                      <div
                        key={item.id}
                        className="chat-content d-flex align-items-start gap-3 ms-auto"
                      >
                        <div className="text-start user-bg">
                          <p className="m-0">{item.text}</p>
                        </div>
                      </div>
                    ) : null}
                    {item.type === "chat" ? (
                      <div className="chat-content d-flex flex-column align-items-start gap-3">
                        <div className="text-start user-bg chat-bg">
                          {item.text.map((text, index) => (
                            <div key={index} className="d-flex gap-2">
                              <p className="m-0">{text.Category}: </p>
                              <p className="m-0">
                                <strong>{text["Net Sales Dollars"]}</strong>
                              </p>
                            </div>
                          ))}
                          {/* <button>
                            Explain
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.58594 5.01256C7.36699 4.32915 8.63332 4.32915 9.41436 5.01256C10.1954 5.69598 10.1954 6.80402 9.41436 7.48744C9.27842 7.60639 9.12778 7.70463 8.96755 7.78217C8.47043 8.02276 8.00015 8.44772 8.00015 9V9.5M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM8 11.5H8.005V11.505H8V11.5Z"
                                stroke="#1C1C1F"
                                stroke-width="1.2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button> */}
                        </div>
                        <div className="text-start user-bg chat-bg">
                          <div className="d-flex flex-column gap-2">
                            <p className="mb-2">
                              Here is your sales by category in 2022
                            </p>
                            <table className="mb-2">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Product ID</th>
                                  <th>Product Name</th>
                                  <th>Units Sold</th>
                                  <th>Revenue</th>
                                  <th>Region</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>2024-02-01</td>
                                  <td>001</td>
                                  <td>Laptop</td>
                                  <td>100</td>
                                  <td>$1000.00</td>
                                  <td>North</td>
                                </tr>
                                <tr>
                                  <td>2024-02-01</td>
                                  <td>001</td>
                                  <td>Laptop</td>
                                  <td>100</td>
                                  <td>$1000.00</td>
                                  <td>North</td>
                                </tr>
                                <tr>
                                  <td>2024-02-01</td>
                                  <td>001</td>
                                  <td>Laptop</td>
                                  <td>100</td>
                                  <td>$1000.00</td>
                                  <td>North</td>
                                </tr>
                                <tr>
                                  <td>2024-02-01</td>
                                  <td>001</td>
                                  <td>Laptop</td>
                                  <td>100</td>
                                  <td>$1000.00</td>
                                  <td>North</td>
                                </tr>
                                <tr>
                                  <td>2024-02-01</td>
                                  <td>001</td>
                                  <td>Laptop</td>
                                  <td>100</td>
                                  <td>$1000.00</td>
                                  <td>North</td>
                                </tr>
                              </tbody>
                            </table>
                            <p className="mb-0">
                              The total amount of rows is 534. In order to see
                              full info please pick the download icon on the
                              right panel of the answer
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                ))
              : null}
            {loader ? (
              <div className="d-flex justify-content-center align-items-center gap-2">
                <CircularProgress color="success" size={17} />{" "}
                <span className="loading">Loading...</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="input-chat d-flex align-items-center justify-content-center m-auto gap-2">
          <div className="w-100 position-relative">
            <input type="text" placeholder="Enter your question here" />
            <img src={mic} alt="mic" className="cursor-pointer mic-icon" />
          </div>
          <img src={send} alt="send" className="cursor-pointer send-icon" />
        </div>
      </div>
    </HomeWrapper>
  );
};

export default HomePageAns;
