function add(a, b) {
	return Number(a) + Number(b);
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
let storer = {number1:'' , number2:'', operator:''};

clearer.addEventListener('click', () => {
    storer = {number1:'' , number2:'', operator:''};
    display.value = '';
    upperDisplay.value = '';
})

digits.forEach(item => {
    item.addEventListener('click', (e) => {
        if(storer.operator === '=') {
            storer = {number1:'' , number2:'', operator:''};
        }
        if(!storer.operator) {
            storer.number1 += e.target.id;
            display.value = Number(storer.number1);
        } else {
            storer.number2 += e.target.id;
            display.value = Number(storer.number2);
        }
        
    })
})


operators.forEach(item => {
    item.addEventListener('click', (e) => {
        if(Object.values(storer).every(item => item)){

            upperDisplay.value = storer.number1 + storer.operator + storer.number2;
            storer.number1 = operate(storer.operator, storer.number1, storer.number2);
            storer.operator = e.target.id;
            storer.number2 = '';
            if(storer.operator !== '='){
                upperDisplay.value = storer.number1 + storer.operator;
                display.value = '';
            } else {
                display.value = '=' + storer.number1;
            }
        } else if(storer.number1){
            storer.operator = e.target.id;
            upperDisplay.value = storer.number1 + storer.operator;
            display.value = '';
        }
    })
})


