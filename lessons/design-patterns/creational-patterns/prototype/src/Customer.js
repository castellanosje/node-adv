class Customer {
  constructor(name = "no name") {
    this._name = name;
    this._cartItems = [];
  }

  set name(value) {
    this._name = value;
  }

  get name() {
    return this._name;
  }

  get cartItems() {
    return this._cartItems.join(", ");
  }

  addItemToList(item) {
    this._cartItems.push(item);
  }

  clone(){
    var proto = Object.getPrototypeOf(this);
    var cloned = Object.create(proto);

    cloned._name = this._name;
    cloned._cartItems = [...this._cartItems];
    return cloned;
  }
}

module.exports = Customer;
