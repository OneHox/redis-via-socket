import _ from "lodash";
import Joi from "joi";
import { emit_error } from "./_utils";
import db from "./database/index.json";
import { get_new_token } from "./helper";
import { Server, Socket } from "socket.io";
import authenticationMiddlewares from "./middlewares/authentication";

export default (io: Server) => {
  io.on("connection", (socket: Socket) => {
    authenticationMiddlewares(io, socket);

    socket.on("::host-login", async (payload: any) => {
      const { error } = Joi.object({ /** ... */ }).validate(payload);
      if (error) return emit_error(socket, error.message);

      const { username, password } = payload;
      if (username == db.username && password == db.password) {
        const object = await get_new_token({ username: db.username });
        socket.data = { user: object };
        socket.emit("~yield-login-succeed");
        socket.emit("~yield-token", object as any);
      } else {
        socket.emit("~yield-login-failed");
        socket.data = { user: undefined };
      }
    });

    socket.on("::host-logout", () => {
      socket.data = { user: undefined };
      socket.emit("~yield-login-failed");
      socket.emit("~yield-token", {} as any);
    });
  });
};
