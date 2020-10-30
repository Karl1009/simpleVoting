import express from "express";
import { userRoutes } from "./routers/userRoutes";
import { campaignRoutes } from "./routers/campaignRoutes";


export const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/campaign", campaignRoutes);
