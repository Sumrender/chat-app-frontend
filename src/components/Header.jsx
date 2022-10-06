import { useState } from "react";
import { ChatState } from "../context/ChatProvider";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import ProfileModal from "./ProfileModal";

const headerStyle = {
  padding: "10px",
  display: "flex",
  justifyContent: "space-between",
};

const Header = () => {
  const navigate = useNavigate();

  const { user, notification, setNotification } = ChatState();
  const [profileOpen, setProfileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    handleMenuClose();
    setProfileOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    handleMenuClose();
  };
  return (
    <>
      <div className="header" style={headerStyle}>
        <div className="search">
          <SideDrawer />
        </div>
        <div className="logo">
          <h1 style={{ margin: 0 }}>Talk-A-Tive</h1>
        </div>
        <button>bell {notification && `${notification.length}`}</button>
        {/* here need to map the notifications */}
        <div
          className="menu"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <Avatar src={user?.pic}>{user?.name}</Avatar>
        </div>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <div className="profile-modal">
        <ProfileModal open={profileOpen} setOpen={setProfileOpen} user={user} />
      </div>
      <hr />
    </>
  );
};

export default Header;
