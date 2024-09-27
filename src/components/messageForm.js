import React, { useState } from 'react';
import '../styles/styles.css';

const MessageForm = () => {
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const body = {
      userName: userName,
      text: text,
    };

    try {
      const response = await fetch(
        'https://0fliqp3oz1.execute-api.eu-north-1.amazonaws.com/post',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post message');
      }

      const data = await response.json();
      console.log(data.message);
      setResponseMessage(data.message);
      setUserName('');
      setText('');
      setShowOverlay(false);
    } catch (error) {
      console.error('Error posting message:', error);
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <button className="overlayBtn" onClick={() => setShowOverlay(true)}>
        New Message
      </button>

      {showOverlay && (
        <div className="overlay">
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="textinput"
              type="text"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Your name"
              required
            />
            <textarea
              className="messageinput"
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Your message"
              required
            />
            <button className="submitBtn" type="submit">
              Submit
            </button>
            <button
              className="closeBtn"
              type="button"
              onClick={() => setShowOverlay(false)}
            >
              Close
            </button>
          </form>
        </div>
      )}

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default MessageForm;
