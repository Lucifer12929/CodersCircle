import React, { useContext } from "react";
import ApiRevoke from "../components/Jobs";
import PageTop from "../components/PageTop";
import ApiReadme from "../components/ApiReadme";
import { ContextProvider } from "../config/Context";
import styles from "../css/pages/JobPage.module.css";

const JobPage = () => {
  const { userDetails } = useContext(ContextProvider);
  const [user, setUser] = userDetails;
  return (
    <>
      <PageTop label="Jobs" />
      <ApiRevoke />
      {/* {
        user?.apiKey !== "" && <ApiReadme/>
      } */}
    </>
  );
};

export default JobPage;
