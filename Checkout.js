
const {rules, items} = require('./data.js');
class Checkout {

  orderItems = [];

  currentPricingRules = "";

  items = items;

  rules = rules;

  response = {} | undefined;

  constructor(pricingRules) {
    this.currentPricingRules = pricingRules;
  }

  isRule () {
    if(this.currentPricingRules && !this.rules[this.currentPricingRules]) {
      throw new Error("Invalid customer");
    }
    return true
  }

  isCart() {
    const countItems = this.orderItems.length;
    if (countItems === 0) {
      throw new Error("Please, enter a item");
    }
    return true;
  }

  isItem(item) {
    const itemKeys = Object.keys(this.items);
    if (itemKeys.indexOf(item) === -1) {
      throw new Error(`Invalid order item : ${item}`)
    }
    return true
  }

  add(item) {
    if (!item) {
      throw new Error("Please, enter a item");
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
      if (this.rules[this.currentPricingRules] && this.rules[this.currentPricingRules].gift) {
        const customerHasGift = this.rules[this.currentPricingRules].gift;
        const hasGift =  Object.values(carts).findIndex(value => value.sku === customerHasGift.sku);
        if (hasGift > -1) {
          carts[hasGift].quantity++;
        }
      }

      // Process if customer has discount
      if (this.rules[this.currentPricingRules] && this.rules[this.currentPricingRules].discount) {
        const customerHasDiscount = this.rules[this.currentPricingRules].discount
        const hasDiscount =  Object.values(carts).findIndex(value => value.sku === customerHasDiscount.sku);
        if (hasDiscount > -1) {
          carts[hasDiscount].price = carts[hasDiscount].price - customerHasDiscount.discount;
        }
      }

      // Build output response
      this.buildResponse(carts)

      return this;
    } catch (error) {
      throw new Error(`Some thing went wrong: ${error.message}`)
    }
  }

  getResponse () {
    if(!this.response) {
      throw new Error("Some thing went wrong")
    }
    return this.response;
  }

  buildResponse (inputs) {
    const rule = this.rules[this.currentPricingRules]
    const customerName =  rule ? rule.name : "default"
    console.log(`Customer: ${customerName} \n`);
    console.log(`Items: \n`);
    let totalPrice = 0;
    const items =  [];
    for (let [key, value] of Object.entries(inputs)) {
      const index = ++key;
      const description = `${value.name} x${value.quantity}`;
      console.log(`${index}. ${description} \n`);
      totalPrice += value.price;
      items.push({index,  description})
    }

    console.log(`Output: Total $ ${totalPrice} \n`);
    this.response = {
      customerName,
      items,
      totalPrice
    }
  }
}
module.exports = Checkout;

// Uncomment if you wan to test with function
// Customer: Default
// const co = new Checkout();
// co.add("item1");
// co.add("item2");
// co.add("item3");
// co.total();


// Customer: Infosys
// const co = new Checkout(0);
// co.add("item1");
// co.add("item1");
// co.add("item3");
// co.total();

// Customer: Amazon
// const co = new Checkout(1);
// co.add("item2");
// co.add("item2");
// co.add("item2");
// co.add("item3");
// co.total();

// Customer: Face book
// const co = new Checkout(2);
// co.add("item2");
// co.add("item2");
// co.add("item2");
// co.add("item2");
// co.add("item3");
// co.total();
