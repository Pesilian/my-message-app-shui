import React, { useEffect, useState } from 'react';
import '../styles/styles.css';
import axios from 'axios';

const ShowMessages = () => {
  const [messages, setMessages] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          'https://0fliqp3oz1.execute-api.eu-north-1.amazonaws.com/get'
        );

        const fetchedMessages = response.data.message;

        console.log('Fetched Messages:', fetchedMessages);

        setMessages(fetchedMessages);

        const uniqueUsernames = [
          ...new Set(fetchedMessages.map(msg => msg.userName)),
        ];
        setUsernames(uniqueUsernames);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    const intervalId = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredMessages = selectedUsername
    ? messages.filter(msg => msg.userName === selectedUsername)
    : messages;

  const sortedMessages = [...filteredMessages].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  console.log('Filtered Messages:', filteredMessages);

  return (
    <div className="container">
      <div className="sortingcont">
        <div className="menus">
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
        </div>
        <div>
          <label className="sortinglabel" htmlFor="usernameFilter">
            Filter by username:
          </label>
          <select
            className="sortingmenu"
            id="usernameFilter"
            onChange={e => setSelectedUsername(e.target.value)}
            value={selectedUsername}
          >
            <option value="">Select a username</option>
            {usernames.map((username, index) => (
              <option key={index} value={username}>
                {username}
              </option>
            ))}
          </select>
        </div>
      </div>
      {sortedMessages.length > 0 ? (
        <ul className="listcont">
          {sortedMessages.map((messageObj, index) => (
            <li key={index}>
              <div className="messagecontainer">
                <p className="username">{messageObj.userName}:</p>{' '}
                <p className="message">
                  {messageObj.text || messageObj.message}
                </p>
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
