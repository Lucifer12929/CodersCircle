import React, { useContext, useEffect } from "react";
import ProfileHeader from "../components/ProfileHeader";
import Post from "../components/Post";
import provider from "../config/axios";
import { ContextProvider } from "../config/Context";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [mydevits, setMyDevits] = React.useState([]);

  useEffect(() => {
    fetchMyDevits();
  }, []);

  const fetchMyDevits = async () => {
    try {
      const res = await provider.get(`/devit/getmydevits/${token}`);
      setMyDevits(res.data.allMyDevits);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ProfileHeader />
      <div
        style={{
          marginTop: "-20px",
        }}
      >
        {mydevits.length < 1 ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              // marginLeft: "40%",
              marginTop: "10%",
            }}
          >
            Your Posts
          </div>
        ) : (
          <>
            {mydevits?.map((data) => (
              <Post key={data._id} data={data} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
