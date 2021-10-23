import { Server } from "socket.io";
import express from 'express';
import { createServer } from "http";;
import cors from 'cors';

const app= express();

const server= createServer(app);


app.use(cors())

const IO= new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
})


IO.on('connection',(socket)=>{
    console.log('You are connected your id is  ', socket.id);

    socket.on("enter_room",(dataSent)=>{
        socket.join(dataSent)
        console.log(`User ${socket.id} joined ${dataSent}`)
    })

    socket.on("send",(dataReceived)=>{
            socket.to(dataReceived.room).emit("received",dataReceived)
    })
    socket.on("disconnect",()=>{
        console.log('User disconnected ', socket.id);
    })

})

server.listen(5000,()=>{
    console.log('Listening on port 5000');
});