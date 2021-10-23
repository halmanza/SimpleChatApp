import React, { useState, useEffect } from "react";
import './chat.scss'
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [allMessages,setAllMessages]= useState([]);

  const sendMessage = async () => {
    if (message !== "") {
      const data = {
        room: room,
        username: username,
        message: message,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send", data);
      setAllMessages((updateList)=> [...updateList, data])
      setMessage("");
    }

    
  };

  useEffect(() => {
    socket.on("received", (receviedData) => {
      setAllMessages((listMessage)=> [...listMessage,receviedData])
    });
  }, [socket]);
  return (
    <div className="chatRoom">
      <div className="chatRoom-head">
        <h3>{room} room</h3>
      </div>
      <div className="chatRoom-body">
          <ScrollToBottom className="scroll-container">
        {allMessages.map((item)=>{
            return (<div className="message" id={username === item.username? "User" : "OtherUser"}>

            <div>
                <div className="content">
                    <p>{item.message}</p>
                </div>
                <div className="meta">
                    <p>Time:  {item.time}</p>
                    <p>User: {item.username}</p>
                </div>
            </div>
            </div>)
        })}
        </ScrollToBottom>
      </div>
      <div className="chatRoom-footer">
        <input
          type="text"
          placeholder="Your Message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e)=>{e.key === 'Enter' && sendMessage()}}
          value={message}
        />
        <button onClick={sendMessage} >send</button>
      </div>
    </div>
  );
};

export default Chat;
