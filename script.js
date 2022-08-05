function add(a, b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
	return a * b;
};

function divide(a, b) {
    if(b == "0") {
        return "Who r u 2 divide by 0!";
    }
    return a / b;
}

function operate(operator, num1, num2) {
    if(operator === '+'){
        return add(num1, num2);
    } else if(operator === '-'){
        return subtract(num1, num2);
    } else if(operator === '*'){
        return multiply(num1, num2);
    } else if(operator === '/'){
        return divide(num1, num2);
    }
}

const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const display = document.getElementById('display');
const upperDisplay = document.getElementById('upper-display');
const clearer = document.getElementById('C');
const decimal = document.getElementById('.');
let storer = {number1: '0' , number2: '0', operator:''};
display.value = '0';


clearer.addEventListener('click', () => {
    storer = {number1: '0' , number2: '0', operator:''};
    display.value = '0';
    upperDisplay.value = '';
    decimal.disabled = false;
    operators.forEach(i => {
        i.classList.remove('operator-highlight');
    })
    digits.forEach(i => {
        i.classList.remove('digit-highlight');
    })
})

digits.forEach(item => {
    item.addEventListener('click', getNumbers);
})

function getNumbers(e) {
    highlightDigit(e);
    if(!storer.operator) {
        storer.number1 += e.target.id;
        display.value = parseFloat(storer.number1);
        decimal.disabled = storer.number1.includes('.') ? true: false;
    } else {
        storer.number2 += e.target.id;
        display.value = parseFloat(storer.number2);
        decimal.disabled = storer.number2.includes('.') ? true: false;
    }
}

operators.forEach(item => {
    item.addEventListener('click', (e) => {
        hightlightOperator(e);
        decimal.disabled = false;
        if(storer.operator === ''){
            storer.operator = e.target.id;
            upperDisplay.value = display.value +' '+ storer.operator;
            if(storer.operator === '=') {
                display.value = parseFloat(storer.number1);
            } else {
                display.value = '0';
            }
        } else {
            getResult(e);
        }
    })
})

function getResult(e) {
    if (storer.operator === '='){
        upperDisplay.value = parseFloat(storer.number1) + ' '+e.target.id;
    } else if (e.target.id === '=') {
        upperDisplay.value = parseFloat(storer.number1) + ' ' + storer.operator +' '+ parseFloat(storer.number2) + ' ' + '=';
        storer.number1 = operate(storer.operator, parseFloat(storer.number1), parseFloat(storer.number2));
    } else {
        storer.number1 = operate(storer.operator, parseFloat(storer.number1), parseFloat(storer.number2));
        upperDisplay.value = parseFloat(storer.number1) +' '+ e.target.id;
    }
    display.value = storer.number1;
    storer.operator = e.target.id;
    storer.number2 = '0';
}

function highlightDigit(e){
    e.target.classList.add('digit-highlight');
    digits.forEach(i => {
        if (e.target.id !== i.id) {
            i.classList.remove('digit-highlight');
        }
    })
}

function hightlightOperator(e){
    digits.forEach(i => {
        i.classList.remove('digit-highlight');
    })
    e.target.classList.add('operator-highlight');
    operators.forEach(i => {
        if (e.target.id !== i.id) {
            i.classList.remove('operator-highlight');
        }
    })
}
    
    




