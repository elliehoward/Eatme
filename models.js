function Ingredient(config) {
  this.name = config.name;
  this.qty = config.qty;
}

Ingredient.prototype.render = function(){
  var innerDiv = $('<div>');
  innerDiv.html(this.name);
  return innerDiv;
}

Ingredient.prototype.renderWithQty = function(){
  var innerDiv = $('<div>');
  innerDiv.html('(' + this.qty + ') ' + this.name);
  return innerDiv;
}

function Meal(config) {
    this.name = config.name;
    this.ingredients = [];
    for (var i = 0; i < config.ingredients.length; i++) {
      this.ingredients.push(new Ingredient(config.ingredients[i]))
    }
    this.condiments = config.condiments;
    this.type = config.type
};

Meal.prototype.renderMenuItem = function() {
  var panelDiv = $('<div class="panel panel-success">');
  var panelHeading = $('<div class="panel-heading draggable"> <h3 class="panel-title">' + this.name + '</h3> </div>');
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
  var mealDiv = $('<div>');
  var nameDiv = $('<div class="draggable"> <h3 >' + this.name + '</h3> </div>');
  var ingredientsDiv =  $('<div>');
  for (var i = 0; i < this.ingredients.length; i++) {
    ingredientsDiv.append(this.ingredients[i].renderWithQty());

  }
  mealDiv.append(nameDiv);
  mealDiv.append(ingredientsDiv);


  return mealDiv;

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

MealList.prototype.findMealByName = function(nameString) {
  for (var i = 0; i < this.meals.length; i++) {
    if(nameString === this.meals[i].name) {
      return this.meals[i];
    }
  }
}

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

var MealPlan = function(config) {
  this.days = [];
  this.name = config.name;
}

MealPlan.prototype.addDay = function(day) {
  this.days.push(day);
}

MealPlan.prototype.addMeal = function(config) {
  console.log(config);
  for (var i = 0; i < this.days.length; i++) {

    if(this.days[i].name === config.day) {
      this.days[i][config.meal.type] = config.meal;
      var foundIt = true;
    }
  }
  if(!foundIt) {
    var newDay = new Day({name: config.day})
    newDay[config.meal.type] = config.meal;
    this.days.push(newDay)
  }

};


MealPlan.prototype.save = function() {

  localStorage.setItem(this.name, JSON.stringify(this))
};

MealPlan.prototype.load = function() {
  var stringifriedDays = localStorage.getItem(this.name)
  this.days = JSON.parse(stringifriedDays).days
  this.name = JSON.parse(stringifriedDays).name
  for (var i = 0; i < this.days.length; i++) {
    this.days[i] = new Day(this.days[i]);
    if(this.days[i].breakfast) this.days[i].breakfast = new Meal(this.days[i].breakfast)
    if(this.days[i].lunch) this.days[i].lunch = new Meal(this.days[i].lunch)
    if(this.days[i].dinner) this.days[i].dinner = new Meal(this.days[i].dinner)
  }
}

MealPlan.prototype.renderEditableList = function() {
  var planDiv = $('<div class="well">');
  for (var i = 0; i < this.days.length; i++) {
    planDiv.append(this.days[i].renderDroppableView(this))
  }

  return planDiv;
}

//this goes on the shopping list view
MealPlan.prototype.renderPrintableShoppingList = function(){
  var neededIngredients = [];
  for (var i = 0; i < this.days.length; i++) {
    var currentDay = this.days[i]
    neededIngredients = neededIngredients.concat(currentDay.breakfast.ingredients)
    neededIngredients = neededIngredients.concat(currentDay.lunch.ingredients)
    neededIngredients = neededIngredients.concat(currentDay.dinner.ingredients)
  }
  var ingredientHash = {};
  for (var i = 0; i < neededIngredients.length; i++) {
    if(ingredientHash[neededIngredients[i].name]) {
      ingredientHash[neededIngredients[i].name].qty += neededIngredients[i].qty
    } else {
      ingredientHash[neededIngredients[i].name] = neededIngredients[i]
    }
  }
  var listDiv = $('<div>')
  for (var key in ingredientHash) {
    var quan = ingredientHash[key].qty

    var nameIngr = ingredientHash[key].name
    var ingrDiv = $('<div> (' + quan + ') ' + nameIngr + '</div>')

    listDiv.append(ingrDiv)
  }

  return listDiv
}

//loop through all days
// loop through breakfast, lunch, and dinner's meal ingredients and call render
// for advanced stuff, figure out how to group ingredients with the same name

var Day = function(config) {
  this.name = config.name;
  this.breakfast = config.breakfast;
  this.lunch = config.lunch;
  this.dinner = config.dinner;
}

Day.prototype.renderDroppableView = function (mealPlan) {
  var dayNameDiv = $('<div class="well well-sm">' + this.name + '</div>');
  if(this.breakfast) {
    var breakfastDiv = $('<div class="well well-sm plan droppable">Breakfast: <p class="droppable">' + this.breakfast.name + '</p> </div>')
  } else {
    var breakfastDiv = $('<div class="well well-sm plan droppable">Breakfast: <p class="droppable"></p> </div>')

  }
  if(this.lunch) {
    var lunchDiv = $('<div class="well well-sm plan droppable">Lunch: <p class="droppable">' + this.lunch.name + '</p> </div>')
  } else {
    var lunchDiv = $('<div class="well well-sm plan droppable">Lunch: <p class="droppable"></p> </div>')

  }
  if(this.dinner) {
    var dinnerDiv = $('<div class="well well-sm plan droppable">Dinner: <p class="droppable">' + this.dinner.name + '</p> </div>')
  } else {
    var dinnerDiv = $('<div class="well well-sm plan droppable">Dinner: <p class="droppable"></p> </div>')

  }
  dayNameDiv.append(breakfastDiv);
  dayNameDiv.append(lunchDiv);
  dayNameDiv.append(dinnerDiv);


  $( ".draggable" ).draggable();
  dayNameDiv.children().droppable({
    drop: function( event, ui ) {
      var mealType = $(this).text()
      $( this ).find( "p" ).html( lastClickedPanel );
      var cloned = $(this).parent().clone();
      cloned.children().remove();
      var day = cloned.text().split('y')[0]+'y';
      mealPlan.addMeal({day: day, meal: selectedMeal})
    }
  });
  return dayNameDiv;
};

Day.prototype.renderPrintableView = function () {

}
