import React from 'react';
import profilePic from '../assets/profile.jpg'

const MessageList = ({ messages }) => {
  return (
    <div style={styles.messageList}>
      {messages.map((message) => (
        <div
          key={message.id}
          style={{
            ...styles.messageContainer,
            flexDirection: message.sender === 'user' ? 'row-reverse' : 'row', // Reverse for user messages
          }}
        >
          {message.sender !== 'user' && (
            <img
              src={profilePic} // Replace with your bot/profile image URL
              alt="Profile"
              style={styles.profilePicture}
            />
          )}
          <div
            style={{
              ...styles.message,
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: message.sender === 'user' ? '#007BFF' : '#0651a1',
              color: 'white',
            }}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  messageList: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px', // Space between profile picture and message
  },
  profilePicture: {
    width: '40px',
    height: '40px',
    borderRadius: '50%', // Circular image
    objectFit: 'cover',
  },
  message: {
    maxWidth: '70%',
    padding: '10px',
    borderRadius: '10px',
    wordWrap: 'break-word',
  },
};

export default MessageList;