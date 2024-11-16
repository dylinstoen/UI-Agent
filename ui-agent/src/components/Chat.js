import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const dummyResponses = [
    "Hello! How can I help you?",
    "That's interesting, tell me more!",
    "I'm just a dummy bot, but I'm listening.",
    "Wow, really? That's cool!",
    "I don't have an answer for that, but I'll try my best to help!"
  ];

  const handleSendMessage = (text) => {
    // Add user's message to the chat
    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Trigger a dummy response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000); // 1-second delay for bot response
  };

  return (
    <div style={styles.chatContainer}>
      <h2>Chat</h2>
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

const styles = {
  chatContainer: {
    width: '800px',
    height: '1000px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
};

export default Chat;
