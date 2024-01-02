"use client"
import React, { useState, useEffect } from 'react';
import ChatBox from './components/ChatBox';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [ws, setWS] = useState(null);

  useEffect(() => {
    const newWS = new WebSocket('ws://localhost:8080/ws-connect');

    const initialMsg = {
      sessionId: 'dsasds',
      reCaptchaToken: 'ggvdgas',
      chatStatus: 'sasdas',
      type: 'CHAT_INIT',
    };

    newWS.onerror = (err) => console.error(err);

    newWS.onopen = () => {
      setWS(newWS);
      newWS.send(JSON.stringify(initialMsg));
    };

    newWS.onmessage = (msg) => {
      try{
        console.log("Responce data is :", msg.data)
      const respObj = JSON.parse(msg.data);
      
      setMessages((prevMessages) => [...prevMessages, respObj]);

      switch (respObj.type) {
        case 'TEXT_MSG':
          handleTextMsg(respObj);
          break;
        case 'CHAT_INIT_ACK':
          handleChatInitAckMsg(respObj);
          break;
        default:
          console.warn('Unknown message type:', respObj.type);
      }}
      catch (error) {
        console.log("Erro :", error)
        console.error('Error parsing JSON:', error);
      }
    };

    return () => {
      if (newWS && newWS.readyState === WebSocket.OPEN) {
        newWS.send(JSON.stringify({ type: 'CHAT_CLOSE' }));
      }
    };
  }, []);

  const handleChatInitAckMsg = (ackMsg) => {
    // Handle CHAT_INIT_ACK messages
    console.log('Received CHAT_INIT_ACK:', ackMsg);
    // You can perform actions based on the ACK message if needed
  };

  const handleTextMsg = (textMsg) => {
    // Handle TEXT_MSG messages
    console.log('Received TEXT_MSG:', textMsg);
    // You can update the state or perform any other action as needed
  };

  const handleCloseMsg = () => {
    // Handle CHAT_CLOSE messages or any cleanup needed
    console.log('Closing WebSocket');
    if (ws) {
      ws.close();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const textMessage = {
        chatSessionId: 'dsasds',
        consumer: 'ggvdgas',
        personaId: 'sasdas',
        message: message,
        type: 'TEXT_MSG',
      };

      setMessages((prevMessages) => [...prevMessages, textMessage]);
      setMessage('');

      // Send TEXT_MSG message after the user sends a message
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(textMessage));
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Chat App</h1>
      <ChatBox messages={messages} />
      <div style={{ display: 'flex', width: '80%', maxWidth: '400px', marginTop: '20px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            width: 'calc(100% )',
            padding: '8px',
            marginRight: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default WebSocketComponent;