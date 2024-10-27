import fs from "fs";
import { promisify } from "util";

const promisifiedWriteFile = promisify(fs.writeFile);
const promisifiedUnlink = promisify(fs.unlink);
const wait = (sec) =>
	new Promise((resolves) => {
		setTimeout(resolves, sec * 1000);
	});

// async await aproach
const executeTasksInSequence = async () => {
	console.log("🚀 Starting the process...");
	await wait(1);
	console.log("⏳ Waiting for the first timeout...");
	await wait(2);
	console.log("⏳ Waiting a bit more...");
	try {
		await promisifiedWriteFile("test.txt", "Test File...");
	} catch (error) {
		console.error("❌ Error writing file:", error);
	}
	console.log("✅ test.txt has been created");
	await wait(3);
	try {
		await promisifiedUnlink("test.txt");
	} catch (error) {
		console.error("❌ Error removing file:", error);
	}
	console.log("🗑️ test.txt has been removed");
	console.log("🏁 Sequential execution complete");
};

// catch then approach

// const executeTasksInSequence = () =>
// 	Promise.resolve()
// 		.then(() => console.log("🚀 Starting the process..."))
// 		.then(() => wait(1))
// 		.then(() => "⏳ Waiting for the first timeout...")
// 		.then(console.log)
// 		.then(() => wait(2))
// 		.then(() => "⏳ Waiting a bit more...")
// 		.then(console.log)
// 		.then(() => promisifiedWriteFile("test.txt", "Test File..."))
// 		.catch((error) => console.error("❌ Error writing file:", error))
// 		.then(() => "✅ test.txt has been created")
// 		.then(console.log)
// 		.then(() => wait(3))
// 		.then(() => promisifiedUnlink("test.txt"))
// 		.catch((error) => console.error("❌ Error removing file:", error))
// 		.then(() => "🗑️ test.txt has been removed")
// 		.then(console.log)
// 		.then(() => "🏁 Sequential execution complete")
// 		.then(console.log);

// callback aproach CALLBACK HELL
// const executeTasksInSequence = () => {
// 	console.log("🚀 Starting the process...");
// 	setTimeout(() => {
// 		console.log("⏳ Waiting for the first timeout...");
// 		setTimeout(() => {
// 			console.log("⏳ Waiting a bit more...");
// 			fs.writeFile("test.txt", "Test File...", (error) => {
// 				if (error) {
// 					console.error("❌ Error writing file:", error);
// 				} else {
// 					console.log("✅ test.txt has been created");
// 					setTimeout(() => {
// 						fs.unlink("test.txt", (error) => {
// 							if (error) {
// 								console.error("❌ Error removing file:", error);
// 							} else {
// 								console.log("🗑️ test.txt has been removed");
// 								console.log("🏁 Sequential execution complete");
// 							}
// 						});
// 					}, 3000);
// 				}
// 			});
// 		}, 2000);
// 	}, 1000);
// };

executeTasksInSequence();
