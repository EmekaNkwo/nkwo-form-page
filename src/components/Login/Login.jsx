import { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "./context/AuthContext";
import "./Login.css";
import axios from "./api/axios";

//This is the Url of the login...Needs Nodejs to run
const LOGIN_URL = "/auth";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMesg, setErrorMesg] = useState("");
  const [success, setSuccess] = useState(false);

  //This makes the error to disappear when the user makes changes to the input
  useEffect(() => {
    setErrorMesg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify(
          { user, pwd },
          {
            headers: { "Content-Type": "application/json" },
            withCreditentials: true,
          }
        )
      );

      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken; //accessToken is the key of the response
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrorMesg("Server is not responding");
      } else if (err.response?.status === 400) {
        setErrorMesg("Wrong username or password"); //error 400 means wrong username or password
      } else if (err.response?.status === 401) {
        setErrorMesg("You are not authorized to access this page"); //error 401 means you are not authorized to access this page
      } else {
        setErrorMesg("Login Failed");
      }
      errRef.current.focus(); //focus on the error message
    }
  };

  const logout = () => {
    setUser("");
    setPwd("");
    setSuccess(false);
  };

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
          <p
            ref={errRef}
            aria-live="assertive"
            className={errorMesg ? "alert alert-danger" : "offscreen"}
          >
            {errorMesg}
          </p>

          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-area">
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  ref={userRef}
                  autoComplete="off"
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
                  ref={userRef}
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Password"
                  onChange={(e) => setPwd(e.target.value)}
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
