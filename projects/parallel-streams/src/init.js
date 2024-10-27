import { faker } from "@faker-js/faker";
import { createWriteStream } from "node:fs";

// these are executed from the root when using npm run init
const fileA = createWriteStream("./db/fileA.ndjson");
const fileB = createWriteStream("./db/fileB.ndjson");
const fileC = createWriteStream("./db/fileC.ndjson");

function buildFakeUser () {
  return{
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
  }
}
console.log(buildFakeUser());

[fileA, fileB, fileC].forEach((file, index)=>{
  const filename = `file${["A", "B", "C"][index]}`;
  console.log(filename);

  for(let i=0; i<1000; i++){
    file.write(`${JSON.stringify(buildFakeUser())}\n`);
  }
  file.end();
});