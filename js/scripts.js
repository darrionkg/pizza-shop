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
  this.sides = [],
  this.sidesCost = 0
}

SidesOrDrinks.prototype.addASide = function() {

}

SidesOrDrinks.prototype.addADrink = function() {

}

function Order() {
  this.totalCost = 0,
  this.listOfItems = [],
  this.itemId = 0
}

Order.prototype.addPizza = function(pizza) {
  this.listOfItems.push(pizza);
  this.totalCost += pizza.cost;
}

//User Interface Logic

var order = new Order();

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
    $("#customPizza").hide();
    $("#sidesOrDrinks").show();
    $("li#pizzaMenu").removeClass("active");
    $("li#sidesDrinksMenu").addClass("active");
  });

  $("#userOrder").submit(function(event) {
    console.log("test")
    event.preventDefault();
  });
});
