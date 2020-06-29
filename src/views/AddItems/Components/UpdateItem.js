import React, { useState, useEffect, Fragment } from "react";
import {
  List,
  Image,
  Tab,
  Header,
  Modal,
  Button,
  ModalActions,
  Dimmer,
  Loader,
  Divider,
  Segment,
  Form,
  Input,
  Message,
} from "semantic-ui-react";
import Axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";

const ModalContainer = ({ values, opened, close, ...rest }) => {
  const userName = useSelector((state) => state.user.credentials);
  const [toDelete, setToDelete] = useState({
    duration: "",
    type: "",
    other: "",
    specialty: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setToDelete({
      ...toDelete,
      [name]: value,
    });
  };

  const closeModal = () => {
    setToDelete({
      duration: "",
      type: "",
      other: "",
      specialty: "",
    });
    close();
  };

  const deleteModal = () => {
    console.log(values.name);
    Axios.put(`/delete/${values.typeOption}/${values.name}`, {
      username: userName.username,
    })
      .then((res) => {
        setLoading(false);
        setSuccess(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message + ". Please Try Again Later.");
      });
  };

  const updateModal = () => {
    const buttonSubmit = document.getElementById("updateButton");
    buttonSubmit.click();
    setLoading(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`/${values.typeOption}/${values.name}`, toDelete)
      .then((res) => {
        setLoading(false);
        setSuccess(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.code + ". Please Try Again Later.");
      });
  };
  return (
    <Modal open={opened}>
      <Modal.Header>Editing: {values.name} </Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src={
            values.imageUrl
              ? values.imageUrl
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
          }
        />
        <Modal.Description>
          <Header>
            Edit information you want to update. Leave the rest unchanged.
          </Header>
          <Form error={error.length > 0} success={success.length > 0}>
            <Message error header="Action Failed" content={error} />
            <Message success header="Success" content={success} />
            <Form.Group widths="equal">
              <Form.Field
                id="other"
                control={Input}
                name="other"
                label="Other name"
                value={toDelete.other.length ? toDelete.other : values.other}
                onChange={handleChange}
                placeholder="ex. Rasp"
              />
              <Form.Field
                id="specialty"
                control={Input}
                label="Specialty"
                name="specialty"
                value={
                  toDelete.specialty.length
                    ? toDelete.specialty
                    : values.specialty
                }
                onChange={handleChange}
                placeholder="ex. Pneumology"
              />
            </Form.Group>
            {values.typeOption === "virus" && (
              <Fragment>
                <Form.Field
                  id="duration"
                  control={Input}
                  label="Duration"
                  name="duration"
                  placeholder="ex. 2 Days (Optional)"
                  value={
                    toDelete.duration.length
                      ? toDelete.duration
                      : values.duration
                  }
                  onChange={handleChange}
                />
                <Form.Field
                  id="type"
                  control={Input}
                  label="Type"
                  name="type"
                  value={toDelete.type.length ? toDelete.type : values.type}
                  onChange={handleChange}
                  placeholder="ex. Infection"
                />
              </Fragment>
            )}
            <button
              type="submit"
              hidden
              id="updateButton"
              onClick={handleSubmit}
            ></button>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <ModalActions>
        <Button onClick={() => closeModal()} color="yellow">
          Close
        </Button>
        <Button
          disabled={values.pendingDeletion}
          onClick={() => updateModal()}
          positive
          loading={loading}
        >
          Update
        </Button>
        <Button
          disabled={values.pendingDeletion}
          onClick={() => deleteModal()}
          negative
        >
          {values.pendingDeletion
            ? "Deletion is Requested"
            : "Request Deletion"}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default function UpdateItem() {
  dayjs.extend(relativeTime);
  const [active, setActive] = useState({});
  const [loading, setLoading] = useState(false);
  const { username } = useSelector((state) => state.user.credentials);
  const [userData, setUserData] = useState({
    viruses: [],
    symptoms: [],
  });
  const [open, setOpen] = useState(false);

  const openModal = (key, item) => {
    if (item === "virus")
      setActive({
        ...userData.viruses[key],
        typeOption: "virus",
        name: userData.viruses[key].virusId,
      });
    else if (item === "symptom")
      setActive({
        ...userData.symptoms[key],
        typeOption: "symptom",
        name: userData.symptoms[key].symptomId,
      });
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    if (userData.viruses.length === 0 || userData.symptoms.length === 0) {
      Axios.get(`/user/${username}`)
        .then((user) => {
          //console.log(user.data);
          setUserData({
            symptoms: user.data.symptoms,
            viruses: user.data.viruses,
          });
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }, [username]);

  return (
    <Tab.Pane>
      <ModalContainer values={active} close={closeModal} opened={open} />
      <Segment>
        <Header as="h4">
          To upate the information click on the item (you wish to update) below
        </Header>
        <Header as="h5">Symptoms</Header>
        <Divider section />
        <List selection divided verticalAlign="middle">
          {loading && (
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          )}
          {userData.symptoms.map((symptom, key) => (
            <List.Item
              key={symptom.symptomId}
              onClick={() => openModal(key, "symptom")}
            >
              <Image
                avatar
                src={
                  symptom.imageUrl
                    ? symptom.imageUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              <List.Content>
                <List.Header>{symptom.symptomId}</List.Header>
                {symptom.lastUpdated && (
                  <List.Description as="p">
                    Last Updated: {dayjs().to(dayjs(symptom.lastUpdated))}
                  </List.Description>
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
        <Header as="h5">Viruses</Header>
        <Divider section />
        <List selection divided verticalAlign="middle">
          {loading && (
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
          )}
          {userData.viruses.map((virus, key) => (
            <List.Item
              key={virus.virusId}
              onClick={() => openModal(key, "virus")}
            >
              <Image
                avatar
                src={
                  virus.imageUrl
                    ? virus.imageUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              <List.Content>
                <List.Header>{virus.virusId}</List.Header>
                {virus.lastUpdated && (
                  <List.Description as="p">
                    Last Updated: {dayjs().to(dayjs(virus.lastUpdated))}
                  </List.Description>
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
      </Segment>
    </Tab.Pane>
  );
}
