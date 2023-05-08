import React from "react";
import styles from "../css/pages/Hero.module.css";
import { Button } from "@pankod/refine-mui";
import { BsArrowRight, BsMicFill, BsFillBookFill } from "react-icons/bs";
import { FaPencilAlt, FaUserAstronaut } from "react-icons/fa";
import { BiGlobe } from "react-icons/bi";
import { RiOpenSourceFill } from "react-icons/ri";
import { NavLink } from "@pankod/refine-react-router-v6";
import Herobackground from "./Herobackground";
import "../css/pages/Herobackground.css";

const Hero = () => {
  const features = [
    {
      icon: <FaPencilAlt />,
      title: "Post Coders(Dev Post)",
      desc: "You can post your devit(Dev Post),code snippets,imagesetc.",
    },
    {
      icon: <BiGlobe />,
      title: "Discover Hackathon",
      desc: "You can view and join popular hackathons.",
    },

    {
      icon: <BsFillBookFill />,
      title: "Get Popular blogs post",
      desc: "You can get popular blogs post from dev.to and hashnode",
    },

    {
      icon: <RiOpenSourceFill />,
      title: "Get latest Job and Internship",
      desc: "CodersCircle is an open source project and you can contribute to it.",
    },
  ];
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.hero_container}>
          <div className={styles.center_con}>
            <div className={styles.center_text}>
              Connect with the coder community on{" "}
              <span className={styles.gradient}>CodersCircle.</span>
            </div>
            <div className={styles.bottom_text}>
              Connect, Share, learn, and grow with like-minded individuals.
              Explore, create, and find your path. Stay Up-to-Date on{" "}
              <span className={styles.glow}>`Latest Trends`</span>, Discover{" "}
              <span className={styles.glow}>`Hackathons`</span>, Find{" "}
              <span className={styles.glow}>`Jobs/Internship`</span>, and Much
              More.
            </div>
            <NavLink to="/join">
              <Button
                size="medium"
                variant="contained"
                sx={{
                  color: "var(--text)",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: "var(--primary)",
                  fontSize: "16px",
                  padding: "7px 15px",
                  mt: "3rem",
                  "&:hover": {
                    backgroundColor: "var(--light-primary)",
                  },
                }}
                endIcon={<BsArrowRight size={"28"} />}
              >
                Let's Connect
              </Button>
            </NavLink>
          </div>
        </div>

        <div className={styles.bottom_con}>
          <div className="features_wrapper">
            {features.map((feature) => (
              <div className="card">
                <div className="card-front"></div>
                <div className="card-back">
                  <span className={styles.feature_icon}>{feature.icon}</span>
                  <span className={styles.feature_title}>{feature.title}</span>
                  <span className={styles.feature_desc}>{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
