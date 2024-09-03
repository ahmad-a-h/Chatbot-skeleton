import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ChatCompletionRequestMessage } from 'openai';
// Remote Endpoints
interface ExtendedChatCompletionRequestMessage extends ChatCompletionRequestMessage {
    id?: string;
    showButtons?: boolean;
    isTableMessage: boolean;
    feedback: number
}

const chatList = async () => {
    const apiEndpoint: string = 'https://riskgpt2-backend-dev01.azurewebsites.net/';
    const websocketEndpoint: string = 'wss://riskgpt2-backend-dev01.azurewebsites.net/chat';

    const response = await fetch('https://api.example.com/messages', { cache: 'no-store' });
    const messages = await response.json();
    return (
        <div className="mx-5 text-white">
            {messages.map((message, index) => {
                const last = index === messages.length - 1;

                return (
                    <div key={message.id}>
                        {/* User Message */}
                        {message.role === 'UserRole' && (
                            <div className="flex flex-row-reverse items-start p-3">
                                <img
                                    height="40"
                                    width="40"
                                    src="path_to_user_image" // Replace with actual image source
                                    className="rounded-full mr-5"
                                    alt="user_photo"
                                />
                                <div className="user-message">
                                    <span dangerouslySetInnerHTML={{ __html: message.content }} />
                                </div>
                            </div>
                        )}

                        {/* Assistant Message */}
                        {message.role === 'AssistantRole' && (
                            <div className="flex items-start p-3">
                                <img
                                    height="40"
                                    width="40"
                                    src="/assets/img/kfh-bot-logo.png" // Replace with actual image source
                                    className="rounded-full mr-5"
                                    alt="bot_photo"
                                />
                                {/* Loading Indicator */}
                                {last && isBusy && (
                                    <div className="loading-indicator">
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                )}

                                <div className="parent-container">
                                    {!last || !isBusy ? (
                                        <>
                                            <div className={!message.isTableMessage ? 'bot-message' : 'bot-table-message'}>
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: message.isTableMessage
                                                            ? sanitizeHtml(message.content)
                                                            : message.content,
                                                    }}
                                                />
                                            </div>

                                            {/* Icons and Feedback Section */}
                                            <div className="icon-buttons flex-row-reverse">
                                                <button className="icon-button">
                                                    <i className="fa-solid fa-print"></i>
                                                </button>
                                                {message.feedback !== -1 && message.feedback !== 1 && (
                                                    <>
                                                        <button
                                                            className="icon-button"
                                                            onClick={() => showFeedbackBox('thumbsDown', message)}
                                                        >
                                                            <i className="fa-regular fa-thumbs-down"></i>
                                                        </button>
                                                        <button
                                                            className="icon-button"
                                                            onClick={() => showFeedbackBox('thumbsUp', message)}
                                                        >
                                                            <i className="fa-regular fa-thumbs-up"></i>
                                                        </button>
                                                    </>
                                                )}

                                                {/* Feedback Text Box */}
                                                {feedbackType && feedbackMessage === message && (
                                                    <div className="feedback-box">
                                                        <input
                                                            type="text"
                                                            value={feedbackText}
                                                            onChange={(e) => setFeedbackText(e.target.value)}
                                                            placeholder="Tell us more..."
                                                            onKeyDown={(e) => e.key === 'Enter' && submitFeedback(message)}
                                                            autoFocus
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    ) : null}
                                </div>

                                {message.isTableMessage && (
                                    <div
                                        onClick={() => showPopup(message)}
                                        className="expand-button"
                                        style={{
                                            cursor: 'pointer',
                                            color: '#666',
                                            width: '80px',
                                            alignSelf: 'center',
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginLeft: '20px',
                                            border: 'solid 2px #f0f0f0',
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: '30px',
                                            padding: '5px',
                                        }}
                                    >
                                        <i className="fa-solid fa-maximize" style={{ color: '#666', fontSize: '10px' }}></i>
                                        <span style={{ marginLeft: '5px' }}>Expand</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
const fetchUserConversation = async (requestData: any) => {
    const apiEndpoint = 'https://api.example.com/fetch_user_conversation'; // Replace with your actual API endpoint
    var conv_id: string = uuidv4();
    var user_id: string = uuidv4();
    var messages: ExtendedChatCompletionRequestMessage[] = [];


    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const conversation = data.conversation;
        conv_id = data.conversation_id
        messages = []; // Clear current messages
        // Iterate through the conversation array and add messages to this.messages
        console.log(conversation);
        conversation.forEach((msg: any) => {
            const messageObj = {
                id: msg.id,
                role: msg.role,
                content: msg.content,
                timestamp: msg.timestamp,
                isTableMessage: false,
                // this.containsMarkdownTable(msg.content),
                feedback: msg.feedback
            };
            return messages.push(messageObj);
            // this.scrollToBottom();
        });
    } catch (error) {
        console.error('Error fetching user conversation:', error);
        throw error; // Re-throw the error for further handling if needed
    }
};
async function fetchPreviousMessages() {
    const requestData = {
        UserID: this.user_id
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        
    } catch (error) {
        console.error('Error fetching user conversation:', error);
        throw error; // Re-throw the error for further handling if needed
    }
    this.http.post<any>(`${this.apiEndpoint}fetch_user_conversation`, requestData)
        .subscribe(
            response => {
                console.log("Previous Chat", response);


                console.log(this.messages);
                this.scrollToBottom();
            },
            error => {
                console.error('API Request Failed:', error);
            });
}
export default chatList
