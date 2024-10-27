class Logger {
  constructor() {
    this.logs = [];
    // old way of singleton
    // if(typeof Logger.instance === "object"){
    //   return Logger.instance;
    // }
    // Logger.instance = this;
    // return this;
    // ---
  }

  get count() {
    return this.logs.length;
  }

  log(message) {
    const timestamp = new Date().toISOString();
    this.logs.push({ message, timestamp });
    console.log(`${timestamp} - ${message}`);
  }
}

// the instantiation ensures that node handles this class as a singleton
module.exports = new Logger();

