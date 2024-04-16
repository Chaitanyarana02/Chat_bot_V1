import "./init";
import AWS from "aws-sdk";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

// Configure AWS
AWS.config.region = "us-east-2";

const authenticateAndSaveCredentials = async () => {
  const userPool = new CognitoUserPool({
    UserPoolId: "us-east-2_dJvyPLJny",
    ClientId: "235krv031no94khof8bbju3h64",
  });

  const authenticationDetails = new AuthenticationDetails({
    Username: "dmitriy.vanyukov@gmail.com",
    Password: "Qwerty123!",
  });

  const userData = {
    Username: "dmitriy.vanyukov@gmail.com",
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async function (result) {
        console.log("Cognito authentication successful");
        const idToken = result.getIdToken().getJwtToken();
        const credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-2:651d38fc-0bd8-4b64-ac1e-44d9730ec693",
          Logins: {
            [`cognito-idp.us-east-2.amazonaws.com/${userPool.getUserPoolId()}`]:
              idToken,
          },
        });

        await credentials.get();
        resolve(credentials);
      },
      onFailure: function (err) {
        console.error("Cognito authentication failed:", err);
        reject(err);
      },
    });
  });
};

export default authenticateAndSaveCredentials;
