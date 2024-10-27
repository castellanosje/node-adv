import {fork} from "child_process";

const processes = [
	fork("./src/app", ["3001"]),
	fork("./src/app", ["3002"]),
	fork("./src/app", ["3003"]),
];

console.log(`Forked ${processes.length} processes.`);


