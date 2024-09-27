import React, { useState } from 'react';
import '../styles/messageForm.css';

const MessageForm = () => {
  const [userName, setUserName] = useState('');
  const [text, setText] = useState('');

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

      setUserName('');
      setText('');
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        className="textinput"
        type="text"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        placeholder="Your name"
        required
      />
      <input
        className="textinput"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Your message"
        required
      />
      <button className="submitbtn" type="submit">
        Post Message
      </button>
    </form>
  );
};

export default MessageForm;
