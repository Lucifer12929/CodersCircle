import React, { useEffect, useState } from "react";
import style from "../css/pages/Datacollection.module.css";
import { BsArrowRight } from "react-icons/bs";
import { Button, TextField } from "@pankod/refine-mui";
import { NavLink } from "@pankod/refine-react-router-v6";
import { useParams, useLocation } from "@pankod/refine-react-router-v6";
import provider from "../config/axios.js";

const DataCollection = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      window.location.href = "/app";
    }
  }, [token]);

  const { state } = useLocation();
  const { res } = state || {}; // Safely destructure with fallback to an empty object
  const { id } = useParams();

  const [details, setDetails] = useState({
    firstname: res?.givenName || "",
    lastname: res?.familyName || "",
    bio: "I am full stack developer.",
    username: "",
    email: res?.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  useEffect(() => {
    const username =
      details?.firstname.toLowerCase() + "_" + details?.lastname.toLowerCase();
    setDetails({ ...details, username });
  }, [details.firstname, details.lastname]);

  const handleSubmit = async (e) => {
    try {
      const res = await provider.patch(`/user/${id}`, details);
      alert(res.data.message);
      localStorage.setItem("token", id);
      window.location.href = "/app";
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <nav>
        <div className={style.logo}>
          <NavLink to={"/"}>CodersCircle</NavLink>
        </div>
      </nav>
      <div className={style.container}>
        <header>
          <span>Complete your profile!</span>
          <img
            className={style.complete_profile_img}
            src={
              res?.imageUrl ||
              "https://cdn0.iconfinder.com/data/icons/online-shop-equitment-gliph/32/line-2_on_going_logo-02-512.png"
            }
            alt="profile"
          />
        </header>
        <form className={style.from_data_collection}>
          <TextField
            name={"username"}
            onChange={handleChange}
            value={details.username}
            className={style.common}
            InputLabelProps={{
              style: {
                fontFamily: "Poppins",
                fontSize: "15px",
                lineHeight: "15px",
              },
            }}
            inputProps={{
              style: {
                fontSize: "14px",
                fontFamily: "Poppins",
                width: "100%",
              },
            }}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <div className={style.row_send}>
            <TextField
              name={"firstname"}
              value={details.firstname}
              onChange={handleChange}
              InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  lineHeight: "15px",
                },
              }}
              inputProps={{
                style: {
                  fontSize: "14px",
                  fontFamily: "Poppins",
                },
              }}
              sx={{
                width: "100%",
              }}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
            />
            <TextField
              name={"lastname"}
              onChange={handleChange}
              value={details.lastname}
              InputLabelProps={{
                style: {
                  fontFamily: "Poppins",
                  fontSize: "15px",
                  lineHeight: "15px",
                },
              }}
              inputProps={{
                style: {
                  fontSize: "14px",
                  fontFamily: "Poppins",
                  width: "100%",
                },
              }}
              sx={{
                width: "100%",
              }}
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <TextField
            name={"email"}
            onChange={handleChange}
            value={details.email}
            disabled
            className={style.common}
            InputLabelProps={{
              style: {
                fontFamily: "Poppins",
                fontSize: "15px",
                lineHeight: "15px",
              },
            }}
            inputProps={{
              style: {
                fontSize: "14px",
                fontFamily: "Poppins",
                width: "100%",
              },
            }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            name={"bio"}
            onChange={handleChange}
            value={details.bio}
            multiline
            InputLabelProps={{
              style: {
                fontFamily: "Poppins",
                fontSize: "15px",
                lineHeight: "15px",
              },
            }}
            inputProps={{
              style: {
                height: "150px",
                fontSize: "14px",
                fontFamily: "Poppins",
                width: "100%",
              },
            }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
        </form>
        <div className={style.register_btn_con}>
          <Button
            type="submit"
            size="medium"
            onClick={handleSubmit}
            variant="contained"
            sx={{
              color: "var(--text)",
              fontFamily: "Poppins",
              fontWeight: "500",
              textTransform: "none",
              backgroundColor: "var(--primary)",
              fontSize: "16px",
              padding: "7px 15px",
            }}
            endIcon={<BsArrowRight size={"28"} />}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataCollection;
