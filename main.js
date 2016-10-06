var mealsJSON = {
  'meals': {
    'breakfast':[
      {
        'name': 'Breakfast Burrito',
        'ingredients': {'tortilla': 1, 'eggs': 2, 'potatoes': 1, 'cheese (in cups)': 0.125, 'onion': 0.5}
      },
      {
        'name': 'Avocado Toast',
        'ingredients': {'bread': 2, 'avocado': 1, 'hummus': 0.25}
      },
      {
        'name': 'Yogurt Parfait',
        'ingredients': ['yogurt', 'berries', 'granola']
      },
      {
        'name': 'Fried Potatoes',
        'ingredients': ['potatoes', 'onion', 'coconut oil', 'avocado', 'cheese']
      }
    ],
    'lunch': [
      {
        'name': 'Veggie BLT Sandwich',
        'ingredients': ['bread', 'facon', 'avocado', 'lettuce', 'tomato', 'mayo']
      },
      {
        'name': 'Veggie Burrito',
        'ingredients': ['tortilla', 'rice', 'beans', 'cilantro', 'salsa', 'avocado', 'yellow squash', 'lettuce', 'sour cream', 'cheese']
      },
      {
        'name': 'Falafel Wrap',
        'ingredients': ['tortilla', 'hummus', 'falafel', 'tabboleh', 'onion', 'raddish']
      },
      {
        'name': 'Pasta Salad',
        'ingredients': ['spiral noodles', 'ranch', 'mayo', 'parsley', 'bell peppers', 'onion']
      }
    ],
    'dinner': [
      {
        'name': 'Sweet & Sour Tofu',
        'ingredients': ['tofu', 'pineapple', 'onion', 'bell peppers', 'soy sauce', 'ketchup', 'rice vinegar', 'corn starch', 'brown sugar', 'garlic', 'ginger']
      },
      {
        'name': 'Spaghetti',
        'ingredients': ['spaghetti noodles', 'marinara', 'olive oil', 'garlic', 'lettuce', 'cucumber', 'cherry tomatoes', 'ranch']
      },
      {
        'name': 'Self-Made TV Dinner >_<',
        'ingredients': ['soy chicken nugz', 'potatoes', 'butter', 'corn', 'soymilk', 'ketchup', 'baked beans', 'broccoli']
      }
    ]
  }

};
if(!localStorage.mealObj) {
  localStorage.setItem('mealObj', JSON.stringify(mealsJSON));
}
var breakfast = $('#saved-meals-breakfast');
var lunch = $('#saved-meals-lunch');
var dinner = $('#saved-meals-dinner');
var mealsParsed = JSON.parse(localStorage.mealObj).meals
var breakfastArr = mealsParsed.breakfast; // these should be pointing to the object in local storage so custom meals can be added.
var lunchArr = mealsParsed.lunch; //(populate the meal view from local storage)
var dinnerArr = mealsParsed.dinner;

function createPanel(mealName, ingredientsList) {
  var panelDiv = $('<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">'
   + mealName +
     '</h3> </div> <div class="panel-body">' + ingredientsList + '</div> </div>');
     return panelDiv;
};


function appendPanels(mealArray, mealType) {
  for (var i = 0; i < mealArray.length; i++) {
    var currentMeal = mealArray[i]
    // here you need to loop through the ingredients object with a for in and push to an array, quantities will be added somehow...
    mealType.append(createPanel(currentMeal.name, 'Ingredients: ' + currentMeal.ingredients))
  };
};

appendPanels(breakfastArr, breakfast);
appendPanels(lunchArr, lunch);
appendPanels(dinnerArr, dinner);

function appendCustomPanel(brkfastLunchOrDinner, nameOfMeal, listOfIngredients) {

  var type = $('saved-meals-' + brkfastLunchOrDinner);
  type.append(createPanel(nameOfMeal, listOfIngredients));
};

$('#meal-adder').on('click', grabInputs)

function grabInputs() {
  var customMealType = $('input[name=meal-type]:checked').val();
  var customMealName = $('#meal-name').val();
  var customIngredients = $('#custom-ingredients').val();
  storeMealsLocally({'name': customMealName, 'ingredients': customIngredients}, customMealType)
  // appendCustomPanel(customMealType, customMealName, customIngredients);
  // localStorage.setItem('customMeal', "{'name': " + customMealName+ ", 'type': " + customMealType + ", 'ingredients': " + customIngredients + "}" )

}

function storeMealsLocally(obj, bLD) {
  var localMeals = JSON.parse(localStorage.mealObj);
  var respectiveArr = localMeals.meals[bLD];
  respectiveArr.push(obj);
  console.log(localMeals);
  localStorage.mealObj = JSON.stringify(localMeals)

}
