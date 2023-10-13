"use client";
import React from "react";

import * as Ably from "ably";
import { AblyProvider, useChannel, usePresence } from "ably/react";
import ChatBox from "./ChatBox";

const Chat = () => {
  const client = new Ably.Realtime.Promise({ authUrl: "/api" });
//   console.log(111, client);
  return (
    <div>
      <AblyProvider client={client}>
        <ChatBox />
      </AblyProvider>
    </div>
  );
};

export default Chat;
