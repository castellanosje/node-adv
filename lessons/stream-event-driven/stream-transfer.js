import fs from "fs";
import http from "http";

const file = "../assets/the-universe.mp4"; // 🎥 Path to the video file

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "video/mp4" });

    // Creating a read stream for the video file and piping it to the response
    fs.createReadStream(file).pipe(res).on("error", console.error);
  })
  .listen(3000, () =>
    console.log(" Stream server running at http://localhost:3000")
  );

  // run this file with the trace_gc to trace garbage collection and check the gc algorithms used