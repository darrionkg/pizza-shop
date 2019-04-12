//Business Logic
function Pizza(size, cheese, crust, sauce) {
  this.size = size,
  this.toppings = [],
  this.cost = 0
  this.cheese = cheese,
  this.crust = crust,
  this.sauce = sauce
}

Pizza.prototype.checkSize = function() {
  if(this.size === "small") {
    this.cost += 7.99;
  } else if(this.size ==="medium") {
    this.cost += 9.99;
  } else if(this.size ==="large") {
    this.cost += 11.99;
  } else if(this.size ==="extraLarge") {
     this.cost += 12.99;
  }
}

Pizza.prototype.addToToppings = function(topping) {
  this.toppings.push(topping);
  if(topping === "bacon" || topping === "grilled chicken") {
    this.cost += 0.50;
  } else if(topping === "mushrooms" || topping === "banana peppers" || topping === "jalapeno peppers") {
    this.cost += 0.25;
  }
};

Pizza.prototype.checkCheeseCrust = function() {
  if(this.crust === "Cheese Filled Crust") {
    this.cost += 1.00;
  }
}

function SidesOrDrinks() {
  this.sides = ["Breadsticks", "Coca Cola"],
  this.numberOfSides = [0, 0],
  this.sidesCost = 0
}

SidesOrDrinks.prototype.addASide = function() {
  this.numberOfSides[0] += 1;
  this.sidesCost += 4;
}

SidesOrDrinks.prototype.addADrink = function() {
  this.numberOfSides[1] += 1;
  this.sidesCost += 3;
}

function Order() {
  this.totalCost = 0,
  this.listOfPizzas = [],
  this.itemId = 0
}

Order.prototype.updateId = function() {
  this.itemId += 1;
}

Order.prototype.addPizza = function(pizza) {
  this.listOfPizzas.push(pizza);
  this.updateId();
  this.totalCost += pizza.cost;
}

Order.prototype.addSidesAndDrinks = function(sides) {
  this.updateId();
  this.totalCost += sides.sidesCost;
}

Order.prototype.printOrder = function(sides) {
  var pizzaMessage = "";
  for(var i = 0; i < this.listOfPizzas.length; i++) {
    pizzaMessage += "1x " + this.listOfPizzas[i].size + " " + this.listOfPizzas[i].cheese + " Pizza:<br>-Toppings:<br>";
    for(var j = 0; j < this.listOfPizzas[i].toppings.length; j++) {
      pizzaMessage += "--" +this.listOfPizzas[i].toppings[j] + "<br>";
    }

  if(sides.numberOfSides[0] > 0) {
    pizzaMessage += sides.numberOfSides[0] + "x 12 piece breadsticks<br>";
  }
  if(sides.numberOfSides[1] > 0) {
    pizzaMessage += sides.numberOfSides[1] + "x 2 liter Coca Colas";
  }
    return pizzaMessage;
  }
}

//User Interface Logic

var order = new Order();

function updateItemCount() {
  var itemCount = order.itemId;
  var total = order.totalCost.toFixed(2);
  $("#itemCount").text(itemCount);
  $("#cost").text("Total - $" + total)
  $("#cost").show();
  $("#itemCount").show();
}

function updateActiveClass(hideClass, showClass, removeClass, addClass) {
  $("#checkout").hide();
  $(hideClass).hide();
  $(showClass).show();
  $(removeClass).removeClass("active");
  $(addClass).addClass("active");
}

$(document).ready(function() {
  $("#addToCart1").click(function() {
    console.log("test");
    var size = $("#size").val();
    var crust = $("#crust").val();
    var sauce = $("#sauce").val();
    var cheese = $("#cheese").val();
    var newPizza = new Pizza(size, cheese, crust, sauce);
    $("input:checkbox[name=toppingChoice]:checked").each(function(){
      var topping = $(this).val();
      newPizza.addToToppings(topping);
    });
    newPizza.checkSize();
    newPizza.checkCheeseCrust();
    order.addPizza(newPizza);
    updateActiveClass("#customPizza", "#sidesOrDrinks", "li#pizzaMenu", "li#sidesDrinksMenu");
    updateItemCount();
  });

  $("#pizzaMenu").click(function() {
      updateActiveClass("#sidesOrDrinks", "#customPizza", "li#sidesDrinksMenu", "li#pizzaMenu");
  });

  $("#sidesDrinksMenu").click(function() {
    updateActiveClass("#customPizza", "#sidesOrDrinks", "li#pizzaMenu", "li#sidesDrinksMenu");
  });

  var sides = new SidesOrDrinks();
  $("#addDrinks").click(function() {
    sides.addADrink();
    order.addSidesAndDrinks(sides);
    updateItemCount();
  });

  $("#addSticks").click(function() {
    sides.addASide();
    order.addSidesAndDrinks(sides);
    updateItemCount();
  });

  $("#userOrder").submit(function(event) {
    event.preventDefault();
    $("li#pizzaMenu").removeClass("active");
    $("li#sidesDrinksMenu").removeClass("active");
    $("#customPizza").hide();
    $("#sidesOrDrinks").hide();
    updateItemCount();
    var message = order.printOrder(sides);
    $("#checkoutMessage").html(message);
    $("#checkout").show();
  });
});
