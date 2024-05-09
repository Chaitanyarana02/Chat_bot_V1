import { useState } from "react";

const LogThumbsUp = () => {
  const [response, setResponse] = useState("");

  const loadScript = (script) => {
    return new Promise((resolve, reject) => {
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const logThumbsUp = () => {
    // Load AWS SDK
    const awsSdkScript = document.createElement("script");
    awsSdkScript.src = "https://sdk.amazonaws.com/js/aws-sdk-2.1313.0.min.js";
    awsSdkScript.async = true;

    // Load Amazon Cognito Identity JS
    const cognitoScript = document.createElement("script");
    cognitoScript.src =
      "https://unpkg.com/amazon-cognito-identity-js@5.2.10/dist/amazon-cognito-identity.min.js";
    cognitoScript.async = true;

    // Handle authentication and Lambda call after scripts are loaded
    Promise.all([loadScript(awsSdkScript), loadScript(cognitoScript)])
      .then(() => {
        console.log("AWS SDK and Amazon Cognito Identity JS loaded");

        // Configure AWS SDK
        AWS.config.region = "us-east-2";

        // Configure Cognito User Pool
        const userPool = new AmazonCognitoIdentity.CognitoUserPool({
          UserPoolId: "us-east-2_dJvyPLJny",
          ClientId: "235krv031no94khof8bbju3h64",
        });

        // Authenticate with Cognito User Pool

        const authenticationDetails =
          new AmazonCognitoIdentity.AuthenticationDetails({
            Username: "dmitriy.vanyukov@gmail.com",
            Password: "Qwerty123!",
          });

        const userData = {
          Username: "dmitriy.vanyukov@gmail.com",
          Pool: userPool,
        };

        const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            console.log("Cognito authentication successful");

            // Set AWS credentials with Cognito Identity Pool and user's ID token
            const idToken = result.getIdToken().getJwtToken();
            const credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: "us-east-2:651d38fc-0bd8-4b64-ac1e-44d9730ec693",
              Logins: {
                [`cognito-idp.us-east-2.amazonaws.com/${userPool.getUserPoolId()}`]:
                  idToken,
              },
            });

            // Wait for credentials to be loaded before calling Lambda
            credentials.get((err) => {
              if (err) {
                console.error("Error getting credentials:", err);
                setResponse("Error getting credentials");
                return;
              }

              // Assign the credentials to the AWS SDK
              AWS.config.credentials = credentials;

              // Call AWS Lambda function
              const lambda = new AWS.Lambda();
              const params = {
                FunctionName: "logThumbsUp",
                Payload: JSON.stringify({
                  request_id: "3dbde497-8ef1-4ba8-86d3-ca14edcb29ad",
                }),
              };

              lambda.invoke(params, function (err, data) {
                if (err) {
                  console.error("Error calling Lambda:", err);
                  setResponse("Error calling Lambda");
                } else {
                  const response = JSON.parse(data.Payload);
                  console.log("Lambda response:", response);
                  setResponse(response.body);
                }
              });
            });
          },
          onFailure: function (err) {
            console.error("Cognito authentication failed:", err);
            setResponse("Cognito authentication failed");
          },
        });
      })
      .catch((error) => {
        console.error("Error loading scripts:", error);
      });
  };

  return { logThumbsUp };
};

export default LogThumbsUp;
