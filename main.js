// I want to make meals into instances of a class called meal, I also want to change the layout of a meal to have
// a name, ingredients with straightforward quantities, a sauce & topping & spices key with all the harder to measure out ingredients as the value.
// Finally, for the list I will need to loop through the ingreidents in every meal and add up the quantities to display them. Then I will need to do something
// similar for the topppings section.





//pretend mealsJSON came from localcstorange instead
var mealList = new MealList();

mealList.load();


var breakfast = $('#saved-meals-breakfast');
var lunch = $('#saved-meals-lunch');
var dinner = $('#saved-meals-dinner');

breakfast.append(mealList.renderMenu("breakfast"));
lunch.append(mealList.renderMenu("lunch"));
dinner.append(mealList.renderMenu("dinner"));




$('#meal-adder').on('click', grabInputs)

function grabInputs() {
  var customMealType = $('input[name=meal-type]:checked').val();
  var customMealName = $('#meal-name').val();
  var customIngredients = $('#custom-ingredients').val();
  var meal = new Meal({'name': customMealName, 'ingredients': customIngredients, 'type': customMealType});
  mealList.addMeal(meal);
}


// keep a count var that keeps track of how many ingredients there are in a custom meal. (starting at one)
// need two fields, one for name and one for quantities with an add button that creates two more fields for another ingredient
// increment the counter when the add ingredient button is clicked.
//
