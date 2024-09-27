import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const UpdateMessageOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

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
      setId('');
      setText('');
      setShowOverlay(false);
    } catch (error) {
      setResponseMessage(
        `Error: ${error.response?.data?.message || error.message}`
      );
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
            />
            <textarea
              className="messageinput"
              type="text"
              placeholder="Enter New Text"
              value={text}
              onChange={e => setText(e.target.value)}
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

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateMessageOverlay;
