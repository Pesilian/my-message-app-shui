import React, { useEffect, useState } from 'react';
import '../styles/showMessages.css';

const ShowMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          'https://0fliqp3oz1.execute-api.eu-north-1.amazonaws.com/get'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);

        // Sätt de hämtade meddelandena till state
        setMessages(Array.isArray(data.message) ? data.message : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    // Hämta meddelanden vid komponentens första render
    fetchMessages();

    // Polling: Hämta meddelanden var 10:e sekund (10000 ms)
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000); // 10 sekunder

    // Rensa intervallet när komponenten avmonteras
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container">
      {messages.length > 0 ? (
        <ul className="listcont">
          {messages.map((messageObj, index) => (
            <li key={index}>
              <div className="messagecontainer">
                <p className="username">{messageObj.userName}:</p>{' '}
                <p className="message">{messageObj.message} </p>
                <p className="date">Created at: {messageObj.createdAt}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="errormessage">No messages found.</p>
      )}
    </div>
  );
};

export default ShowMessages;
