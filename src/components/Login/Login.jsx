import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="container-fluid">
      <h1>Login</h1>
      <form action="">
        <div className="input-area">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Email Address"
            />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
