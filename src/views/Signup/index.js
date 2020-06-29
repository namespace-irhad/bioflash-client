import React from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./style.module.css";
import {
  Container,
  Header,
  Form,
  Button,
  Transition,
  Label,
  Divider,
  Loader,
} from "semantic-ui-react";

//Components
import TextImage from "../../components/TextImage/TextImage";
import useFormSignup from "../../hooks/useFormSignup";

//Images
import formImage from "../../assets/images/signup-picture.jpg";

//Redux
import { registerNewUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const { values, handleChange, handleSubmit } = useFormSignup(submit);
  const loading = useSelector((state) => state.ui.loading);
  const error = useSelector((state) => state.ui.errors);
  const [hide, show] = [800, 500];

  function submit() {
    const newUserData = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      username: values.username,
    };

    dispatch(registerNewUser(newUserData, history));
  }

  return (
    <Container>
      <div className="form-container">
        <TextImage alt="Signup Header" source={formImage}>
          <h2 className={styles.headerImage}>Let's get you started!</h2>
          <h3 className={styles.headerImage}>
            To create your account fill up the information below.
          </h3>
        </TextImage>
        <Header className="login-header" as="h1">
          Create an account and start learning.
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label className="label-login">
              Email<span className="label-required">*</span>
            </label>
            <input
              required
              id="email"
              name="email"
              type="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
              placeholder="ex. james@gmail.com"
            />
            <Transition
              visible={error.email !== undefined}
              animation="scale"
              duration={500}
            >
              <Label className="label-error" basic color="red" pointing prompt>
                {error.email ? error.email : "..."}
              </Label>
            </Transition>
          </Form.Field>
          <Form.Field>
            <label className="label-login">
              Username<span className="label-required">*</span>
            </label>
            <input
              required
              pattern=".{5,}"
              title="5 characters minimum"
              id="username"
              name="username"
              type="text"
              label="Username"
              autoComplete="username"
              value={values.username}
              onChange={handleChange}
              placeholder="ex. James"
            />
          </Form.Field>
          <Transition
            visible={error.username !== undefined}
            animation="scale"
            duration={500}
          >
            <Label className="label-error" basic color="red" pointing prompt>
              {error.username ? error.username : "..."}
            </Label>
          </Transition>
          <Form.Field>
            <label className="label-login">
              Password<span className="label-required">*</span>
            </label>
            <input
              required
              minLength="6"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              placeholder="type your password..."
            />
            <Form.Field>
              <label className="label-login">
                Confirm Password<span className="label-required">*</span>
              </label>
              <input
                required
                id="confirmPassword"
                minLength="6"
                name="confirmPassword"
                type="password"
                label="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="confirm your password..."
              />
            </Form.Field>
            <Transition
              visible={error.password !== undefined}
              animation="scale"
              duration={{ hide, show }}
            >
              <Label className="label-error" basic color="red" pointing prompt>
                {error.password ? error.password : "..."}
              </Label>
            </Transition>
            <Divider />
          </Form.Field>
          <Button color="black" disabled={loading} type="submit">
            {loading ? <Loader size="tiny" active inline /> : "Signup"}
          </Button>
          <Transition
            visible={error.general !== undefined}
            animation="scale"
            duration={{ hide, show }}
          >
            <Label color="green" pointing="left">
              {error.general ? error.general : "..."}
            </Label>
          </Transition>
        </Form>
        <small className="sign-up-small">
          Already have an account? Login <Link to="/login">here</Link>{" "}
        </small>
      </div>
    </Container>
  );
};

export default Signup;
