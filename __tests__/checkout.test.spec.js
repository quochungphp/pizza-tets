
const { expect } = require('@jest/globals');
const Checkout = require('../Checkout.js');
describe("Checkout", () => {
  test("it should return order info of customer Default", () => {
    const co = new Checkout();
    co.add("item1");
    co.add("item2");
    co.add("item3");
    const response = co.total();
    expect(response).toMatchObject({
      customerName: 'default',
      items: [
        { index: 1, description: 'Small Pizza x1' },
        { index: 2, description: 'Medium Pizza x1' },
        { index: 3, description: 'Large Pizza x1' }
      ],
      totalPrice: 987.97
    });
  });

  test("it should return order info of customer Infosys", () => {
    const co = new Checkout(0);
    co.add("item1");
    co.add("item1");
    co.add("item3");
    const response = co.total();
    expect(response).toMatchObject({
      customerName: 'Infosys',
      items: [
        { index: 1, description: 'Small Pizza x3' },
        { index: 2, description: 'Large Pizza x1' }
      ],
      totalPrice: 934.97
    });
  });

  test("it should return order info of customer Amazon", () => {
    const co = new Checkout(1);
    co.add("item2");
    co.add("item2");
    co.add("item2");
    co.add("item3");
    const response = co.total();

    expect(response).toMatchObject({
      customerName: 'Amazon',
      items: [
        { index: 1, description: 'Medium Pizza x3' },
        { index: 2, description: 'Large Pizza x1' }
      ],
      totalPrice: 1268.96
    });
  });

  test("it should return order info of customer Facebook", () => {
    const co = new Checkout(2);
    co.add("item2");
    co.add("item2");
    co.add("item2");
    co.add("item2");
    co.add("item3");
    const response = co.total();
    expect(response).toMatchObject({
      customerName: 'Facebook',
      items: [
        { index: 1, description: 'Medium Pizza x5' },
        { index: 2, description: 'Large Pizza x1' }
      ],
      totalPrice: 1681.95
    });
  });

  test("it should throw error when wrong item input", () => {
    try {
      const co = new Checkout(2);
      co.add();
      co.total();
    } catch (error) {
      expect(error).toMatchObject(new Error("Please, enter a item"));
    }
  });
  test("it should throw error when wrong rule input", () => {
    try {
      const co = new Checkout(123);
      co.add("item1");
      co.total();
    } catch (error) {
      expect(error).toMatchObject(new Error("Some thing went wrong: Invalid customer"));
    }
  });
});
