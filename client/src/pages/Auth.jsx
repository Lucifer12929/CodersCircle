import React, { useEffect } from "react";
import style from "../css/pages/login.module.css";
import { Button } from "@pankod/refine-mui";
import provider from "../config/axios.js";

//login imports
import { useGoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Navigate, useNavigate } from "@pankod/refine-react-router-v6";
import logo from "../images/logo.png";

const Auth = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const clientId =
    "237232885156-9dbmfrasv99j40ihc6srse5rjjrutm8m.apps.googleusercontent.com";

  useEffect(() => {
    if (token) {
      return <Navigate to="/app" replace />;
    }

    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, [token, clientId]);

  const onFailure = (err) => {
    if (err.details === "Cookies are not enabled in current environment.") {
      alert("Please enable cookies");
    } else {
      console.error("Login failed:", err);
    }
  };

  const onSuccess = async (data) => {
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
        navigate("/complete/" + res.data.userId, {
          state: { email, givenName, familyName, imageUrl },
        });
      } else if (res.status === 200) {
        localStorage.setItem("token", res.data.userId);
        alert("You are logged in");
        window.location.href = "/app";
      }
    } catch (error) {
      console.error("Authentication error:", error);
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
            onClick={signIn}
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
