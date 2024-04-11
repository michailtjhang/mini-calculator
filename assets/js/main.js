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
    display2Num = '';
    tempResult.innerText = result;
}

function mathOperation() {
    if (lastOperator === '*') {
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

equalSign.addEventListener('click', (e) => {
    if (!display1Num || !display2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    display2Num = result;
    display1Num = '';
    display.innerText = result;
    tempResult.innerText = '';
})

clearAll.addEventListener('click', (e) => {
    display.innerText = '';
    display2Num = '';
    display1Num = '';
    displayHistory.innerText = '';
    tempResult.innerText = '';
    result = '';
    haveDot = false;
})

clearLastEntry.addEventListener('click', (e) => {
    display.innerText = '';
    display2Num = '';
})

window.addEventListener('keydown', (e) => {
    // console.log(e.key);
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ) {
        clickButton(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
        clickOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        clickEqual();
    } else if (e.key === 'Backspace') {
        clickClear();
    }
})

function clickButton(key) {
    numbers.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperator(key) {
    operators.forEach((button) => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickEqual() {
    equalSign.click();
}

function clickClear() {
    clearAll.click();
}