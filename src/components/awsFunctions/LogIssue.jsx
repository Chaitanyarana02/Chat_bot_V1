import "../../helper/init";
import AWS from "aws-sdk";
import { ToastContainer, toast } from 'react-toastify';


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


        toast.success("Email was successfully sent to support team", {
          position: "top-right", // Position the toast at the top-right corner
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 12C2.25 6.61522 6.61522 2.25 12 2.25C17.3848 2.25 21.75 6.61522 21.75 12C21.75 17.3848 17.3848 21.75 12 21.75C6.61522 21.75 2.25 17.3848 2.25 12ZM15.6103 10.1859C15.8511 9.84887 15.773 9.38046 15.4359 9.1397C15.0989 8.89894 14.6305 8.97701 14.3897 9.31407L11.1543 13.8436L9.53033 12.2197C9.23744 11.9268 8.76256 11.9268 8.46967 12.2197C8.17678 12.5126 8.17678 12.9874 8.46967 13.2803L10.7197 15.5303C10.8756 15.6862 11.0921 15.7656 11.3119 15.7474C11.5316 15.7293 11.7322 15.6153 11.8603 15.4359L15.6103 10.1859Z" fill="#55C54B" />
          </svg>, // Customize the success icon
          style: {
            fontFamily: "'Montserrat', sans-serif", // Change the font family
            borderRadius: "15px", // Add border radius
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)" // Add box shadow
          },
          className: "success-toast" // Add a custom class for additional styling
        });


        resolve(response);
      }
    });
  });
};

export default callLambdaFunction;
