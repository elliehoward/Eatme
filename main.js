var mealList = new MealList();

mealList.load();

var mealPlan = new MealPlan({name: 'octoberMealPlan'})

var breakfast = $('.saved-meals-breakfast');
var lunch = $('.saved-meals-lunch');
var dinner = $('.saved-meals-dinner');

breakfast.append(mealList.renderMenu("breakfast"));
lunch.append(mealList.renderMenu("lunch"));
dinner.append(mealList.renderMenu("dinner"));



//click handler callback for "plus-button" for another ingredient

$('#ingredient-adder').on('click', addIngredientDiv)

function addIngredientDiv(){
  var newInputDiv = $('<div class="custom-ingredients"></div>')
  var newTextInputTag = $('<input type="text" class="form-control ingredient-name" placeholder="name of ingredient..." aria-describedby="basic-addon1"></input>')
  var newQtyInputTag = $('<input type="number" class="form-control ingredient-qty" placeholder="quantity of ingredient..." aria-describedby="basic-addon1"></input>')
  newInputDiv.append(newTextInputTag);
  newInputDiv.append(newQtyInputTag);
  $('#ingredient-div').append(newInputDiv)

}

$('#meal-adder').on('click', grabInputs)

function grabInputs() {
  var customMealType = $('input[name=meal-type]:checked').val();
  var customMealName = $('#meal-name').val();
  var customIngredients = $('.custom-ingredients');
  var ingredientsArray = [];
  customIngredients.each(function (){
    var customName = $(this).children('.ingredient-name').val();
    var customQty = parseInt($(this).children('.ingredient-qty').val());
    var newIngredient = new Ingredient({name: customName, qty: customQty});
    ingredientsArray.push(newIngredient);
  })

  var meal = new Meal({'name': customMealName, 'ingredients': ingredientsArray, 'type': customMealType});
  mealList.addMeal(meal);
};

var lastClickedPanel;

//make a meal plan instance
$('.draggable').on('mousedown', function(){
  lastClickedPanel = $(this).html();
  $(this).css('height', '40px');
  $(this).siblings().hide();
})

var selectedMeal;

$('.draggable').on('mouseup', function(){
  lastClickedPanel = $(this).html();
  $(this).css('height', '40px');
  $(this).siblings().show();
  var mealToFind = $(this).children().html();
  selectedMeal = mealList.findMealByName(mealToFind);

  // find out what day and what meal it got dropped on
  // find the meal (with findMealByName)
  // addMeal({
  // day: "monday",
  // meal: meal
  //})
})
$( function() {
    $( ".draggable" ).draggable();
    $( ".droppable" ).droppable({
      drop: function( event, ui ) {
        console.log(selectedMeal)
        var mealType = $(this).text()
        $( this ).find( "p" ).html( lastClickedPanel );
        var cloned = $(this).parent().clone();
        cloned.children().remove();
        var day = cloned.text().split('y')[0]+'y';
        console.log(cloned)
        mealPlan.addMeal({day: day, meal: selectedMeal})
      }
    });
  });

  $('#submit-plan').on('click', function(){
    mealPlan.save()
  })
  $('#load-plan').on('click', function(){
    mealPlan.load()
    $('.meal-plan').html(mealPlan.renderEditableList())

  })

$('#load-list').on('click', function(){
  var listDiv = mealPlan.renderPrintableShoppingList();
  // console.log(listDiv)
  $('#shopping-list').html(listDiv)

})
