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



//click handler callback for "plus-button" for another ingredient

$('#ingredient-adder').on('click', addIngredientDiv)

function addIngredientDiv(){
  // create the inputs inside of a div with class custom-ingredients
  //append things to  $('#ingredient-div');
  $('#ingredient-div').append('<p>------------------------------------------</p>')
  var newInputDiv = $('<div class="custom-ingredients"></div>')
  var newTextInputTag = $('<input type="text" class="form-control" placeholder="name of ingredient..." aria-describedby="basic-addon1"></input>')
  var newQtyInputTag = $('<input type="number" class="form-control" placeholder="quantity of ingredient..." aria-describedby="basic-addon1"></input>')
  newInputDiv.append(newTextInputTag);
  newInputDiv.append(newQtyInputTag);
  $('#ingredient-div').append(newInputDiv)


}



$('#meal-adder').on('click', grabInputs)

function grabInputs() {
  var customMealType = $('input[name=meal-type]:checked').val();
  var customMealName = $('#meal-name').val();

  var customIngredients = $('.custom-ingredients');

  // map over inputs in customIngredients (divs) array and get back an array of Ingredient objects
  var ingredientsArray = customIngredients.map(function(cur){
    // create new Ingredient instance based on cur.children (cur is a div with 2 inputs inside)
    // return that instance (so that it is put into the array by map)
  })

  var meal = new Meal({'name': customMealName, 'ingredients': ingredientsArray, 'type': customMealType});
  mealList.addMeal(meal);
}


// keep a count var that keeps track of how many ingredients there are in a custom meal. (starting at one)
// need two fields, one for name and one for quantities with an add button that creates two more fields for another ingredient
// increment the counter when the add ingredient button is clicked.
//
