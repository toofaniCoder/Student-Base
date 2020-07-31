import React, { useState } from "react";
import Input from "../layout/Input";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();
  const firebase = useFirebase();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await firebase.login(user);
    history.replace("/");
  };
  return (
    <div className="container">
      <div className="py-5">
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <div className="card shadow">
              <div className="card-body">
                <img
                  src={require("../../assets/logo.svg")}
                  alt="logo"
                  className="card-img-top mb-5"
                  height="70px"
                />
                <form onSubmit={submitForm}>
                  <div className="form-group">
                    <Input
                      name="email"
                      placeholder="Enter Your E-mail"
                      value={user.email}
                      onChange={onInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Your Password"
                      value={user.password}
                      onChange={onInputChange}
                    />
                  </div>
                  <button className="btn btn-primary btn-block">
                    Login to dashboard
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
