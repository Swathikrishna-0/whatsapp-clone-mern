import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
  return <div className="sidebar__chat">
    <Avatar/>
    <div className="sidebarChat__info">
      <h2>Room Name</h2>
      <p>This is the last message</p>
    </div>
  </div>;
}

export default SidebarChat;
