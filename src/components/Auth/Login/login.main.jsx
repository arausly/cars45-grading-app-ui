import React, { useState, createContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Card } from "reactstrap";

/**custom components*/
import Form from "./login.components/form.components";
import { CustomLoader } from "../../shared";
import { withNotifier } from "../../shared/Notifications/notification.main";

//graphql
import { loginMutation } from "./login.graphql";

//utils
import { setItem } from "../../../handlers/storage.handler";

export const LoginContext = createContext();

const Login = ({
  notifyFailure,
  notifySuccess,
  history,
  match: {
    params: { role = "center" }
  }
}) => {
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });
  const [loginUser, { data, error, loading }] = useMutation(loginMutation);

  if (error) {
    notifyFailure("Failed to login, Please try again");
  }

  if (data && data.login) {
    setItem(`${role}Token`, data.login.token);
    notifySuccess("Successfully logged in");
    history.push("/");
  }

  return (
    <LoginContext.Provider
      value={{
        setLoginCred,
        loginCred,
        loginUser
      }}
    >
      <div className="row justify-content-md-center p-t-28 login-wrapper">
        {loading && !error && <CustomLoader />}
        <span className="backdrop" />
        <p>IntelliBuy</p>
        <div className="col col-md-6">
          <Card>
            <div className="cars45-image-box">
              <img
                src="/images/cars45-logo.jpg"
                loading="lazy"
                width="80px"
                height="80px"
                alt="cars45 logo"
              />
            </div>
            <Form />
          </Card>
        </div>
      </div>
    </LoginContext.Provider>
  );
};

export default withNotifier(Login);
