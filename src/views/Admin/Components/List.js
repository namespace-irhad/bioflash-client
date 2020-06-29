import React, { useState, Fragment } from "react";
import {
  List,
  Button,
  Image,
  Segment,
  Label,
  Message,
  Transition,
  Grid,
  Header,
  Icon,
} from "semantic-ui-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Axios from "axios";

export function AdminList(props) {
  const [approvedData, setApprovedData] = useState("");

  const approveItem = (item) => {
    //Approving the virus by sending the name and setting the key to approved
    if (props.item === "virus") {
      Axios.put(`/admin/virus/${item}`)
        .then(() => {
          setApprovedData(item);
          props.delete(item, "viruses");
        })
        .catch((error) => console.log(error));
    } else if (props.item === "symptom") {
      Axios.put(`/admin/symptom/${item}`)
        .then(() => {
          setApprovedData(item);
          props.delete(item, "symptoms");
        })
        .catch((error) => console.log(error));
    } else if (props.item === "users") {
      Axios.put(`/admin/user/${item}`)
        .then(() => {
          setApprovedData(item);
          props.delete(item, "approveUsers");
        })
        .catch((error) => console.log(error));
    }
    setTimeout(() => {
      setApprovedData("");
    }, 2000);
  };

  dayjs.extend(relativeTime);
  return (
    <Segment raised stacked color="green">
      <List
        ordered
        animated
        divided
        relaxed
        style={{ height: "300px", overflowY: "scroll" }}
      >
        <Transition
          visible={approvedData !== ""}
          animation="scale"
          duration={500}
        >
          <Message
            success
            header="Successful"
            content={`The update for ${approvedData} has been approved`}
          />
        </Transition>
        {props.listData.map((item, key) => (
          <List.Item key={key}>
            <List.Content floated="right">
              <Button
                positive
                onClick={() =>
                  approveItem(item.name ? item.name : item.username)
                }
              >
                Approve
              </Button>
            </List.Content>
            <Image
              avatar
              src={
                item.imageUrl
                  ? item.imageUrl
                  : "https://react.semantic-ui.com/images/wireframe/image.png"
              }
            />
            <List.Content>
              <p>
                <strong>{item.name ? item.name : item.username}</strong>
              </p>
              <p>
                <strong>Created:</strong> {dayjs().to(dayjs(item.createdAt))}
              </p>
              {item.description && (
                <p>
                  <strong>User Description:</strong> {item.description}
                </p>
              )}
              <p>
                {item.specialty && (
                  <Fragment>
                    <strong>Specialty:</strong> {item.specialty}
                  </Fragment>
                )}
                {item.quizAnswered !== "" && (
                  <span>
                    <strong>Quiz Answered:</strong> {item.quizAnswered}{" "}
                  </span>
                )}
                {item.virusesMade !== "" && (
                  <span>
                    <strong>Viruses Contributed:</strong> {item.virusesMade}{" "}
                  </span>
                )}
                {item.symptomsMade !== "" && (
                  <span>
                    <strong>Symptoms Contributed:</strong> {item.symptomsMade}{" "}
                  </span>
                )}
              </p>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
}

export function AdminUserList(props) {
  dayjs.extend(relativeTime);
  return (
    <Segment raised stacked color="green">
      <List
        ordered
        animated
        divided
        relaxed
        style={{ height: "300px", overflowY: "scroll" }}
      >
        {props.listData.map((item, key) => (
          <List.Item key={key}>
            <Image
              avatar
              src={
                item.imageUrl
                  ? item.imageUrl
                  : "https://react.semantic-ui.com/images/wireframe/image.png"
              }
            />
            <List.Content>
              <List.Header>
                {item.username}{" "}
                {parseInt(item.role) === 3 && (
                  <Label color="red" tag>
                    Admin
                  </Label>
                )}
                {parseInt(item.role) === 1 && (
                  <Label color="blue" tag>
                    Trusted
                  </Label>
                )}
              </List.Header>
              <br />
              <List.Description>
                <p>
                  <strong>User Id:</strong> {item.userId}
                </p>
                <p>
                  <strong>Created:</strong> {dayjs().to(dayjs(item.createdAt))}
                </p>
                <p>
                  <strong>User Email:</strong> {item.email}
                </p>
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
}

export const ApproveDeletion = () => {
  const [toDelete, setToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const approveDeletions = () => {
    setLoading(true);
    Axios.get("/admin/data/delete")
      .then((res) => {
        setLoading(false);
        setToDelete(res.data);
      })
      .catch((err) => console.log(err));
  };
  return toDelete == null ? (
    <Segment placeholder>
      <Grid columns={1} stackable textAlign="center">
        <Grid.Row verticalAlign="middle">
          <Grid.Column>
            <Header icon>
              <Icon name="delete" />
              Approve Deletions
            </Header>
            <Button
              onClick={approveDeletions}
              loading={loading}
              color="google plus"
            >
              Approve Now
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  ) : (
    <Segment raised stacked color="green">
      <List
        ordered
        animated
        divided
        relaxed
        style={{ height: "300px", overflowY: "scroll" }}
      >
        <Header as="h4" color="green">
          Viruses For Deletion:
        </Header>
        {toDelete.viruses.length > 0 ? (
          <Fragment>
            {toDelete.viruses.map((item, key) => (
              <List.Item>
                <List.Content floated="right">
                  <Button color="red">Delete</Button>
                </List.Content>
                <Image
                  avatar
                  src={
                    item.imageUrl
                      ? item.imageUrl
                      : "https://react.semantic-ui.com/images/avatar/small/lena.png"
                  }
                />
                <List.Content>{item.name}</List.Content>
                <List.Content>Created By: {item.createdBy}</List.Content>
              </List.Item>
            ))}
          </Fragment>
        ) : (
          <div>No Viruses for Deletion</div>
        )}
        <Header as="h4" color="green">
          Symptoms For Deletion:
        </Header>
        {toDelete.symptoms.length > 0 ? (
          <Fragment>
            {toDelete.symptoms.map((item, key) => (
              <List.Item>
                <List.Content floated="right">
                  <Button color="red">Delete</Button>
                </List.Content>
                <Image
                  avatar
                  src={
                    item.imageUrl
                      ? item.imageUrl
                      : "https://react.semantic-ui.com/images/avatar/small/lena.png"
                  }
                />
                <List.Content>{item.name}</List.Content>
                <List.Content>Created By: {item.createdBy}</List.Content>
              </List.Item>
            ))}
          </Fragment>
        ) : (
          <div>No Symptoms for Deletion</div>
        )}
      </List>
    </Segment>
  );
};
