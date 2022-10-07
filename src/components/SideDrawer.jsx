import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { ChatState } from "../context/ChatProvider";
import { CircularProgress } from "@mui/material";

export default function TemporaryDrawer() {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const anchor = "left";
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const handleSearch = async () => {
    if (!search) {
      console.log("Please Enter something in search");
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
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(
        "🚀 ~ file: SideDrawer.jsx ~ line 49 ~ handleSearch ~ error",
        error
      );
    }
  };
  const accessChat = async (userId) => {
    console.log(
      "🚀 ~ file: SideDrawer.jsx ~ line 56 ~ accessChat ~ userId",
      userId
    );

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        process.env.REACT_APP_ENDPOINT + `/api/chat`,
        { userId },
        config
      );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      console.log(selectedChat);
      setLoadingChat(false);
      // close drawer
      toggleDrawer(anchor, false);
    } catch (error) {
      console.log(
        "🚀 ~ file: SideDrawer.jsx ~ line 75 ~ accessChat ~ error",
        error
      );
    }
  };

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)}>Search</Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <div className="drawer-content">
          <div className="search">
            <input
              type="text"
              placeholder="Search by name or emaiil"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Go</button>
          </div>
          <div className="search-resuls">
            {loading ? (
              <p>loading...</p>
            ) : (
              searchResult?.map((elem) => {
                return (
                  <li
                    key={elem._id}
                    user={elem}
                    onClick={() => accessChat(elem._id)}
                  >
                    {elem.name}
                  </li>
                );
              })
            )}
          </div>
          <div className="loading-chat">
            {loadingChat && <CircularProgress />}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
