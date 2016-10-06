function Ingredient(config) {
  this.name = config.name;
  this.qty = config.qty;
}

Ingredient.prototype.render = function(){
  var innerDiv = $('<div>');
  innerDiv.html(this.name);
  return innerDiv;
}

function Meal(config) {
    this.name = config.name;
    this.ingredients = [];
    for (var i = 0; i < config.ingredients.length; i++) {
      this.ingredients.push(new Ingredient(config.ingredients[i]))
    }
     // loop over the ingredients that come in and create instances of the ingredient class, THEN append them to the array
    this.condiments = config.condiments;
    this.type = config.type
};

Meal.prototype.renderMenuItem = function() {
  var panelDiv = $('<div class="panel panel-default">');
  var panelHeading = $('<div class="panel-heading"> <h3 class="panel-title">' + this.name + '</h3> </div>');
  var panelBody =  $('<div class="panel-body">');
  for (var i = 0; i < this.ingredients.length; i++) {
    panelBody.append(this.ingredients[i].render());

  }
  panelDiv.append(panelHeading);
  panelDiv.append(panelBody);


  return panelDiv;
}


Meal.prototype.renderDetailView = function () {
  // show a more detailed description of the meal
};

function MealList(config) {
  this.meals = [];
}

MealList.prototype.renderMenu = function (type) {
  //todo - check the type variable - if it's not undefined then only render that type of meal
  var mealListDiv = $("<div>");
  var mealsToRender = this.meals;
  if (type) {
    mealsToRender = mealsToRender.filter(function (meal) {
      return meal.type === type;
    })
  }
  for (var i = 0; i < mealsToRender.length; i++) {
    mealListDiv.append(mealsToRender[i].renderMenuItem())
  }
  return mealListDiv;
}

MealList.prototype.addMeal = function (meal) {
  this.meals.push(meal);
  this.save();
};

MealList.prototype.save = function () {
  localStorage.setItem('mealObj', JSON.stringify(this.meals));
};

MealList.prototype.load = function() {
  var stringifiedMeals = localStorage.getItem('mealObj');
  var meals = JSON.parse(stringifiedMeals);
  for (var i = 0; i < meals.length; i++) {
    this.addMeal(new Meal(meals[i]));
  }
}
