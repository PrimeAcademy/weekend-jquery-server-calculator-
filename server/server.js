let equations = require('./modules/equation_data.js');

console.log('equations at start of server:', equations);

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }))

// Routes go here!

app.get('/equation', (req, res) => {
  console.log('GET /thing request received!');
  res.send(equations);
})

app.post('/equation', (req, res) => {
  console.log('POST /equation request received');
  let newEquationAsStrings = req.body;

  valdateInputData(newEquationAsStrings);
  // newEquation looks like: { numberOne: '2', opperation: '+', numberTwo: '4' }
  let equation = calculateEquationWithAnswer(newEquationAsStrings);
  // equation looks like: { numberOne: 2, opperation: '*', numberTwo: 3, answer: 6 }

  equations.push(equation);

  console.log('updated equations:', equations);

  res.sendStatus(200);
})

function calculateEquationWithAnswer(newEquationAsStrings) {
  let answer;

  let numberOne = Number(newEquationAsStrings.numberOne);
  let numberTwo = Number(newEquationAsStrings.numberTwo);

  if (newEquationAsStrings.opperation === '+') {
    answer = numberOne + numberTwo;
  } else if (newEquationAsStrings.opperation === '-') {
    answer = numberOne - numberTwo;
  } else if (newEquationAsStrings.opperation === '*') {
    answer = numberOne * numberTwo;
  } else if (newEquationAsStrings.opperation === '/') {
    answer = numberOne / numberTwo;
  }

  console.log('answer:', answer);

  let equation = {
    numberOne: numberOne,
    opperation: newEquationAsStrings.opperation,
    numberTwo: numberTwo,
    answer: answer
  }

  console.log('equation inside function:', equation);
  return equation
}

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
