var Customer = require("./Customer");

var base = new Customer();
base.addItemToList("product 1");
base.addItemToList("product 2");
base.addItemToList("product 3");
base.addItemToList("product 4");

module.exports = base;