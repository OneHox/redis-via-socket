import { app } from "./app";
import { PORT } from "./env";
import sockets from "./sockets";
import { spawn } from "child_process";

const server = sockets(app);

const startRedisServer = async () => {
  return new Promise((resolve, reject) => {
    let output = "";
    const child = spawn("service", ["redis-server", "start"]);
    child.stdout.on("data", (data) => (output += data));
    child.on("error", (err) =>
      reject(`Error during child process execution: ${err.message}`)
    );
    child.on("close", (code) => {
      if (code === 0) resolve(output);
      else reject(`Child process exited with code ${code}`);
    });
  });
};

const start = async () => {
  try {
    await startRedisServer();
  } catch (err) {
    console.error("====================================");
    // @ts-ignore
    console.error(err?.message);
    console.error("====================================");
  }

  const HOST = "0.0.0.0";
  server.listen(PORT, HOST, () => {
    console.log(`Server is on http://${HOST}:${PORT}`);
  });
};

start();
