import React from "react";
import { ChatState } from "../context/ChatProvider";
import { SingleChat } from "./";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <div style={{ padding: "5px" }}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatBox;
