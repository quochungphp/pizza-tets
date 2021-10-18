//   export const rules = [
//     {
//       "name" : "Infosys",
//       "buy" : 2,
//       "discount": 0,
//       "gift" : {
//         "sku" : "item1",
//         "name": "Small pizza",
//         "quantity" : 1
//       },
//     },
//     {
//       "name" : "Amazon",
//       "number" : 1,
//       "discount": {
//         "sku" : "item3",
//         "name": "Medium pizza",
//         "discount" : 95
//       },
//     },
//     {
//       "name" : "Facebook",
//       "number" : 1,
//       "discount": {
//         "sku" : "item3",
//         "name": "Large pizza",
//         "discount" : 5
//       },
//       "gift" : {
//         "sku" : "item2",
//         "name": "Medium pizza",
//         "quantity" : 1
//       },
//     }
//   ];

// export const  items = {
//     "item1" : {
//       "sku" : "item1",
//       "name" : "Small Pizza",
//       "description":  "10\" pizza for one person",
//       "price" : 269.99
//     },
//     "item2" : {
//       "sku" : "item2",
//       "name" : "Medium Pizza",
//       "description":  "12\" pizza for one person",
//       "price" : 322.99
//     },
//     "item3" : {
//       "sku" : "item3",
//       "name" : "Large Pizza",
//       "description":  "15\" pizza for one person",
//       "price" : 394.99
//     }
//   }

module.exports = {
  rules:[
    {
      "name" : "Infosys",
      "buy" : 2,
      "discount": 0,
      "gift" : {
        "sku" : "item1",
        "name": "Small pizza",
        "quantity" : 1
      },
    },
    {
      "name" : "Amazon",
      "number" : 1,
      "discount": {
        "sku" : "item3",
        "name": "Medium pizza",
        "discount" : 95
      },
    },
    {
      "name" : "Facebook",
      "number" : 1,
      "discount": {
        "sku" : "item3",
        "name": "Large pizza",
        "discount" : 5
      },
      "gift" : {
        "sku" : "item2",
        "name": "Medium pizza",
        "quantity" : 1
      },
    }
  ],
  items : {
    "item1" : {
      "sku" : "item1",
      "name" : "Small Pizza",
      "description":  "10\" pizza for one person",
      "price" : 269.99
    },
    "item2" : {
      "sku" : "item2",
      "name" : "Medium Pizza",
      "description":  "12\" pizza for one person",
      "price" : 322.99
    },
    "item3" : {
      "sku" : "item3",
      "name" : "Large Pizza",
      "description":  "15\" pizza for one person",
      "price" : 394.99
    }
  }
}
