import React, { useContext } from "react";
import styles from "../css/components/Sidebar.module.css";
import { Button, IconButton } from "@pankod/refine-mui";
import { SiCodemagic } from "react-icons/si";
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { FiGlobe } from "react-icons/fi";
import { BsLaptop, BsLaptopFill, BsBag } from "react-icons/bs";
import { MdOutlineLibraryBooks, MdLibraryBooks } from "react-icons/md";
import { HiUserCircle, HiOutlineUserCircle } from "react-icons/hi";
import { IoSettingsSharp, IoSettingsOutline } from "react-icons/io5";
import { TfiBag } from "react-icons/tfi";
import { NavLink, useLocation } from "@pankod/refine-react-router-v6";
import { ContextProvider } from "../config/Context";
import logo from "../images/logo.png";

const Sidebar = () => {
  const { userDetails } = useContext(ContextProvider);
  const [user, setuser] = userDetails;
  const location = useLocation();
  const { pathname } = location;

  const links = [
    {
      name: "Home",
      icon2: <AiFillHome />,
      icon1: <AiOutlineHome />,
      link: "/app",
    },
    {
      name: "Discover",
      icon1: <FiGlobe />,
      icon2: <FiGlobe />,
      link: "/discover",
    },
    {
      name: "Hackathons",
      icon1: <BsLaptop />,
      icon2: <BsLaptopFill />,
      link: "/hackathons",
    },
    {
      name: "Blogs",
      icon1: <MdOutlineLibraryBooks />,
      icon2: <MdLibraryBooks />,
      link: "/blogs",
    },
    {
      name: "Internship/Job",
      icon2: <TfiBag />,
      icon1: <BsBag />,
      link: "/jobs",
    },
    {
      name: "Profile",
      icon2: <HiUserCircle />,
      icon1: <HiOutlineUserCircle />,
      link: "/profile",
    },
  ];
  const name =
    (user?.firstname
      ? user?.firstname.charAt(0).toUpperCase() + user?.firstname.slice(1) + " "
      : "") +
    (user?.lastname
      ? user?.lastname?.charAt(0).toUpperCase() + user?.lastname?.slice(1)
      : "");
  return (
    <>
      <div className={styles.sidebar_container}>
        <div className={styles.sidebar_wrapper}>
          <div className={styles.logo}>
            <IconButton
              aria-label="logo"
              sx={{
                width: "50px",
                height: "50px",
                fontSize: "30px",
                marginLeft: "10px",
                mt: "5px",
              }}
            >
              <img src={logo} />
            </IconButton>
          </div>
          {links.map((link, i) => (
            <NavLink
              key={i}
              className={
                pathname === link.link ? styles.link_active : styles.link
              }
              to={link.link}
            >
              <div className={styles.link_logo}>
                {pathname === link.link ? link.icon2 : link.icon1}
              </div>
              <div
                className={
                  pathname === link.link
                    ? styles.link_name_active
                    : styles.link_name
                }
              >
                {link.name}
              </div>
            </NavLink>
          ))}
          <Button
            variant="contained"
            sx={{
              borderRadius: "100vw",
              color: "text.normal",
              fontSize: "1.2rem",
              fontFamily: "Poppins",
              textTransform: "none",
              py: "8px",
              width: "90%",
            }}
          >
            Coders
          </Button>
          <div className={styles.profile_handle}>
            <div className={styles.profile}>
              <img
                src={
                  user?.avatar ||
                  "https://t3.ftcdn.net/jpg/05/99/84/92/360_F_599849226_EZ0hS4kiUVMYMYeNXAtK8BTSmyrM8nG5.jpg"
                }
                alt="profile"
                className={styles.profile_img}
              />
            </div>
            <div className={styles.name_con}>
              <div className={styles.name}>{name}</div>
              <div className={styles.username}>
                {" "}
                {user?.username ? `@${user?.username}` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
