import _ from "lodash";
import { Server, Socket } from "socket.io";

export const usersInRoom = (io: Server, roomId: string) =>
  io.sockets.adapter.rooms.get(roomId);

export const get_sockets_except_socket_from_room = (
  io: Server,
  roomId: string,
  except: string
) => {
  const ids = usersInRoom(io, roomId);
  if (ids) return _.pull(Array.from(ids), except);
  else return [];
};

export function assign_values_to_keys<K, V>(
  sockets: K[],
  value: V | undefined
): Map<K, V | undefined> {
  const o = new Map<K, V | undefined>();
  for (let socket of sockets) o.set(socket, value);
  return o;
}

export const emit_error = (socket: Socket, message?: string) => {
  socket.emit("~yield-error", { message });
};

export const create_future_time = (add_seconds: number): Date => {
  const future = new Date();
  future.setSeconds(future.getSeconds() + add_seconds);
  return future;
};
