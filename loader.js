
var mealsJSON = {
    meals: [
      {
        'name': 'Breakfast Burrito',
        'ingredients': [{name: 'tortilla', qty: 1}, {name: 'eggs', qty: 2}, {name: 'potatoes', qty: 1}, {name: 'cheese', qty: 0.125}, {name: 'onion', qty: 0.5}],
        "type": "breakfast"
      },
      {
        'name': 'Avocado Toast',
        'ingredients': [{name: 'bread', qty: 2}, {name: 'avocado', qty: 1}, {name: 'hummus', qty: 0.25}],
        "type": "breakfast"
      },
      {
        'name': 'Yogurt Parfait',
        'ingredients': [{name: 'yogurt', qty: 1}, {name: 'berries', qty: 1}, {name: 'granola', qty: 1}],
        "type": "breakfast"
      },
      {
        'name': 'Fried Potatoes',
        'ingredients': [{name: 'potatoes', qty: 1}, {name: 'onion', qty: 1}, {name: 'coconut oil', qty: 1}, {name: 'avocado', qty: 1}, {name: 'cheese', qty: 1}],
        "type": "breakfast"
      },
      {
        'name': 'Veggie BLT Sandwich',
        'ingredients': [{name: 'bread', qty: 1}, {name: 'facon', qty: 1}, {name: 'avocado', qty: 1}, {name: 'lettuce', qty: 1}, {name: 'tomato', qty: 1}, {name: 'mayo', qty: 1}],
        "type": "lunch"
      },
      {
        'name': 'Veggie Burrito',
        'ingredients': [{name:'tortilla',  qty: 1}, {name:'rice',  qty: 1}, {name:'beans',  qty: 1}, {name:'cilantro',  qty: 1}, {name:'salsa',  qty: 1}, {name:'avocado',  qty: 1}, {name:'yellow squash',  qty: 1}, {name:'lettuce',  qty: 1}, {name:'sour cream',  qty: 1}, {name:'cheese', qty: 1}],
        "type": "lunch"
      },
      {
        'name': 'Falafel Wrap',
        'ingredients': [{name: 'tortilla', qty: 1}, {name: 'hummus', qty: 1}, {name: 'falafel', qty: 1}, {name: 'tabboleh', qty: 1}, {name: 'onion', qty: 1}, {name: 'raddish', qty: 1}],
        "type": "lunch"
      },
      {
        'name': 'Pasta Salad',
        'ingredients': [{name: 'spiral noodles', qty: 1}, {name: 'ranch', qty: 1}, {name: 'mayo', qty: 1}, {name: 'parsley', qty: 1}, {name: 'bell peppers', qty: 1}, {name: 'onion', qty: 1}],
        "type": "lunch"
      },
      {
        'name': 'Sweet & Sour Tofu',
        'ingredients': [{ name: 'tofu', qty: 1}, { name: 'pineapple', qty: 1}, { name: 'onion', qty: 1}, { name: 'bell peppers', qty: 1}, { name: 'soy sauce', qty: 1}, { name: 'ketchup', qty: 1}, { name: 'rice vinegar', qty: 1}, { name: 'corn starch', qty: 1}, { name: 'brown sugar', qty: 1}, { name: 'garlic', qty: 1}, { name: 'ginger', qty: 1}],
        "type" : "dinner"
      },
      {
        'name': 'Spaghetti',
        'ingredients': [{name: 'spaghetti noodles', qty: 1}, {name: 'marinara', qty: 1}, {name: 'olive oil', qty: 1}, {name: 'garlic', qty: 1}, {name: 'lettuce', qty: 1}, {name: 'cucumber', qty: 1}, {name: 'cherry tomatoes', qty: 1}, {name: 'ranch', qty: 1}],
        "type" : "dinner"
      },
      {
        'name': 'Self-Made TV Dinner >_<',
        'ingredients': [{name: 'soy chicken nugz', qty: 1}, {name: 'potatoes', qty: 1}, {name: 'butter', qty: 1}, {name: 'corn', qty: 1}, {name: 'soymilk', qty: 1}, {name: 'ketchup', qty: 1}, {name: 'baked beans', qty: 1}, {name: 'broccoli', qty: 1}],
        "type" : "dinner"
      }
    ]
  };


var presetMealList = new MealList();

if(!localStorage.mealObj) {
  for (var i = 0; i < mealsJSON.meals.length; i++) {
    presetMealList.addMeal(mealsJSON.meals[i])
  }
};
