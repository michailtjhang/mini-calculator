const displayHistory = document.querySelector('.display-history');
const display = document.querySelector('.display-input');
const tempResult = document.querySelector('.temp-result');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal');
const clearAll = document.querySelector('.all-clear');
const clearLastEntry = document.querySelector('.last-entity-clear');

let display1Num = '';
let display2Num = '';
let result = null;
let lastOperator = '';
let haveDot = false;

numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        display2Num += e.target.innerText;
        display.innerText = display2Num;
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if (!display2Num) return;
        haveDot = false;
        const operatorName = e.target.innerText;
        if (display1Num && display2Num && lastOperator) {
            mathOperation();
        } else {
            result = parseFloat(display2Num);
        }
        clearVar(operatorName);
        lastOperator = operatorName;
    })
})

function clearVar(name = '') {
    display1Num += display2Num + ' ' + name + ' ';
    displayHistory.innerText = display1Num;
    display.innerText = '';
    display1Num = '';
    tempResult.innerText = result;
}

function mathOperation () {
    if (lastOperator === 'x') {
        result = parseFloat(result) * parseFloat(display2Num);
    } else if (lastOperator === '+') {
        result = parseFloat(result) + parseFloat(display2Num);
    } else if (lastOperator === '-') {
        result = parseFloat(result) - parseFloat(display2Num);
    } else if (lastOperator === '/') {
        result = parseFloat(result) / parseFloat(display2Num);
    } else if (lastOperator === '%') {
        result = parseFloat(result) % parseFloat(display2Num);
    }
}