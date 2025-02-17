import  { useContext, useState } from "react";
import "./Loginpopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import PropTypes from 'prop-types';

const LoginPopup = ({ setShowLogin }) => {
  // Use this url for the login component
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");

  // save the user's name, email & password
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // onChangeHandler that takes the data from input field and save it in the state variable.
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // set the data in the state variable
    setData((data) => ({ ...data, [name]: value }));
  };

  // User login function
  const onLogin = async (e) => {
    e.preventDefault();

    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    // Call the api
    const response = await axios.post(newUrl, data);

    // if the response is true that means we are logged-in/registered so we get 1 token
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              value={data.name}
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            onChange={onChangeHandler}
            value={data.email}
            name="email"
            type="email"
            placeholder="Your email"
            required
          />
          <input
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};
LoginPopup.propTypes = {
  setShowLogin: PropTypes.string.isRequired, // Ensure 'category' is a string and is required
};
export default LoginPopup;
