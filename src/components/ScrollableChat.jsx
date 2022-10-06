import { Avatar } from "@mui/material";
import React from "react";
import { isLastMessage, isSameSender } from "../config/chatLogic";
import { ChatState } from "../context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", margin: "2px" }} key={m._id}>
            {/* {console.log(m)} */}
            {isSameSender(messages, m, i, user._id) &&
              isLastMessage(messages, i, user._id) && (
                <Avatar src={m.sender.pic}>{m.sender.name}</Avatar>
              )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#B9F5D0" : "#BEE3F8"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </>
  );
};

export default ScrollableChat;
