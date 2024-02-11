import RedisSingleton from "../redis";
import { Server, Socket } from "socket.io";

export default (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("::host-set", async (data) => {
      const { key, value } = data;
      await RedisSingleton.getInstance()?.set(key, value);
    });

    socket.on("::client-get", async (data) => {
      const { key } = data;
      const result = await RedisSingleton.getInstance()?.get(key);
      socket.emit("~yield-get", result);
    });
  });
};
