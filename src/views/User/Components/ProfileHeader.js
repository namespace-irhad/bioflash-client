import React from "react";
import { Grid, Image, Segment, Placeholder } from "semantic-ui-react";
import styles from "../style.module.css";

//Dayjs (for formatting date)
import dayjs from "dayjs";
import { useSelector } from "react-redux";

export default function ProfileHeader({ userInfo, loadingData, ...props }) {
  const { loading } = useSelector((state) => state.user);
  return (
    <Grid.Row>
      <Grid.Column width={6}>
        {loading ? (
          <Placeholder style={{ height: 300, width: 300 }}>
            <Placeholder.Image />
          </Placeholder>
        ) : (
          <Image
            rounded
            fluid
            wrapped
            bordered
            centered
            src={userInfo.imageUrl}
          />
        )}
      </Grid.Column>
      <Grid.Column width={10}>
        <Segment.Group style={{ backgroundColor: "#ffffff" }}>
          <Segment loading={loadingData}>
            <span className={styles.userLabel}>First Name:</span>
            <span className={styles.userInfo}>{userInfo.firstName}</span>
          </Segment>
          <Segment loading={loadingData}>
            <span className={styles.userLabel}>Last Name:</span>{" "}
            <span className={styles.userInfo}>{userInfo.lastName}</span>
          </Segment>
          <Segment loading={loadingData}>
            <span className={styles.userLabel}>Account Created:</span>{" "}
            <span className={styles.userInfo}>
              {dayjs(userInfo.createdAt).format("DD-MM-YYYY")}
            </span>
          </Segment>
          <Segment loading={loadingData}>
            <span className={styles.userLabel}>About me:</span>
          </Segment>
          <Segment.Group>
            <Segment style={{ fontWeight: "500" }} loading={loadingData}>
              {userInfo.about}
            </Segment>
          </Segment.Group>
          <Segment loading={loadingData}>
            <span className={styles.userLabel}>Gender:</span>{" "}
            <span className={styles.userInfo}>{userInfo.gender}</span>
          </Segment>
          <Segment loading={loadingData}>
            <span className={styles.userLabel}>Location:</span>{" "}
            <span className={styles.userInfo}>{userInfo.location}</span>
          </Segment>
        </Segment.Group>
      </Grid.Column>
    </Grid.Row>
  );
}
