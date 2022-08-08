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
        return "Who r u to divide by 0!?";
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
let storer = {number1: '' , number2: '', operator:'', result:'', lastClicked:''};
display.value = '0';


// Clicking 'C' and clearing all
clearer.addEventListener('click', () => {
    storer = {number1: '' , number2: '', operator:'', result:'', lastClicked:''};
    display.value = '0';
    upperDisplay.value = '';
    decimal.disabled = false;
    operators.forEach(i => {
        i.disabled = false;
    })
    operators.forEach(i => {
        i.classList.remove('operator-highlight');
    })
    digits.forEach(i => {
        i.classList.remove('digit-highlight');
    })
})

// Event listener for digits, including decimal

digits.forEach(item => {
    item.addEventListener('click', getNumbers);
})

function getNumbers(e) {
    
    highlightDigit(e);
    operators.forEach(i => {
        i.disabled = false;
    })
    if (storer.lastClicked != '' && storer.lastClicked.contains('operator')) {
        if (!storer.operator) {
            storer.number1 = '';
        } 
        display.value = '0';
    }

    if (!storer.operator) {
        if (!storer.number1 && e.target.id != '.') {
        display.value = e.target.id;
        } else {
        display.value += e.target.id;
        }
        storer.number1 = display.value;
    } else {
        if (!storer.number2 && e.target.id != '.') {
        display.value = e.target.id;
        } else {
        display.value += e.target.id;
        }
        storer.number2 = display.value;
    }
    

    decimal.disabled = display.value.includes('.') ? true: false;
    storer.lastClicked = e.target.classList;
}


// Event listener for operators
operators.forEach(item => {
    item.addEventListener('click', (e) => {
        highlightOperator(e);
        decimal.disabled = false;
        while (parseFloat(display.value) == parseFloat(display.value.slice(0, -1))) {
            display.value = display.value.slice(0, -1);
        } 
        // Check if storer.operator is empty OR two operators that are not '=' are clicked successively. If not call getResult
        if (!storer.operator || (storer.lastClicked.contains('operator') && e.target.id != '=')) {
            upperDisplay.value = display.value +' '+ e.target.id;
            storer.operator = e.target.id;
        } else {
            getResult(e);
        }
        storer.lastClicked = e.target.classList;
    })
})


function getResult(e) {
    
    if (!storer.number2) {
        storer.number2 = display.value;
    }

    storer.result = operate(storer.operator, parseFloat(storer.number1), parseFloat(storer.number2));
    if (isNaN(storer.result)) {
        upperDisplay.value = '';
        display.value = storer.result;
        storer = {number1: '' , number2: '', operator:'', result:'', lastClicked:''};
        operators.forEach(i => {
            i.disabled = true;
        })
    } else {
        if (e.target.id == '=') {
            upperDisplay.value += ' '+ display.value + ' ' + '=';
            storer.operator ='';
        } else{
            upperDisplay.value = `${storer.result}` + ' ' + e.target.id;
            storer.operator = e.target.id;
        }
        display.value = storer.result;
        storer.number1 = storer.result;
        storer.number2 = '';
    }

}

// Highlighting functions

function highlightDigit(e){
    e.target.classList.add('digit-highlight');
    digits.forEach(i => {
        if (e.target.id !== i.id) {
            i.classList.remove('digit-highlight');
        }
    })
}

function highlightOperator(e){
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
    
    




