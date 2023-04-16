import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
  })
);

server.use(bodyParser.json());

export default server;
