import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import WindowIcon from "@mui/icons-material/Window";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <a href="https://github.com/Sumrender">
          <Typography variant="body" color="white" align="center">
            <GitHubIcon /> GITHUB
          </Typography>
        </a>
        <Link to="/contact">
          <Typography variant="body" color="white" align="center">
            <ContactSupportIcon /> CONTACT US
          </Typography>
        </Link>
      </div>
      <div className="footer-copyright">
        <Typography variant="body" sx={{ color: "white", margin: "auto" }}>
          {"Copyright © "}
          <Link color="inherit" to="/">
            SITENAME
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
