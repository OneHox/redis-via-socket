import http from "http";
import { Server } from "socket.io";
import { Express } from "express";
import authSockets from "./sockets-auth";
import redisSockets from "./sockets-redis";
import tokenMiddlewares from "./middlewares/token";

export default function (app: Express) {
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: "*" }, path: "/" });

  // tokenMiddlewares(io);

  // authSockets(io);
  redisSockets(io);

  return server;
}
