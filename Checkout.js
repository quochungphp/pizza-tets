
const {rules, items} = require('./data.js');
class Checkout {

  orderItems = [];

  currentPricingRules = "";

  items = items;

  rules = rules;

  constructor(pricingRules) {
    this.currentPricingRules = pricingRules;
  }

  isRule () {
    if(this.currentPricingRules && !this.rules[this.currentPricingRules]) {
      console.error("Invalid customer");
      return;
    }
    return true
  }

  isCart() {
    const countItems = this.orderItems.length;
    if (countItems === 0) {
      console.error("Please, enter a item");
      return false;
    }
    return true;
  }

  isItem(item) {
    const itemKeys = Object.keys(this.items);
    if (itemKeys.indexOf(item) === -1) {
      console.error(`Invert order item : ${item}`)
      return false
    }
    return true
  }

  add(item) {
    if (!item) {
      console.error("Please, enter a item");
    }
    this.isItem(item)
    return this.orderItems.push(item)
  }

  total() {
    try {
      // Check rule
      this.isRule();

      // Check cart
      this.isCart()

      // Process cart
      const carts = [];
      for (const item of this.orderItems) {
        const indexCartItem =  Object.values(carts).findIndex(value => value.sku === item);
        if (indexCartItem === -1) {
          carts.push({...this.items[item], "quantity" : 1})
          continue;
        }
        carts[indexCartItem].quantity++;
        const {quantity} = carts[indexCartItem];
        carts[indexCartItem].price = this.items[item].price * quantity;
      }

      // Process if customer has gift
      if (this.rules[this.currentPricingRules]) {
        const customerHasGift = this.rules[this.currentPricingRules].gift;
        const hasGift =  Object.values(carts).findIndex(value => value.sku === customerHasGift.sku);
        if (hasGift > -1) {
          carts[hasGift].quantity++;
        }
      }

      // Process if customer has discount
      if (this.rules[this.currentPricingRules]) {
        const customerHasDiscount = this.rules[this.currentPricingRules].discount
        const hasDiscount =  Object.values(carts).findIndex(value => value.sku === customerHasDiscount.sku);
        if (hasDiscount > -1) {
          carts[hasDiscount].price = carts[hasDiscount].price -  customerHasDiscount.discount;
        }
      }

      this.buildResponse(carts)
    } catch (error) {
      console.error(`Some thing went wrong: ${error.message}`)
      return false;
    }
  }

  buildResponse (inputs) {
    const rule = this.rules[this.currentPricingRules]
    const caseName =  rule ? rule.name : "default"
    console.log(`Customer: ${caseName} \n`);
    console.log(`Items: \n`);
    let totalPrice = 0
    for (let [key, value] of Object.entries(inputs)) {
      console.log(`${++key}. ${value.name} x${value.quantity}\n`);
      totalPrice += value.price;
    }
    console.log(`Output: Total $ ${totalPrice} \n`);
  }
}

//Customer: Default
const co = new Checkout();
co.add("item1");
co.add("item2");
co.add("item3");
co.total();


//Customer: Infosys
// const co = new Checkout(0);
// co.add("item1");
// co.add("item1");
// co.add("item3");
// co.total();

//Customer: Amazon
// const co = new Checkout(1);
// co.add("item2");
// co.add("item2");
// co.add("item2");
// co.add("item3");
// co.total();

//Customer: Face book
// const co = new Checkout(2);
// co.add("item2");
// co.add("item2");
// co.add("item2");
// co.add("item3");
// co.total();