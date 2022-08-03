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
    if(b === "0") {
        return ":P";
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
})

digits.forEach(item => {
    item.addEventListener('click', (e) => {
        if(storer.operator === '=') {
            storer = {number1: '0' , number2: '0', operator:''};
        }
        if(!storer.operator) {
            storer.number1 += e.target.id;
            display.value = parseFloat(storer.number1);
        } else {
            storer.number2 += e.target.id;
            display.value = parseFloat(storer.number2);
        }
    })
})



operators.forEach(item => {
    item.addEventListener('click', (e) => {
        decimal.disabled = false;
        if(Object.values(storer).every(item => item)){
            if(storer.operator === '='){
                upperDisplay.value = parseFloat(storer.number1) + ' '+e.target.id;
            } else{
                upperDisplay.value = parseFloat(storer.number1) + ' ' + storer.operator +' '+ parseFloat(storer.number2) + ' ' + '=';
                storer.number1 = operate(storer.operator, parseFloat(storer.number1), parseFloat(storer.number2));
            }
            storer.operator = e.target.id;
            storer.number2 = '0';
            if(storer.operator !== '='){
                upperDisplay.value = parseFloat(storer.number1) +' '+ storer.operator;
            }
            display.value = parseFloat(storer.number1);
        } else if(storer.number1){
            storer.operator = e.target.id;
            upperDisplay.value = display.value +' '+ storer.operator;
            if(storer.operator === '=') {
                display.value = parseFloat(storer.number1);
            } else {
                display.value = '0';
            }
            
        }
    })
})



