import React from "react";
import { Modal } from "@mui/material";

const ProfileModal = ({ open, setOpen, user }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={open}
      onClose={handleClose}
    >
      <div
        style={{
          padding: "20px",
          width: "50vw",
          height: "50vh",
          backgroundColor: "white",
          border: "solid 3px blue",
        }}
      >
        <div className="image">
          <img width="40%" src={user.pic} alt="user pic" />
        </div>
        <div className="details">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
