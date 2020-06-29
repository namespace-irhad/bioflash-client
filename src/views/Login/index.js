import React from "react";
import "./style.css";
import loginImage from "../../assets/images/login-picture.jpg";
import useForm from "../../hooks/useForm";
import virus from "../../assets/images/svg/virus9.svg";
import culmination from "../../assets/images/svg/cultivation-1.svg";
import {
  Container,
  Header,
  Form,
  Image,
  Button,
  Label,
  Transition,
  Divider,
  Loader,
} from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";

/**
 * Redux hooks used to fetch information from the global store and dispatch information from the functional
 * component back to the global state
 */
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

function Login() {
  let history = useHistory();
  const dispatch = useDispatch();
  const { handleChange, handleSumbit, values } = useForm(submit);
  const error = useSelector((state) => state.ui.errors);
  const loading = useSelector((state) => state.ui.loading);
  const [hide, show] = [800, 500];

  function submit() {
    const userData = {
      email: values.email,
      password: values.password,
    };

    dispatch(loginUser(userData, history));
  }

  return (
    <Container>
      <img alt="virus" className="background-image" src={virus} />
      <img alt="culmination" className="background-image-2" src={culmination} />
      <div className="form-container">
        <Image alt="header" src={loginImage} className="login-image" />
        <Header as="h1" className="login-header">
          Login to your account.
        </Header>
        <Form onSubmit={handleSumbit}>
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
              Password<span className="label-required">*</span>
            </label>
            <input
              required
              id="password"
              name="password"
              type="password"
              label="Password"
              value={values.password}
              onChange={handleChange}
              placeholder="type your password..."
            />
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
            {loading ? <Loader size="tiny" active inline /> : "Submit"}
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
          Don't have an account? Sign up <Link to="/signup">here</Link>{" "}
        </small>
      </div>
    </Container>
  );
}

export default Login;
