//Business Logic
function Pizza(size) {
  this.size = size,
  this.toppings = [],
  this.cost = 0
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

Pizza.prototype.addToToppings = function (topping) {
  this.toppings.push(topping);
  if(topping === "bacon" || topping === "grilledChicken") {
    this.cost += 0.50;
  } else if(topping === "mushrooms" || topping === "bananaPeppers" || topping === "jalapenoPeppers") {
    this.cost += 0.25;
  }
};

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
  this.listOfItems = [],
  this.itemId = 0
}

Order.prototype.updateId = function() {
  this.itemId += 1;
}

Order.prototype.addPizza = function(pizza) {
  this.listOfItems.push(pizza);
  this.updateId();
  this.totalCost += pizza.cost;
}

Order.addSidesAndDrinks = function(sides) {
  this.updateId();
  this.cost += sides.sidesCost;
}

//User Interface Logic

var order = new Order();

function updateItemCount() {
  var itemCount = order.itemId;
  $("#itemCount").text(itemCount);
  $("#cost").text("Total - $" + order.totalCost)
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
    var size = $("#size").val();
    var crust = $("#crust").val();
    var sauce = $("#sauce").val();
    var newPizza = new Pizza(size);
    $("input:checkbox[name=toppingChoice]:checked").each(function(){
      var topping = $(this).val();
      newPizza.addToToppings(topping);
    });
    newPizza.checkSize();
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
  });

  $("#addSticks").click(function() {
    sides.addASide();
  });

  $("#userOrder").submit(function(event) {
    $("li#pizzaMenu").removeClass("active");
    $("li#sidesDrinksMenu").removeClass("active");
    $("#customPizza").hide();
    $("#sidesOrDrinks").hide();
    $("#checkout").show();
    event.preventDefault();
  });
});
