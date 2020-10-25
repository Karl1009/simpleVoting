import express from "express";
// import socketIO from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);














const PORT = 8080;
server.listen(PORT, () => {
    console.log(`connected to ${PORT} port`);
});
