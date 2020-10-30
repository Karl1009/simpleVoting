import express from "express";
import { userController } from "../main";

export const userRoutes = express.Router();

userRoutes.post("/vote/:campaign_id/:candidate_id", userController.vote);
userRoutes.get("/vote", userController.getVoteInfo);