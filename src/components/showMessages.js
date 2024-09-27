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
        console.log('API response:', data); // Kontrollera API-svaret

        // Använd 'message' arrayen från API-svaret
        setMessages(Array.isArray(data.message) ? data.message : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
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
