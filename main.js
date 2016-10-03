var mealsJSON = {
  'meals': {
    'breakfast':[
      {
        'name': 'Breakfast Burrito',
        'ingredients': ['tortilla', 'eggs', 'potatoes', 'cheese', 'onion']
      },
      {
        'name': 'Avocado Toast',
        'ingredients': ['bread', 'avocado', 'hummus']
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

var breakfast = $('#saved-meals-brkfast');
var lunch = $('#saved-meals-lunch');
var dinner = $('#saved-meals-dinner');
var breakfastArr = mealsJSON.meals.breakfast;
var lunchArr = mealsJSON.meals.lunch;
var dinnerArr = mealsJSON.meals.dinner;

function createPanel(mealName, ingredientsList) {
  var panelDiv = $('<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">'
   + mealName +
     '</h3> </div> <div class="panel-body">' + ingredientsList + '</div> </div>');
     return panelDiv;
};


function appendPanels(mealArray, mealType) {
  for (var i = 0; i < mealArray.length; i++) {
    var currentMeal = mealArray[i]
    mealType.append(createPanel(currentMeal.name, 'Ingredients: ' + currentMeal.ingredients))
  };
};

appendPanels(breakfastArr, breakfast);
appendPanels(lunchArr, lunch);
appendPanels(dinnerArr, dinner);
