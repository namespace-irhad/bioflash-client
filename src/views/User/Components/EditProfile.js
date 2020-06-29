import React, { useState, useEffect, Fragment } from "react";

import {
  Modal,
  Button,
  Image,
  Label,
  Card,
  Placeholder,
  Transition,
  Form,
  Input,
  TextArea,
  Segment,
  Message,
} from "semantic-ui-react";

import styles from "../style.module.css";
import CropImage from "./CropImage";

//Redux
import { useSelector, useDispatch } from "react-redux";
import ReactSelect from "react-select";
import { addUserDetails } from "../../../redux/actions/userActions";

//Country List
import countryList from "react-select-country-list";

export default function EditProfile({ username }) {
  //Getting information from Redux and showing it on screen
  const userInformation = useSelector((state) => state.user.credentials);
  const { loading, editSuccess, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    about: "",
    location: "",
    gender: "",
  });

  //List of countries from package
  const countries = countryList().getData();

  const options = [
    { key: "m", label: "Male", value: "male" },
    { key: "f", label: "Female", value: "female" },
    { key: "o", label: "Other", value: "other" },
  ];

  useEffect(() => {
    setInfo({
      firstName: userInformation.firstName ? userInformation.firstName : "",
      lastName: userInformation.lastName ? userInformation.lastName : "",
      about: userInformation.about ? userInformation.about : "",
      location: userInformation.location ? userInformation.location : "unknown",
      gender: userInformation.gender ? userInformation.gender : "male",
    });
  }, [userInformation]);

  /**
   * Sending image to server

  const handleImageChange = (event) => {
    dispatch({
      type: SET_SUCCESS,
    });
  };
   */

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleChangeLocation = (selectedOption) => {
    setInfo({
      ...info,
      location: selectedOption.label,
    });
  };

  const handleChangeGender = (selectedOption) => {
    setInfo({
      ...info,
      gender: selectedOption.label,
    });
  };

  const handleSumbit = (event) => {
    event.preventDefault();

    const userExtra = {
      firstName: info.firstName,
      lastName: info.lastName,
      location: info.location,
      about: info.about,
      gender: info.gender,
    };
    dispatch(addUserDetails(userExtra));
  };

  return (
    <Modal
      trigger={
        username === userInformation.username && (
          <Button floated="right">Edit Profile</Button>
        )
      }
    >
      <Modal.Header>Edit Your Profile</Modal.Header>
      <Segment tertiary>
        <Segment.Inline>
          <CropImage />
        </Segment.Inline>
      </Segment>
      <Modal.Content image>
        {loading ? (
          <Fragment>
            <Segment basic>
              <Card>
                <Card.Content>
                  <Placeholder>
                    <Placeholder.Image square />
                  </Placeholder>
                </Card.Content>
              </Card>
            </Segment>
          </Fragment>
        ) : (
          <Image
            centered
            wrapped
            bordered
            size="medium"
            src={userInformation.imageUrl}
          />
        )}
        <Modal.Description>
          <div style={{ marginBottom: "20px" }}>
            <Label color="green">Update the information to your liking.</Label>
          </div>
          <Transition
            visible={error !== undefined}
            animation="scale"
            duration={500}
          >
            <Label className="label-error" basic color="red">
              <p>{error ? error : "..."}</p>
            </Label>
          </Transition>
          <Form success={editSuccess ? editSuccess : false} loading={loading}>
            <Form.Group widths="equal">
              <Form.Field
                control={Input}
                label="First name"
                name="firstName"
                value={info.firstName}
                placeholder="ex. James"
                onChange={handleChange}
              />
              <Form.Field
                control={Input}
                label="Last name"
                name="lastName"
                value={info.lastName}
                placeholder="ex. Johnson"
                onChange={handleChange}
              />
            </Form.Group>

            <label style={{ fontWeight: "bold" }}>Gender</label>
            <ReactSelect
              className={styles.select}
              label="Gender"
              options={options}
              placeholder="Gender"
              onChange={handleChangeGender}
            />
            <label style={{ fontWeight: "bold" }}>Location</label>
            <ReactSelect
              className={styles.select}
              label="Location"
              options={countries}
              placeholder="ex. Bosnia"
              onChange={handleChangeLocation}
            />

            <Form.Field
              control={TextArea}
              label="About"
              name="about"
              value={info.about}
              placeholder="ex. I love food."
              onChange={handleChange}
            />
            <Form.Field control={Button} onClick={handleSumbit}>
              Save
            </Form.Field>
            <Message
              icon="thumbs up"
              size="small"
              success
              header="Successfully Updated"
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
