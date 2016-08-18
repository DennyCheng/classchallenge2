//Post request to post the new animals to SQL
//have create number append a new property to the object when we send over the object to the server

$(document).ready(function(){
  //button listener for submit to send off a post request method
  $('#animal-submit').on('click',postAnimal);

});

function postAnimal(){
  event.preventDefault();

  var animal_object = {};

    $.each($('#animal-form').serializeArray(), function (i, field) {
    animal_object[field.name] = field.value;
  });
  animal_object.amount = randomNumber(0,100);
//creates random amount number property

  $.ajax({
    type:'POST',
    url:'/animal',
    data: animal_object,
    success:function(){
      console.log("POSt /Animal works");
        $('#container').empty();
        //clears previously loaded list
        loadAnimal();
        //reloads my animals/updates list
    },
    error: function(response){
      console.log("POST /Animal does not work");
    },
  });
};


function loadAnimal() {
  $.ajax({
    type: 'GET',
    url: '/animal',
    success: function (animals) {
      console.log('GET /animal returns:', animals);
      animals.forEach(function (animals) {
        var $el = $('<li></li>');
        $el.append('<strong>' + animals.name + '</strong>');
        $el.append(' <em>' + animals.amount + '</em');
        $('#container').append($el);
        //appends animals from the database to the dom
      });
    },
    error: function (response) {
      console.log('GET /animals fail. No animals could be retrieved!');
    },
  });
}

function randomNumber(min, max){
       return Math.floor(Math.random() * (1 + max - min) + min);
   };
