import React, { useState , useEffect} from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./chat/Chat";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("enter_room", room);
      setShowChat(true);
    }
  };

  const showOptions =()=>{
    if(showChat === false){
      return (
        <div className="app-box">
        <h3>Your own personal chat room</h3>
        <input
          type="text"
          placeholder="Your Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Your room's name"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>Create</button>
      </div>
      )
   
    }
  }

  useEffect(() => {
    
    
  }, [showChat])

  return (
    <div className="App">
     {showChat !== true ? showOptions() :  <Chat socket={socket} username={username} room={room} />}
    </div>
  );
}

export default App;
