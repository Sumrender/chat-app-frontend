import React, { useEffect, useState } from "react";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import { getSender } from "../config/chatLogic";
import GroupChatModal from "./GroupChatModal";

const MyChats = ({ fetchAgain }) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [loggedUser, setLoggedUser] = useState();
  const [groupModal, setGroupModal] = useState(false);

  const fetchChats = async () => {
    console.log("fetchChats function called, ", user);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: MyChats.jsx ~ line 30 ~ fetchChats ~ error",
        error
      );
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      <div className="left">
        <div
          className="left-heading"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <p style={{ margin: 0 }}>My Chats</p>
          <button style={{ flexShrink: 2 }} onClick={() => setGroupModal(true)}>
            Create Group
          </button>
        </div>
        <div className="group-modal">
          {groupModal && (
            <GroupChatModal open={groupModal} setOpen={setGroupModal} />
          )}
        </div>
        <hr />
        <div className="left-user-list">
          {chats ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",

                alignItems: "center",
              }}
            >
              {chats.map((chat) => (
                <div
                  key={chat._id}
                  style={{
                    border: "solid 1px green",
                    width: "80%",
                    flexGrow: 0,
                  }}
                >
                  <div
                    onClick={() => setSelectedChat(chat)}
                    style={
                      selectedChat === chat ? { backgroundColor: "pink" } : {}
                    }
                  >
                    <p>
                      {!chat.isGroupChat
                        ? getSender(user, chat.users)
                        : chat.chatName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Chat is loading</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyChats;
