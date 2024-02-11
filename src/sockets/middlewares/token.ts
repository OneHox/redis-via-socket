import db from "../database/index.json";
import { Server, Socket } from "socket.io";
import { get_new_token, verify_token } from "../helper";

export default (io: Server) => {
  io.use(async (socket: Socket, next) => {
    const { token } = socket.handshake.auth;
    if (token) {
      verify_token(token, async (res, err) => {
        if (err) {
          socket.data = { user: undefined };
          socket.emit("~yield-token", {});
        } else {
          const object = await get_new_token({ username: db.username });
          socket.data = { user: object };
          socket.emit("~yield-token", object);
        }
        next();
      });
    } else next();
  });
};
