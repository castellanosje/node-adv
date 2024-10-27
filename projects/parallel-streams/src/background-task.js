import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import split from "split";

console.log("Initializing", process.pid);

process.once("message", async (msg) => {
  try {
    await pipeline(createReadStream(msg), split(), async function* (source) {
      for await (const chunk of source) {
        if (!chunk.length) continue;

        const item = JSON.parse(chunk);
        if (!item.email.includes("hotmail")) continue;
        process.send({
          status: "ok",
          message: item,
        });
      }
    });
  } catch (err) {
    process.send({ status: "error", message: err.message });
  }
});
