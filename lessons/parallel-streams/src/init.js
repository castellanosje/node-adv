import { faker } from "@faker-js/faker";
import { createWriteStream } from "node:fs";

const fileA = createWriteStream("db/fileA.ndjson");
const fileB = createWriteStream("db/fileB.ndjson");
const fileC = createWriteStream("db/fileC.ndjson");

function buildFakeUsers() {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    createdAt: faker.date.past(),
  };
}

[fileA, fileB, fileC].forEach((file, index) => {
  const currentFile = `file${["A", "B", "C"][index]}`;

  console.time(currentFile);

  for (let i = 0; i < 100; i++) {
    file.write(`${JSON.stringify(buildFakeUsers())}\n`);
  }
  file.end();
  console.timeEnd(currentFile);
});
