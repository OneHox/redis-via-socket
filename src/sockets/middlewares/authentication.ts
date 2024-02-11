import { Server, Socket } from "socket.io";

export default (io: Server, socket: Socket) => {
  socket.use(([event, ...args], next) => {
    const { user } = socket.data;
    if (event.startsWith("::client")) next();
    else if (user) {
      const iat = user?.iat;
      if (iat && iat?.exp) {
        if (Math.floor(Date.now() / 1000) >= iat?.exp) {
          socket.emit("~yield-session-expired");
          return next(new Error("Session Expired"));
        } else next();
      } else {
        socket.emit("~yield-session-expired");
        return next(new Error("Session Expired"));
      }
    } else {
      switch (event) {
        case "::host-login":
          return next();
        default:
          const error = new Error("Unauthorized");
          return next(error);
      }
    }
  });
};
