import logUpdate from "log-update";

const toSandclock = () => "⏳";

const wait = (sec) =>
	new Promise((resolves) => {
		setTimeout(resolves, sec * 1000);
	});

const tasks = [
	wait(6),
	wait(9),
	wait(3),
	wait(4),
	wait(5),
	wait(3),
	wait(7),
	wait(5),
	wait(6),
	wait(10),
];


class PromiseQueue{
    constructor(promises=[], concurrentCount = 1){
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.done = [];
    }

    get runNewTask(){
        return (this.running.length < this.concurrent) && this.todo.length;
    }

    logTask( ){
        const {todo, running, done} = this;
        logUpdate(`
                todo:[${todo.map(toSandclock)}]
                running:[${running.map(toSandclock)}]
                done:[${done.map(toSandclock)}]
            `);
    }

    run(){
        while(this.runNewTask){
            const promise = this.todo.shift();
            this.running.push(promise);
            this.logTask();
            promise.then(()=>{
                this.done.push(promise);
            }).catch(()=>console.error)
            .finally(()=>{
                this.running = this.running.filter(p=>p !== promise);
                this.logTask();
                this.run();
            })
        }
    }
}

const taskQueue = new PromiseQueue(tasks, 2);

taskQueue.run();