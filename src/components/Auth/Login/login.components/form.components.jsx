import React, { useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button, Form, FormGroup } from "reactstrap";

import { LoginContext } from "../login.main";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState("password");
  const {
    setLoginCred,
    loginCred,
    loginCred: { email, password },
    loginUser
  } = useContext(LoginContext);
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        loginUser({
          variables: {
            loginCred
          }
        });
      }}
    >
      <FormGroup>
        <input
          value={email}
          onChange={e => setLoginCred({ ...loginCred, email: e.target.value })}
          type="text"
          className="form-control form-control-lg"
          name="email"
          placeholder="Email"
          id="email"
          required
        />
      </FormGroup>
      <FormGroup className="password-input">
        <input
          value={password}
          onChange={e =>
            setLoginCred({ ...loginCred, password: e.target.value })
          }
          type={showPassword}
          className="form-control form-control-lg"
          name="password"
          placeholder="Password"
          id="password"
          required
        />
        <div>
          {(showPassword === "text" && (
            <IoMdEye onClick={() => setShowPassword("password")} />
          )) || <IoMdEyeOff onClick={() => setShowPassword("text")} />}
        </div>
      </FormGroup>
      <Button className="btn--animated cars45-btn primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
