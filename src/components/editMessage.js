import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const UpdateMessageOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        'https://0fliqp3oz1.execute-api.eu-north-1.amazonaws.com/edit',
        {
          id,
          text,
        }
      );
      setResponseMessage(response.data.message);
      setIsError(false); // Rensa error status
      setId('');
      setText('');
      setShowOverlay(false);
    } catch (error) {
      const errorMessage = `Error: ${
        error.response?.data?.message || error.message
      }`;
      setResponseMessage(errorMessage);
      setIsError(true);

      setTimeout(() => {
        setResponseMessage('');
        setIsError(false);
      }, 2000);
    }
  };

  return (
    <div>
      <button className="overlayBtn" onClick={() => setShowOverlay(true)}>
        Edit message
      </button>

      {showOverlay && (
        <div className="overlay">
          <form className="form">
            <input
              className="textinput"
              type="text"
              placeholder="Enter ID"
              value={id}
              onChange={e => setId(e.target.value)}
              required
            />
            <textarea
              className="messageinput"
              type="text"
              placeholder="Enter New Text"
              value={text}
              onChange={e => setText(e.target.value)}
              required
            />
            <button
              className="submitBtn"
              onClick={e => {
                e.preventDefault(); // Förhindra att formuläret skickas om
                handleSubmit();
              }}
            >
              Submit
            </button>
            <button className="closeBtn" onClick={() => setShowOverlay(false)}>
              Close
            </button>
          </form>
        </div>
      )}

      {responseMessage && (
        <p className={isError ? 'errorMessage' : 'successMessage'}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

export default UpdateMessageOverlay;
