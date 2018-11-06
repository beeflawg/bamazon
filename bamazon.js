var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    productList();
});

// function which prompts the user for what action they should take
function start() {


    inquirer
        .prompt([{
            name: "purchase",
            type: "input",
            message: "What is the Item ID of the item you want to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many of these items do you want to purchase?"
        }

        ])
        .then(function (answer) {
            // based on their answer, either call the bid or the 
            connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?", { item_id: answer.purchase }, function (err, res) {
                if (err) throw err;
                var chosenItm;
                var chosenQ 
                for (var i = 0; i < res.length; i++) {
                    // if (res[i].item_id === answer.purchase) {
                    //     chosenItm = res[i].item_id;
                    //   }
                    if (answer.quantity > res[i].stock_quantity) {
                        console.log("Insufficient quantity!!!")
                        return start();
                    }
                    else {
                        chosenQ = res[i].stock_quantity - answer.quantity
                        chosenItm = answer.purchase
                        var total = answer.quantity * res[i].price
                        console.log("Your total is $" + total)
                        console.log(chosenQ)
                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                              {
                                stock_quantity: chosenQ
                              },
                              {
                                item_id: chosenItm
                              }
                            ],
                            function(err, res) {
                              console.log(res.affectedRows + " products updated!\n");
                              // Call deleteProduct AFTER the UPDATE complete
                              return productList();
                            }
                          );
                        
                          // logs the actual query being run
                          console.log(query.sql);
                    }
                }
               
            })
        });
        // connection.end();
}

function productList() {
    // query the database for all items being auctioned
    connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        console.log(res);
        start();
    });
}

// function updateQuantity() {
//     var query = connection.query(
//       "UPDATE products SET ? WHERE ?",
//       [
//         {
//           stock_quantity: chosenQ
//         },
//         {
//           item_id: chosenItm
//         }
//       ],
//       function(err, res) {
//         console.log(res.affectedRows + " products updated!\n");
//         // Call deleteProduct AFTER the UPDATE complete
//       }
//     );
  
//     // logs the actual query being run
//     console.log(query.sql);
//   }

