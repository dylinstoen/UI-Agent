import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  // Send message to the backend and handle response
  const handleSendMessage = async (text) => {
    const userMessage = { id: Date.now(), text, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId:'a',question: text }),
      });

      const data = await response.json();
      const botMessage = { id: Date.now() + 1, text: data.answer, sender: 'bot' };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with server:', error);
    }
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