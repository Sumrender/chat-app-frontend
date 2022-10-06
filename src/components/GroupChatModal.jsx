import axios from "axios";
import React from "react";
import { Modal } from "@mui/material";
import { useState } from "react";
import { ChatState } from "../context/ChatProvider";

const GroupChatModal = ({ open, setOpen }) => {
  const { user, chats, setChats } = ChatState();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(
        "🚀 ~ file: GroupChatModal.jsx ~ line 25 ~ handleSearch ~ data",
        data
      );

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: GroupChatModal.jsx ~ line 31 ~ handleSearch ~ error",
        error
      );
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("User already added to group");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      console.log("handleSubmit, fill all the fields");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      // so that the newly created group appears at top
      setOpen(false);
      console.log("new group created successfully");
    } catch (error) {
      console.log(
        "🚀 ~ file: GroupChatModal.jsx ~ line 78 ~ handleSubmit ~ error",
        error
      );
    }
  };
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
        className="create-group-form"
        style={{
          padding: "20px",
          width: "50vw",
          height: "50vh",
          backgroundColor: "white",
          border: "solid 3px blue",
        }}
      >
        <div className="heading" style={{ display: "flex", justifyContent:"space-between" }}>
          <p>Create Group Chat</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
        <hr />
        <div
          className="inputs"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          <input
            type="text"
            placeholder="Group Name"
            onChange={(e) => setGroupChatName(e.target.value)}
            value={groupChatName}
          />
          <input
            type="text"
            placeholder="Add Users eg: John"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <hr />
        <div className="show-search-results">
          {loading ? (
            <p>Loading...</p>
          ) : (
            searchResult?.slice(0, 4).map((u) => (
              <div key={u._id}>
                <button onClick={() => handleGroup(u)}>{u.name}</button>
              </div>
            ))
          )}
        </div>
        <hr />
        <div className="show-selected-users">
          <div style={{ display: "flex" }}>
            {selectedUsers.map((u) => (
              <div key={u._id} style={{ padding: "0 10px" }}>
                <li>{u.name}</li>
                <button onClick={() => handleDelete(u)}>X</button>
              </div>
            ))}
          </div>
          <hr />
        </div>
        <div
          className="submit"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button onClick={handleSubmit}>Create Group</button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupChatModal;
