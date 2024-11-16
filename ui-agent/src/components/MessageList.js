import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div style={styles.messageList}>
      {messages.map((message) => (
        <div
          key={message.id}
          style={{
            ...styles.message,
            alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
            backgroundColor: message.sender === 'user' ? '#007BFF' : '#0651a1', // Blue for user, green for bot
            color: 'white', // White text for both
          }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};


const styles = {
  messageList: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  message: {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
    margin: '5px 0',
    wordWrap: 'break-word',
  },
};

export default MessageList;
