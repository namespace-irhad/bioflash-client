import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, SidebarPusher } from "semantic-ui-react";
import "./App.css";
import "./styles.scss";

//Views and Components
import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login/";
import Signup from "./views/Signup/";
import User from "./views/User/";
import Navbar from "./components/Navbar";
import Error from "./views/Error";
import Game from "./views/Game";
import SidebarContent from "./components/Sidebar";
import Admin from "./views/Admin";
import Diagnose from "./views/Diagnose";

//Helper functions to decide user routes
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import RedirectRoute from "./util/RedirectRoute";
import AdminRoute from "./util/AdminRoute";

//Redux Functions and Packages
import store from "./redux/store";
import Axios from "axios";
import { useSelector } from "react-redux";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import { Sidebar, Segment } from "semantic-ui-react";
import AddItems from "./views/AddItems";

Axios.defaults.baseURL =
  "https://europe-west1-bioflashproject.cloudfunctions.net/api";

//In case the token runs out, stop the user from going to the dashboard
const token = localStorage.BioQuizToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED,
    });
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  const { menu_open } = useSelector((state) => state.data);

  return (
    <Router>
      <Navbar />
      <Container fluid className="main-container">
        <Sidebar.Pushable as={Segment}>
          <SidebarContent openMenu={menu_open} />

          <SidebarPusher style={{ minHeight: "93vh" }}>
            <Switch>
              <AuthRoute exact path="/" component={Home} />
              <RedirectRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/user/:username" component={User} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              <RedirectRoute
                exact
                timestamp={new Date().toString()}
                path="/update"
                component={AddItems}
              />
              <RedirectRoute exact path="/diagnose" component={Diagnose} />
              <RedirectRoute
                exact
                timestamp={new Date().toString()}
                path="/play"
                component={Game}
              />
              <AdminRoute exact path="/admin" component={Admin} />
              <Route path="/404" component={Error} />
            </Switch>
          </SidebarPusher>
        </Sidebar.Pushable>
      </Container>
    </Router>
  );
}

export default App;
