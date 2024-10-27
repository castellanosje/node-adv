var base_prototype = require("./base_prototype");


// var Jaime = new Customer("Jaime");
var jaime = base_prototype.clone();
jaime.name = "Jaime";
jaime.addItemToList("product 5");

// var john = new Customer("John Something");
var john = base_prototype.clone();
john.name = "John";
john.addItemToList("product 6");

console.log(`${jaime.name}: ${jaime.cartItems}`);
console.log(`${john.name}: ${john.cartItems}`);
