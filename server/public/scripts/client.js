let currentOpperation;

console.log('starting currentOpperation:', currentOpperation);

$(document).ready(onReady);

function onReady() {

  $('#equation-form').on('click', '.opperation', updateCurrentOpperation);

  $('#clear').on('click', clearInputs);  // Event Listner
  $('#calculate').on('click', sendToServer);  // Event Listner

  getHistory();
}

function updateCurrentOpperation(event) {
  event.preventDefault();
  currentOpperation = $(this).text();
  console.log('updated currentOpperation:', currentOpperation);
}

function clearInputs(event) {  // Event Handler
  event.preventDefault();

  $('#number-one').val('');
  $('#number-two').val('');

  currentOpperation = undefined;
}

// get the equation info from the DOM and POST it to /equation.
// Then call getHistory().
function sendToServer(event) {  // Event Handler
  event.preventDefault();

  let equation = {   // <- first attempt
    numberOne: 0,
    opperation: "",  // <- '+', '-', '*', '/'
    numberTwo: 0,
  }

  equation.numberOne = $('#number-one').val();
  equation.opperation = currentOpperation;
  equation.numberTwo = $('#number-two').val();

  console.log('equation', equation);

  $.ajax({
    method: 'POST',
    data: equation,
    url: '/equation',
  }).then(
    function (response) {
      console.log('POST /equation response:', response);

      getHistory()
    }
  ).catch(
    function (error) {
      console.log('POST /equation error:', error);
    }
  )

}

// GET /equation history, and update the DOM with it.
function getHistory() {

  $.ajax({
    method: 'GET',
    url: '/equation',
  }).then(
    function (response) {
      console.log('GET /equation response:', response);

      updateDomWithEquationHistory(response);
    }
  ).catch(
    function (error) {
      console.log('GET /equation error:', error);
    }
  )

}

function updateDomWithEquationHistory(equations) {
  // equations is an array of equation objects.

  let newestAnswer = equations[equations.length - 1].answer;
  $('#newest-answer').text(`${newestAnswer}`);

  $('#equation-history').empty();

  for (let equation of equations) {

    let equationString = `${equation.numberOne} ${equation.opperation} ${equation.numberTwo} = ${equation.answer}`;
    console.log(equationString);
    $('#equation-history').append(`<li class="list-item">${equationString}</li>`);
  }
  // an equation object looks like:
  // {
  //   answer: 6,
  //   numberOne: 2,
  //   numberTwo: 3,
  //   opperation: "*"
  // }
}


//   $.ajax({
//     method: 'GET',
//     url: '/guesses',
//   }).then(
//     function (response) {
//       console.log('GET /guesses response:', response);
//       updateDomWithGuessHistory(response)
//     }
//   ).catch(
//     function (error) {
//       console.log('GET /guesses error:', error);
//     }
//   )

// event.preventDefault();

// $.ajax({
//   method: 'POST',
//   data: newGuesses,
//   url: '/guesses',
// }).then(
//   function (response) {
//     console.log('POST /guesses response:', response);
//     refreshGuestHistory()
//   }
// ).catch(
//   function (error) {
//     console.log('POST /guesses error:', error);
//   }
// )
