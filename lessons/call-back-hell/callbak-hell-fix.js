const wait = (sec) => new Promise((resolves, rejects)=>{
	if(typeof sec !== "number"){
		rejects(new Error("Sec must be a number."));
	}

	setTimeout(()=>{
		resolves("ok, we waited enough, lets finish.");
	}, sec * 1000);
})


wait(1)
	.then(console.log)
	.then(()=>55)
	.then((number)=>console.log(`I am the very last log. and last value returned was ${number}`))
	.catch((error)=>console.log(`Opps! ${error.message}`));

console.log("first tick finished");