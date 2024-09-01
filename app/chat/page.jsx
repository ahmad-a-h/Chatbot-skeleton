"use client";

import { useState } from "react";
import { FaPrint, FaThumbsUp, FaThumbsDown, FaComments, FaVolumeUp, FaPaperPlane, FaMicrophone, FaRegPaperPlane } from "react-icons/fa";
import { FaRotateLeft } from "react-icons/fa6";
// import classNames from 'classnames';

export default function Page() {
  const [activeButton, setActiveButton] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const setActive = (button) => {
    setActiveButton(button);
  };

  const showConfirmDialog = () => {
    // Add logic for showing confirmation dialog
  };

  const onScroll = (e) => {
    // Handle scroll event
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const submitFeedback = (message) => {
    // Submit feedback logic
  };
  const [transcript, setTranscript] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  const resizeTextarea = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const createCompletion = () => {
    // Add your logic for handling the input submission
    console.log('Message sent:', transcript);
    setTranscript(''); // Clear the textarea after sending the message
  };
  return (
    <div
      className="body-container w-full h-full relative"
      style={{ overflow: "hidden" }}
    >
      <div className="header-container">
        <div className="header-button-container">
          <button onClick={() => setActive("chat")}>
            <FaComments />
            <span className="button-text">Chat</span>
          </button>
          <button>
            <FaVolumeUp style={{ fontSize: "16px" }} />
            <span className="button-text">Voice Mode</span>
          </button>
        </div>
        <div className="header-button-container">
          <button onClick={() => setShowPopup(true)}>
            <FaRotateLeft style={{ fontSize: "16px" }} />
            <span className="button-text">Reset</span>
          </button>
        </div>

        <div
          id="intelligenciaChatHeader"
          className="header-logo justify-center flex items-center p-5"
        >
          <h1 className="text-white" style={{ margin: 0 }}>
            <img src="" alt="Logo" />
          </h1>
        </div>
      </div>
      <div className="chat-content-wrapper">
        {/* Welcome Message Appears In Beginning */}
        <div className="center-screen welcome-message">
          <div>
            <h2>Hello</h2>
          </div>
          <p></p>
          <div>
            <h1>How Can I Assist You Today?</h1>
          </div>
        </div>
        <div className="main-content flex-1 overflow-hidden">
          <div
            id="mainChatContainer"
            onScroll={onScroll}
            className="overflow-y-auto"
          >
            <div className="mx-5 text-white">
              <div>
                {/* User Message */}
                <div className="flex flex-row-reverse items-start p-3">
                  <img
                    height="40"
                    width="40"
                    className="rounded-full mr-5"
                    alt="user_photo"
                  />
                  <div className="user-message">
                    <span></span>
                  </div>
                </div>

                {/* Bot Message */}
                <div
                  className="flex items-start p-3"
                  style={{ alignItems: "center" }}
                >
                  <img
                    height="40"
                    width="40"
                    src=""
                    className="rounded-full mr-5"
                    alt="bot_photo"
                  />

                  <div className="parent-container">
                    <div className="message-bot-container">
                      <div className="bot-message"></div>
                      <div className="bot-table-message">
                        <span></span>

                        {/* Popup */}
                        {showPopup && (
                          <div className="popup" onClick={closePopup}>
                            <div
                              className="popup-content"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="close-btn"
                                onClick={closePopup}
                              >
                                <i
                                  className="fas fa-times"
                                  style={{ color: "white" }}
                                ></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Container for the icons */}
                      <div className="icon-buttons flex-row-reverse">
                        <button className="icon-button">
                          <FaPrint />
                        </button>
                        <button className="icon-button">
                          <FaThumbsDown />
                        </button>
                        <button className="icon-button">
                          <FaThumbsUp />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      cursor: "pointer",
                      color: "rgb(102, 102, 102)",
                      width: "80px",
                      alignSelf: "center",
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "20px",
                      border: "solid 2px #f0f0f0",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "30px",
                      padding: "5px",
                    }}
                  >
                    <i
                      className="fa-solid fa-maximize"
                      style={{
                        color: "rgb(102, 102, 102)",
                        fontSize: "10px",
                        marginBottom: "2px",
                      }}
                    ></i>
                    <span style={{ marginLeft: "5px" }}>Expand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-div-container">
        <div
          id="chatTextBox"
          className="input-text-container w-full"
          style={{
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            height: '48px',
          }}
        >
          <textarea
            className="resize-none"
            style={{
              borderBottomLeftRadius: '20px',
              borderTopLeftRadius: '20px',
              width: 'calc(100% - 60px)',
              height: '100%',
              border: 'none',
              backgroundColor: '#f0f0f0',
              boxSizing: 'border-box',
              resize: 'none',
              paddingTop: '0.5rem',
              paddingRight: '0.75rem',
              paddingBottom: '0.5rem',
              paddingLeft: '0.75rem',
              alignContent: 'center',
            }}
            placeholder="Message..."
            rows="1"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onInput={resizeTextarea}
            onKeyUp={(e) => {
              if (e.key === 'Enter') createCompletion();
            }}
          ></textarea>

          {/* Buttons at the end of input type text */}
          <div className="flex m-2">
            <button
              type="button"
              onClick={createCompletion}
              style={{
                backgroundColor: '#E0E3E8',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                border: 'none',
              }}
            >
              {!isBusy && (
                <FaRegPaperPlane />
                // <i
                //   className="fa-regular fa-paper"
                //   style={{ fontSize: '16px' }}
                // ></i>
              )}
            </button>
            
            {/* Uncomment and modify if you have a voice-to-text component */}
            { 
            <button
            style={{
                backgroundColor: '#E0E3E8',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                border: 'none',
              }}>
                <FaMicrophone />
            </button>
            /* <VoiceToText
              onListeningStatusChange={onListeningStatusChange}
              onTranscriptChange={onTranscriptChange}
            /> */}
            
          </div>
        </div>

        {/* Disclaimer outside the flex container to be naturally positioned below */}
        <div className="text-xs text-center mt-2">
          <span className="disclaimer">
            AI can make mistakes. Consider checking important information. ©
            Intelligencia SAS 2024 All Rights Reserved
          </span>
        </div>
      </div>
    </div>
  );
}
