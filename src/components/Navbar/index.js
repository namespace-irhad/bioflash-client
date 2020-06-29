import React, { Fragment } from "react";
import "./style.css";
import { PrimaryButton, SecondaryButton } from "./Button/index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { menu_toggle } from "../../redux/actions/dataActions";
import Hamburger from "hamburger-react";

function Navbar() {
  const {
    credentials: { username },
    authenticated,
  } = useSelector((state) => state.user);
  const { menu_open } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(menu_toggle(menu_open));
  };

  const currentPath = window.location.pathname;

  return (
    <header className="toolbar">
      <nav className="toolbar-navigation">
        <div className="toolbar-logo">
          {currentPath !== "/" && authenticated && (
            <Hamburger
              toggled={menu_open}
              toggle={handleToggle}
              size={25}
              color="#feffe4"
            />
          )}
          <Link className="logo-font" to="/">
            BioFlash
          </Link>
        </div>
        <div className="toolbar-space"></div>
        <div className="toolbar-item-list">
          <ul>
            {!authenticated ? (
              <Fragment>
                <li>
                  <PrimaryButton to="/signup">signup</PrimaryButton>
                </li>
                <li>
                  <SecondaryButton to="/login">login</SecondaryButton>
                </li>
              </Fragment>
            ) : (
              <h4 className="user-welcome-header">
                Welcome back,{" "}
                <Link to={`/user/${username}`}>
                  <span className="user-welcome-link">{username}</span>
                </Link>
              </h4>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default React.memo(Navbar);
