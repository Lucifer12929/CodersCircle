import React, { useEffect, useState } from "react";
import style from "../css/pages/login.module.css";
import { Button } from "@pankod/refine-mui";
import provider from "../config/axios.js";
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Navigate, useNavigate } from "@pankod/refine-react-router-v6";
import logo from "../images/logo.png";
import LoginLoader from "../components/LoginLoader.jsx";

const Auth = () => {
  const [loading, setLoading] = useState(false); // State for tracking loading
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const clientId =
    "237232885156-9dbmfrasv99j40ihc6srse5rjjrutm8m.apps.googleusercontent.com";

  useEffect(() => {
    if (token) {
      return <Navigate to="/app" replace />;
    }

    function start() {
      gapi.client
        .init({
          clientId: clientId,
          scope: "email",
        })
        .then(() => {
          console.log("GAPI client initialized");
        })
        .catch((err) => {
          console.error("Error initializing GAPI client:", err);
        });
    }
    gapi.load("client:auth2", start);
  }, [token, clientId]);

  const onFailure = (err) => {
    setLoading(false);
    if (err.details === "Cookies are not enabled in current environment.") {
      alert("Please enable cookies");
    } else {
      console.error("Login failed:", err);
    }
  };

  const onSuccess = async (data) => {
    setLoading(true);
    const { profileObj } = data;
    const { email, givenName, familyName, imageUrl } = profileObj;

    try {
      const res = await provider.post("/user/auth", {
        email,
        firstname: givenName,
        lastname: familyName,
        avatar: imageUrl,
      });

      if (res.status === 201) {
        alert("Please complete your profile");
        setLoading(false);
        navigate("/complete/" + res.data.userId, {
          state: { email, givenName, familyName, imageUrl },
        });
      } else if (res.status === 200) {
        localStorage.setItem("token", res.data.userId);
        alert("You are logged in");
        setLoading(false);
        window.location.href = "/app";
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Authentication error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const signInAsGuest = async () => {
    setLoading(true);
    const date = new Date().toISOString();
    const guestUser = {
      email: `guest_${date}@guest.com`,
      firstname: "Guest",
      lastname: date,
      avatar: "", // No avatar for guest
    };
    function generateGuestInfo(date) {
      return {
        email: `guest_${date}@guest.com`,
        givenName: "Guest",
        familyName: date,
        imageUrl:
          "https://cdn0.iconfinder.com/data/icons/online-shop-equitment-gliph/32/line-2_on_going_logo-02-512.png",
      };
    }

    const { email, givenName, familyName, imageUrl } = generateGuestInfo(date);
    try {
      const res = await provider.post("/user/auth", guestUser);

      if (res.status === 201) {
        alert("Please complete your profile");
        setLoading(false);

        navigate("/complete/" + res.data.userId, {
          state: { email, givenName, familyName, imageUrl },
        });
      } else if (res.status === 200) {
        localStorage.setItem("token", res.data.userId);
        alert("You are logged in");
        setLoading(false);
        window.location.href = "/app";
      }
    } catch (error) {
      setLoading(false);
      console.error(
        "Authentication error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
    onFailure,
    cookiePolicy: "single_host_origin",
  });

  return (
    <div className={style.container}>
      {loading && <LoginLoader />}
      <div className={style.left}>
        <header>
          <div className={style.logo_wrapper}>
            <img src={logo} alt="Logo" />
          </div>
          <h3>Welcome User</h3>
          <p>Please enter your details</p>
        </header>
        <form className={style.form_auth}>
          <Button
            onClick={() => {
              setLoading(true);
              signIn();
            }}
            className={style.googleBth}
            sx={{
              color: "#CCCCCC",
              fontFamily: "Poppins",
              textTransform: "capitalize",
              border: "1px solid #344454",
              padding: "7px 0",
            }}
            disableElevation
            variant="outlined"
          >
            <img src="/assets/google-logo.svg" alt="Google Logo" />
            Continue with Google
          </Button>
          <Button
            onClick={() => signInAsGuest()}
            className={style.guestBtn}
            sx={{
              color: "#CCCCCC",
              fontFamily: "Poppins",
              textTransform: "capitalize",
              border: "1px solid #344454",
              padding: "7px 0",
              marginTop: "10px", // Add some space between the buttons
            }}
            disableElevation
            variant="outlined"
          >
            Sign in as Guest
          </Button>
        </form>
      </div>
      <div className={style.right}>
        <img
          src="./auth.svg"
          className={style.auth_img}
          alt="Authentication Illustration"
        />
      </div>
    </div>
  );
};

export default Auth;
