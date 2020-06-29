import React, { useEffect, useState } from "react";
import { Container, Header, Grid, Loader, Segment } from "semantic-ui-react";
import EditProfile from "./Components/EditProfile";
import { VirusList, NoVirusList } from "./Components/VirusList";
import { SymptomList, NoSymptomList } from "./Components/SymptomList";
import { useParams, useHistory } from "react-router-dom";
import styles from "./style.module.css";

//Axios (getting data from server)
import Axios from "axios";

//Dayjs (Formatting time)
import dayjs from "dayjs";
import ProfileHeader from "./Components/ProfileHeader";

const LoaderList = () => (
  <div style={{ width: "100%", marginBottom: "20px" }}>
    <Segment>
      <Loader active inline="centered" />
    </Segment>
  </div>
);

const User = () => {
  const history = useHistory();
  const { username } = useParams();
  const [loadingData, setLoadingData] = useState(true);
  const [userInfo, setUserInfo] = useState({
    about: "",
    firstName: "",
    lastName: "",
    location: "",
    gender: "",
    createdAt: "",
    imageUrl: "",
    viruses: [],
    symptoms: [],
  });

  useEffect(() => {
    Axios.get(`/user/${username}`)
      .then((res) => {
        setLoadingData(false);
        setUserInfo({
          about: res.data.user.about ? res.data.user.about : "Not set",
          firstName: res.data.user.firstName
            ? res.data.user.firstName
            : "Unknown",
          lastName: res.data.user.lastName ? res.data.user.lastName : "Unknown",
          location: res.data.user.location ? res.data.user.location : "Not set",
          gender: res.data.user.gender ? res.data.user.gender : "Not set",
          createdAt: res.data.user.createdAt
            ? res.data.user.createdAt
            : dayjs(),
          imageUrl: res.data.user.imageUrl
            ? res.data.user.imageUrl
            : "https://react.semantic-ui.com/images/wireframe/image.png",
          viruses: res.data.viruses ? res.data.viruses : null,
          symptoms: res.data.symptoms ? res.data.symptoms : null,
        });
      })
      .catch(() => {
        history.push("/404");
      });
  }, [history, username]);

  return (
    <Container>
      <div className={styles.mainHeaderUser}>
        <Header
          as="h2"
          className={[styles.headerUser, "user-profile-title"].join(" ")}
        >
          {loadingData ? <Loader active inline /> : username}
        </Header>
        <EditProfile username={username} />
      </div>
      <Grid stackable celled style={{ backgroundColor: "#ecfff5" }}>
        <ProfileHeader userInfo={userInfo} loadingData={loadingData} />
        {userInfo.viruses.length === 0 ? (
          loadingData ? (
            <LoaderList />
          ) : loadingData ? (
            <LoaderList />
          ) : (
            <NoVirusList username={username} />
          )
        ) : (
          <VirusList viruses={userInfo.viruses} />
        )}
        {userInfo.symptoms.length === 0 ? (
          loadingData ? (
            <LoaderList />
          ) : loadingData ? (
            <LoaderList />
          ) : (
            <NoSymptomList username={username} />
          )
        ) : (
          <SymptomList symptoms={userInfo.symptoms} />
        )}
      </Grid>
    </Container>
  );
};

export default User;
