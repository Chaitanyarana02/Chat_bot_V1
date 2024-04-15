import PropTypes from "prop-types";
import HowHelpToday from "./HowHelpToday";
import AskQuestionDataTable from "./AskQuestionDataTable";

// import { useEffect } from "react";

const Home = ({ askQuestionsData }) => {
  return (
    <>
      <>
        {askQuestionsData && askQuestionsData.answer ? (
          <div className="flex flex-1 justify-center items-center">
            <AskQuestionDataTable answerData={askQuestionsData} />
          </div>
        ) : (
          <HowHelpToday />
        )}
      </>
    </>
  );
};

Home.propTypes = {
  askQuestionsData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Home;
