"use client";

import React, { useState } from "react";
import { useChannel } from "ably/react";

const ChatBox = () => {
  let inputBox = null;
  let messageEnd = null;
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState<any>([]);

  const { channel, ably } = useChannel("chat-demo", (message: any) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });

  const sendChatMessage = (messageText: any) => {
    channel.publish({ name: "chat-message", data: messageText });
    setMessageText("");
    // inputBox.focus();
  };

  const handleFormSubmission = (event: React.FormEvent) => {
    event.preventDefault();
  
    sendChatMessage(messageText);
  };

  const messages = receivedMessages.map((message: any, index: any) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    return (
      <span key={index} data-author={author}>
        {message.data}
      </span>
    );
  });

  return (
    <div>
      <div>
        <div>
          {messages}
          <div
            ref={(element) => {
              messageEnd = element;
            }}
          ></div>
        </div>
        <form onSubmit={handleFormSubmission}>
          <textarea
            ref={(element) => {
              inputBox = element;
            }}
            value={messageText}
            placeholder="Type a message..."
            onChange={(e) => setMessageText(e.target.value)}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
