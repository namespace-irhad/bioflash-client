import React, { useState, useEffect } from "react";
import {
  Tab,
  Header,
  Segment,
  Form,
  Image,
  Dropdown,
  Label,
  Message,
  Checkbox,
} from "semantic-ui-react";
import { symptomsForm, virusForm } from "../../../assets/images/";
import ChangeImage from "../../../components/ChangeImage";
import Axios from "axios";

export const SymptomPane = () => {
  const [loading, setLoading] = useState(false);
  const [imageAdded, setImageAdded] = useState(false);
  const [values, setValues] = useState({
    name: "",
    other: "",
    specialty: "",
    description: "",
    imageUrl: {},
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImage = (formData) => {
    setValues({
      ...values,
      imageUrl: formData,
    });
    setImageAdded(true);
  };

  const handleSubmit = (event) => {
    const checkbox = document.getElementById("checkbox-form");
    setLoading(true);
    const { name, other, specialty } = values;
    event.preventDefault();
    if (name.length === 0 || other.length === 0 || specialty.length === 0) {
      setError("Please fill all the required options.");
      setLoading(false);
    } else {
      if (checkbox.checked) {
        console.log(values);
        if (!imageAdded) {
          setLoading(false);
          setError("Please add an Image First.");
        } else {
          const formData = values.imageUrl;
          formData.append("symptomName", values.name);
          Axios.post("/symptom", values)
            .then(() => {
              Axios.post("/symptom/image", formData)
                .then((res) => {
                  setLoading(false);
                  setSuccess(res.data.message);
                  setValues({
                    name: "",
                    other: "",
                    specialty: "",
                    description: "",
                    imageUrl: {},
                  });
                })
                .catch((err) => {
                  setLoading(false);
                  setError(err.code + ". Try Again Later.");
                });
            })
            .catch((err) => {
              setLoading(false);
              setError(err.code + ". Try Again Later.");
            });
        }
      } else {
        setError("Please agree to the terms.");
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Tab.Pane style={{ marginBottom: "20px" }}>
      <Header as="h4">
        Please make sure to update all the required fields as neccessary. Fields
        such as Other Names, Duration and Notes are optional and as such leave
        them empty.
      </Header>
      <Image
        style={{ marginBottom: "20px" }}
        centered
        bordered
        rounded
        src={symptomsForm}
      />
      <ChangeImage uploadImageData={handleImage} value="symptom" />
      <br />
      <Form
        onSubmit={handleSubmit}
        success={success !== undefined && success.length > 0}
      >
        <Message success header="Form Completed" content={success} />
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Common Name *"
            name="name"
            onChange={handleChange}
            placeholder="ex. Cough"
          />
          <Form.Input
            fluid
            label="Other Names *"
            name="other"
            onChange={handleChange}
            placeholder="ex. Leave Empty"
          />
        </Form.Group>
        <Form.Input
          fluid
          label="Specialty *"
          name="specialty"
          onChange={handleChange}
          placeholder="ex. Infectious disease"
        />
        <Form.TextArea
          label="Add notes"
          name="description"
          onChange={handleChange}
          placeholder="Advise the moderators about your addition..."
        />
        <Form.Checkbox
          id="checkbox-form"
          label="I agree to the Terms and Conditions"
        />
        <Form.Button loading={loading}>Submit</Form.Button>
        {error.length > 0 && (
          <Label as="a" basic color="red" pointing>
            {error}
          </Label>
        )}
      </Form>
    </Tab.Pane>
  );
};

export const VirusPane = () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageAdded, setImageAdded] = useState(false);
  const [values, setValues] = useState({
    name: "",
    other: "",
    specialty: "",
    duration: "",
    type: "",
    description: "",
    critical: false,
    symptoms: [],
    imageUrl: {},
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    Axios.get("/symptoms").then((object) => {
      setOptions(object.data);
    });
  }, []);

  const handleImage = (formData) => {
    setValues({
      ...values,
      imageUrl: formData,
    });
    setImageAdded(true);
  };

  const handleSubmit = (event) => {
    const checkbox = document.getElementById("checkbox-form");
    setLoading(true);
    const { name, symptoms, other, specialty } = values;

    event.preventDefault();
    if (
      name.length === 0 ||
      symptoms.length === 0 ||
      other.length === 0 ||
      specialty.length === 0
    ) {
      setError("Please fill all the required options.");
      setLoading(false);
    } else {
      if (checkbox.checked) {
        if (!imageAdded) {
          setLoading(false);
          setError("Please add an Image First.");
        } else {
          const formData = values.imageUrl;
          formData.append("virusName", values.name);
          Axios.post("/virus", values)
            .then(() => {
              Axios.post("/virus/image", formData)
                .then((res) => {
                  setLoading(false);
                  setSuccess(res.data.message);
                  setValues({
                    name: "",
                    other: "",
                    specialty: "",
                    duration: "",
                    type: "",
                    critical: false,
                    description: "",
                    symptoms: [],
                    imageUrl: {},
                  });
                })
                .catch((err) => {
                  setLoading(false);
                  setError(err.code + ". Try Again Later.");
                });
            })
            .catch((err) => {
              setLoading(false);
              setError(err.code + ". Try Again Later.");
            });
        }
      } else {
        setError("Please agree to the terms.");
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleDropdown = (e, data) => {
    setValues({
      ...values,
      [data.name]: data.value,
    });
  };

  const handleClick = (e) => {
    setValues({
      ...values,
      critical: !values.critical,
    });
  };

  return (
    <Tab.Pane style={{ marginBottom: "20px" }}>
      <Header as="h4">
        Please make sure to update all the required fields as neccessary. Fields
        such as Other Names and Notes are optional and as such leave them empty.
      </Header>
      <Image
        style={{ marginBottom: "20px", maxWidth: "500px" }}
        centered
        bordered
        rounded
        src={virusForm}
      />
      <ChangeImage uploadImageData={handleImage} value="virus" />
      <br />
      <Form
        onSubmit={handleSubmit}
        success={success !== undefined && success.length > 0}
      >
        <Message success header="Form Completed" content={success} />
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Common Name *"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="ex. Pneumonia"
          />
          <Form.Input
            fluid
            label="Other Names *"
            name="other"
            value={values.other}
            onChange={handleChange}
            placeholder="ex. Pneumonitis"
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Specialty *"
            name="specialty"
            onChange={handleChange}
            placeholder="ex. Pulmonology"
          />
          <Form.Input
            fluid
            label="Duration"
            name="duration"
            value={values.duration}
            onChange={handleChange}
            placeholder="ex. 6 Weeks"
          />
        </Form.Group>
        <Form.Group inline>
          <Segment
            compact
            stacked
            color="olive"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Label basic>Fatality of the Virus. Is Virus Fatal? </Label>
            <span style={{ width: "20px" }}></span>
            <Checkbox
              checked={values.critical}
              name="critical"
              onClick={handleClick}
            />
          </Segment>
        </Form.Group>
        <Form.Input
          fluid
          label="Type"
          name="type"
          value={values.type}
          onChange={handleChange}
          placeholder="ex. Infection"
        />

        <Form.Group>
          <Label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            color="olive"
            horizontal
          >
            Sympotoms
          </Label>
          <Dropdown
            placeholder="List all Sympotoms *"
            fluid
            multiple
            selection
            name="symptoms"
            search
            onChange={handleDropdown}
            options={options}
          />
        </Form.Group>
        <Form.TextArea
          label="Add notes"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Advise the moderators about your addition..."
        />
        <Form.Checkbox
          id="checkbox-form"
          name="agreeTerms"
          label="I agree to the Terms and Conditions"
        />
        <Form.Button loading={loading}>Submit</Form.Button>
        {error.length > 0 && (
          <Label as="a" basic color="red" pointing>
            {error}
          </Label>
        )}
      </Form>
    </Tab.Pane>
  );
};

export const HomePane = () => {
  return (
    <Tab.Pane>
      <Segment>
        <Header as="h4">Thank you for keeping this quiz fresh and new.</Header>
        <p>
          Here you can add new viruses/infections and symptoms, or update the
          already existing ones you created.
        </p>
        <p>
          Once you submit your contribution, our admins will need to review your
          input before either validating the information or denying. In case you
          get denied you can contact the moderators or fix your errors and try
          again.
        </p>
      </Segment>
    </Tab.Pane>
  );
};
