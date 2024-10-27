import { readdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable, PassThrough } from "node:stream";
import { fork } from "node:child_process";

const backgroundTaskPath = "./src/background-task.js";
const output = createWriteStream("./db/output-hotmail.ndjson");

function merge(streams) {
  let pass = new PassThrough();
  let pending = streams.length;
  for (const stream of streams) {
    pass = stream.pipe(pass, { end: false });
    stream.once("end", () => --pending === 0 && pass.emit("end"));
  }

  return pass;
}

function childProcessAsStream(childProcess, file) {
  const stream = Readable({
    read() {},
  });
  childProcess.on("message", ({ status, message }) => {
    if (status === "error") {
      console.log({
        msg: "An error happended.",
        file,
        pid: childProcess.pid,
        message: message.split("\n"),
      });

      stream.push(null);
      return;
    }
    stream.push(
      JSON.stringify({ ...message, file, pid: childProcess.pid }).concat("\n")
    );
  });
  childProcess.send(file);
  return stream;
}

const files = await readdir("./db");

const messageCount = {};
const processesStreams = [];
for (const file of files) {
  const child = fork(backgroundTaskPath, [], { silent: false });

  messageCount[child.pid] = { count: 1 };

  const stream = childProcessAsStream(child, `./db/${file}`);
  processesStreams.push(stream);
}

const streams = merge(processesStreams);

await pipeline(
  streams,
  async function* (source) {
    for await (const chunk of source) {
      for (const line of chunk.toString().trim().split("\n")) {
        const { file, ...data } = JSON.parse(line);
        const count = messageCount[data.pid].count++;
        console.log(`${file} processed #${count} items.`);
        yield JSON.stringify(data).concat("\n");
      }
    }
  },
  output
);

console.timeEnd("allocating-child-process");
