import axios from "axios";
import React from "react";
import { Modal } from "@mui/material";
import { useState } from "react";
import { ChatState } from "../context/ChatProvider";

const GroupChatModal = ({ open, setOpen, fetchMessages }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateGroupName = async () => {
    console.log("updategroup name called");
    if (!groupChatName) {
      console.log(
        "🚀 ~ file: Group name empty ~ updateGroupName ~ groupChatName",
        groupChatName
      );
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        process.env.REACT_APP_ENDPOINT + `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      console.log("group name updated successfully");
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdateGroupModal.jsx ~ line 36 ~ updateGroupName ~ error",
        error
      );
    }
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        process.env.REACT_APP_ENDPOINT + `/api/user?search=${search}`,
        config
      );
      console.log(
        "🚀 ~ file: UpdateGroupModal.jsx ~ line 59 ~ handleSearch ~ data",
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
  const removeFromSelectedUsers = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };
  const handleDelete = async (delUser) => {
    console.log("handleDelete called");
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        process.env.REACT_APP_ENDPOINT + `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: delUser._id,
        },
        config
      );
      setSelectedChat(data);
      // setFetchAgain
      fetchMessages();
      setLoading(false);
      console.log(`user ${delUser.name} removed from group successfully`);
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdateGroupModal.jsx ~ line 92 ~ handleDelete ~ error",
        error
      );
    }
  };
  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      console.log("User already added to group");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const addUser = async (chatId, userId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        process.env.REACT_APP_ENDPOINT + `/api/chat/groupadd`,
        {
          chatId,
          userId,
        },
        config
      );
      setSelectedChat(data);
      console.log(`user added to group successfully`);
    } catch (error) {
      console.log(
        "🚀 ~ file: UpdateGroupModal.jsx ~ line 126 ~ addUser ~ error",
        error
      );
    }
  };
  const handleAdd = async () => {
    console.log("handleAdd called");
    selectedUsers.forEach((u) => {
      addUser(selectedChat._id, u._id);
    });
    setSelectedUsers([]);
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
          height: "80vh",
          backgroundColor: "white",
          border: "solid 3px blue",
        }}
      >
        <div
          className="heading"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <p>{selectedChat && selectedChat.chatName.toUpperCase()}</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
        <hr />
        <div
          className="update-name"
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
          <button onClick={updateGroupName}>update</button>
        </div>
        <hr />
        <div className="update-users">
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
        <div className="users-to-be-added">
          <div style={{ display: "flex", backgroundColor: "pink" }}>
            {selectedUsers.map((u) => (
              <div key={u._id} style={{ padding: "0 10px" }}>
                <li>{u.name}</li>
                <button onClick={() => removeFromSelectedUsers(u)}>X</button>
              </div>
            ))}
          </div>
          {selectedUsers.length > 0 && (
            <button onClick={handleAdd}>Add Users</button>
          )}
          <hr />
        </div>
        <div className="show-selected-users delete-users">
          <div style={{ display: "flex" }}>
            {selectedChat.users.map((u) => (
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
        ></div>
      </div>
    </Modal>
  );
};

export default GroupChatModal;
