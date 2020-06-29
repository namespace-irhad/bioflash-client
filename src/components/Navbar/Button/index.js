import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const PrimaryButton = ({ children, to }) => {
  return (
    <div>
      <Link className="button primary-button" to={to}>
        {children}
      </Link>
    </div>
  );
};

const SecondaryButton = ({ children, to }) => {
  return (
    <div>
      <Link className="button secondary-button" to={to}>
        {children}
      </Link>
    </div>
  );
};

export { PrimaryButton, SecondaryButton };
