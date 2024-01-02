// components/ChatBox.js
import { useState } from 'react';

const ChatBox = ({ messages }) => {
  return (
    <div
      style={{
        width: '80%',
        maxWidth: '800px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Chat Box</h2>
      <div
        style={{
          height: '400px',
          overflow: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '10px',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <strong>{msg.sender === 'user' ? 'You' : 'Server'}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
