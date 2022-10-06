import React, { useState } from "react";
import { ChatBox, Header, MyChats } from "../components";
import { ChatState } from "../context/ChatProvider";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <>
      {user && <Header />}
      {user && (
        <div className="chat-body" style={{ width: "100vw", display: "flex" }}>
          <div
            className="left"
            style={{ width: "30vw", border: "solid 1px blue" }}
          >
            <MyChats fetchAgain={fetchAgain} />
          </div>
          <div
            className="right"
            style={{ border: "solid 1px maroon", flexGrow: 1 }}
          >
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
