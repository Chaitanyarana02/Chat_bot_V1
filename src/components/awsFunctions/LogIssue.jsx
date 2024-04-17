import "../../helper/init";
import AWS from "aws-sdk";

const callLambdaFunction = async (credentials, request_id ,reason_text ,reason_other_text) => {
  const lambda = new AWS.Lambda({ credentials });
  const params = {
    FunctionName: "logIssue",
    Payload: JSON.stringify({
      request_id: request_id,
      reason_text: reason_text,
      reason_other_text:reason_other_text
    }),
  };

  return new Promise((resolve, reject) => {
    lambda.invoke(params, function (err, data) {
      if (err) {
        console.error("Error calling Lambda:", err);
        reject(err);
      } else {
        const response = JSON.parse(data.Payload);
        // console.log("Lambda response:", response);
        resolve(response);
      }
    });
  });
};

export default callLambdaFunction;
