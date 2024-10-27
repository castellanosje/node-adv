function wait(seconds, callback) {
	if (typeof seconds !== "number") {
		callback(new Error(`seconds needs to be a number`));
	}else{
		setTimeout(
			()=>callback(null, `the waiting for ${seconds} second/s finished.`),
			seconds * 1000
		);
	}
}

// call back hell ------ 
wait(1, (error, message) => {
    if (error) {
		console.log(error.message);
	}else{
        console.log(message);
        wait(2,(error, message) => {
	
            if (error) {
                console.log(error.message);
            }else{
                console.log(message);
                wait(3, (error, message) => {
            
                    if (error) {
                        console.log(error.message);
                    }else{
                        console.log(message);
                    }
                })
            }
        });
    }

});
