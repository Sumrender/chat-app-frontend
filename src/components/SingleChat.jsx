import { CircularProgress } from "@mui/material";
import io from "socket.io-client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { getSender, getSenderFull } from "../config/chatLogic";
import { ChatState } from "../context/ChatProvider";
import { ProfileModal, UpdateGroupModal, ScrollableChat } from "./";

const messagesStyle = {
  height: "60vh",
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  scrollbarWidth: "none",
};

const ENDPOINT = process.env.REACT_APP_ENDPOINT;
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setloading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const { user, selectedChat, notification, setNotification } = ChatState();
  const [profileOpen, setProfileOpen] = useState(false);
  const [groupModal, setGroupModal] = useState(false);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // below one will always run whenever state is updated
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          // setFetchAgain(!fetchAgain)
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      setloading(true);
      const { data } = await axios.get(
        process.env.REACT_APP_ENDPOINT + `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setloading(false);
      socket.emit("join chat", selectedChat._id);

      console.log(
        "🚀 ~ file: SingleChat.jsx ~ line 40 ~ fetchMessages ~ data",
        data
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: SingleChat.jsx ~ line 38 ~ fetchMessage ~ error",
        error
      );
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          process.env.REACT_APP_ENDPOINT + `/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        console.log(
          "🚀 ~ file: SingleChat.jsx ~ line 70 ~ sendMessage ~ data",
          data
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        console.log(
          "🚀 ~ file: SingleChat.jsx ~ line 37 ~ sendMessage ~ error",
          error
        );
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    // typing indicator logic later
    if (!socketConnected) {
      console.log("typing handler, socket not connected: so returned");
      return;
    }

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    });
  };

  return (
    <div style={{}}>
      {selectedChat ? (
        <>
          <div
            className="chat-header"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {selectedChat.isGroupChat ? (
              <>
                <p>{selectedChat.chatName.toUpperCase()}</p>
                <button onClick={() => setGroupModal(true)}>group</button>
              </>
            ) : (
              <>
                <p>{getSender(user, selectedChat.users)}</p>
                <button onClick={() => setProfileOpen(true)}>profile</button>
              </>
            )}
          </div>
          <hr />
          <div className="profile-modal">
            {!selectedChat.isGroupChat && (
              <ProfileModal
                open={profileOpen}
                setOpen={setProfileOpen}
                user={getSenderFull(user, selectedChat.users)}
              />
            )}
          </div>
          <div className="group-modal">
            {
              <UpdateGroupModal
                open={groupModal}
                fetchMessages={fetchMessages}
                setOpen={setGroupModal}
              />
            }
          </div>
          <div className="message-body">
            {loading ? (
              <CircularProgress />
            ) : (
              <div style={messagesStyle} className="messages">
                <ScrollableChat messages={messages} />
                {isTyping ? (
                  <p style={{ backgroundColor: "blue" }}>typing</p>
                ) : (
                  <></>
                )}
              </div>
            )}
            <div className="type-message">
              <input
                onChange={typingHandler}
                value={newMessage}
                onKeyDown={sendMessage}
                placeholder="Message"
                required
                type="text"
              />
              <span> press enter to send</span>
            </div>
          </div>
        </>
      ) : (
        <div>Click on a user to start chatting</div>
      )}
    </div>
  );
};

export default SingleChat;
