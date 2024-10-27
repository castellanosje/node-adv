import { promisify } from "util";

function wait(seconds, callback) {
	if (typeof seconds !== "number") {
		callback(new Error(`seconds needs to be a number`));
	} else {
		setTimeout(
			() => callback(null, `the waiting for ${seconds} second/s finished.`),
			seconds * 1000
		);
	}
}

const primisifiedWait = promisify(wait);
primisifiedWait(1)
	.then((message) => {
		
        console.log(message);

		primisifiedWait(2)
			.then((message) => {
				
                console.log(message);
				
                primisifiedWait(3)
					.then((message) => {
						console.log(message);
					})
					.catch((error) => console.log(`Opps ${error.message}`));
			})
			.catch((error) => console.log(`Opps ${error.message}`));
	})
	.catch((error) => console.log(`Opps ${error.message}`));

// call back hell ------
// wait(1, (error, message) => {
// 	if (error) {
// 		console.log(error.message);
// 	} else {
// 		console.log(message);
// 		wait(2, (error, message) => {
// 			if (error) {
// 				console.log(error.message);
// 			} else {
// 				console.log(message);
// 				wait(3, (error, message) => {
// 					if (error) {
// 						console.log(error.message);
// 					} else {
// 						console.log(message);
// 					}
// 				});
// 			}
// 		});
// 	}
// });
