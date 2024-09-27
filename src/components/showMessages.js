import React, { useEffect, useState } from 'react';
import '../styles/styles.css';

const ShowMessages = () => {
  const [messages, setMessages] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');

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

        setMessages(Array.isArray(data.message) ? data.message : []);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000); // 2 sekunder

    return () => clearInterval(intervalId);
  }, []);

  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="container">
      <label className="sortinglabel" htmlFor="sortOrder">
        Sort by:
      </label>
      <select
        className="sortingmenu"
        id="sortOrder"
        value={sortOrder}
        onChange={e => setSortOrder(e.target.value)}
      >
        <option className="sortingoption" value="newest">
          Newest first
        </option>
        <option className="sortingoption" value="oldest">
          Oldest first
        </option>
      </select>
      {sortedMessages.length > 0 ? (
        <ul className="listcont">
          {sortedMessages.map((messageObj, index) => (
            <li key={index}>
              <div className="messagecontainer">
                <p className="username">{messageObj.userName}:</p>{' '}
                <p className="message">{messageObj.message} </p>
                <p className="dateNid">
                  Created at: {messageObj.createdAt} <br /> Id: {messageObj.id}
                </p>
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
