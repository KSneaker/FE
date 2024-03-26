import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
// const socket = io.connect('http://localhost:80');
const ChatPage = () => {
    // const [messages, setMessages] = useState([]);
    // const [message, setMessage] = useState('');
    // useEffect(() => {
    //     socket.on('message', (msg) => {
    //         setMessages((prevMessages) => [...prevMessages, msg]);
    //     });
    // }, []);

    // const handleMessageChange = (event) => {
    //     setMessage(event.target.value);
    // };

    // const handleSubmit = (event) => {
    //     console.log(message)
    //     event.preventDefault();
    //     socket.emit('message', message);
    //     setMessage('');

    // };

    return (
        <div className="page-container">
{/*             <div className="wrapper">
                <ul>
                    {messages?.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={message} onChange={handleMessageChange} />
                    <button type="submit">Send</button>
                </form>
            </div> */}
        </div>
    );
}

export default ChatPage;
