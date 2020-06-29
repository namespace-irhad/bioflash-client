import React from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DarkModeToggle from "./DarkMode/DarkModeToggle";
import "./DarkMode/styles.css";

function SidebarContent({ openMenu }) {
  const { role } = useSelector((state) => state.user.credentials);
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={openMenu}
      width="thin"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="sidebar-top-pusher"></div>
      <Menu.Item as="a">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item>
        <Link to="/play">
          <Icon name="gamepad" size="big" />
          <br />
          Play Quiz
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/update">
          <Icon name="save" size="big" />
          <br />
          Create/Update
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/diagnose">
          <Icon name="clipboard outline" size="big" />
          <br />
          Diagnose
        </Link>
      </Menu.Item>
      <Menu.Item>
        <a href="https://www.immunology.org/public-information/bitesized-immunology/pathogens-and-disease/viruses-introduction">
          <Icon name="book" size="big" />
          <br />
          Learn
        </a>
      </Menu.Item>
      {role === 3 && (
        <Menu.Item>
          <Link to="/admin">
            <Icon name="user" size="big" />
            <br />
            Admin Panel
          </Link>
        </Menu.Item>
      )}
      <span style={{ flex: "1" }} />
      <Menu.Item>
        <DarkModeToggle />
      </Menu.Item>
    </Sidebar>
  );
}

export default SidebarContent;
