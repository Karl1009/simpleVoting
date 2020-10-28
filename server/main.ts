import express from "express";
// import socketIO from "socket.io";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Knex from "knex";
import { routes } from "./routes";

const app = express();
const server = http.createServer(app);


dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const knexConfig = require("/knexfile");
const knex = Knex(knexConfig["development"]);


import { UserService } from "./services/AllService";
import { UserController } from "./controllers/UserController";
const userService = new UserService(knex);
export const userController = new UserController(userService);

import { UserService } from "./services/AllService";
import { UserController } from "./controllers/UserController";
const userService = new UserService(knex);
export const userController = new UserController(userService);



const API_VERSION = "/api/v1";
app.use(API_VERSION, routes);

app.use(express.static("public"));


const PORT = 8080;
server.listen(PORT, () => {
    console.log(`connected to ${PORT} port`);
});
