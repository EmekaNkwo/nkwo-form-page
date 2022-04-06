import { useEffect, useState, useRef, React } from "react";

// import React from "react";
import "./Login.css";

function Login() {
  const userRef = useRef();
  const errRef = useRef;

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMesg, setErrorMesg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  //This makes the error to disappear when the user makes changes to the input
  useEffect(() => {
    setErrorMesg("");
  }, [user, pwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "admin@example.com" && pwd === "admin") {
      setSuccess(true);
    } else {
      setErrorMesg("Invalid username or password");
    }
  };

  const logout = () => {
    setUser("");
    setPwd("");
    setSuccess(false);
  };

  // const handleSubmit = async (e) => {
  //   // This "e.preventDefault prevents the page from reloading"
  //   e.preventDefault();
  //   console.log(user, pwd);

  //   //This clears out the values of the inputs of pwd and user
  //   setUser("");
  //   setPwd("");
  //   setSuccess(true);
  // };

  return (
    <div className="container-fluid">
      {success ? (
        <div className="alert alert-success">
          <strong>Success!</strong> You have logged in successfully.
          <button type="submit" className="btn btn-primary" onClick={logout}>
            LogOut
          </button>
        </div>
      ) : (
        <div>
          <p></p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-area">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Email Address"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => setPwd(e.target.value)}
                  ref={userRef}
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Password"
                  value={pwd}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Login;
