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
    if(b === 0) return "Who r u to divide by 0!?";
    return a / b;
}

function operate(operator, num1, num2) {
    if(operator === '+') return add(num1, num2);
    if(operator === '-') return subtract(num1, num2);
    if(operator === '*') return multiply(num1, num2);
    if(operator === '/') return divide(num1, num2);
    throw 'error';
}

const buttons = document.querySelectorAll('button');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equal = document.getElementById('=');
const display = document.getElementById('display');
const upperDisplay = document.getElementById('upper-display');
const clearer = document.getElementById('Escape');
const decimal = document.getElementById('.');
const deleter = document.getElementById('Backspace');
const displayLength = 15;
let storer = {number1: '' , number2: '', operator:'', result:'', lastClicked:''};
display.value = '0';
upperDisplay.disabled = true;
display.disabled = true;

// Clicking Backspace button
deleter.addEventListener('click', backSpace);

function backSpace(e) {
    removeHighlight(buttons);
    /*
        1. If there is no upperDisplay value, slice the last digit of the display value and store the new value to number1.
        2. Else if upperDisplay value contains '=' erase it all and store the display value to number1.
        3. Else slice the last digit of the display value and store it to number2.
    */
    if (!upperDisplay.value) {  
        display.value = display.value.slice(0, -1); 
        if(display.value.length === 0) {
            display.value = '0';
        } 
        storer.number1 = display.value;
        decimal.disabled = display.value.includes('.') ? true: false;
    } else if (upperDisplay.value && upperDisplay.value.includes('=')) {
        upperDisplay.value = '';
        storer.number1 = display.value;
        deleter.disabled = true;
        decimal.disabled = false;
    } else {
        display.value = display.value.slice(0, -1);
        if(display.value.length === 0) {
            display.value = '0';
        }
        storer.number2 = display.value;
        decimal.disabled = display.value.includes('.') ? true: false;
    }
    
}

// Clicking 'C' and clearing all
clearer.addEventListener('click', (e) => {
    removeHighlight(buttons);
    storer = {number1: '' , number2: '', operator:'', result:'', lastClicked:''};
    display.value = '0';
    upperDisplay.value = '';
    buttons.forEach(i => {
        i.disabled = false;
    })
})

window.addEventListener('keydown',bindKeyboard); 

function bindKeyboard(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        equal.click();
    } else if (e.key === 'Delete' || e.key === 'Escape') {
        clearer.click();
    } else if (e.key === ',') {
        decimal.click();
    } else{
        for (let item of buttons) {
            if(item.id === e.key) {
                item.click();
                break;
            }
        }
    }
}

// Event listener for digits, including decimal

digits.forEach(item => {
    item.addEventListener('click', getNumbers);
})

function getNumbers(e) {

    highlight(e);
    enable(buttons);

    if (!storer.operator || storer.operator === '=') {
        if (storer.operator === '=' && storer.lastClicked.contains('operator')) {
            display.value = '0';
            upperDisplay.value = '';    
        }
        displayInput(e, storer.number1);
        storer.number1 = display.value;
    } else {
        displayInput(e, storer.number2);
        storer.number2 = display.value;
    }
    storer.lastClicked = e.target.classList;
}

function displayInput(e, number) {
    display.value === '0' ? number = '' : number;
    if (!number) {
        if (e.target.id === '.') {
            display.value = '0.';
        } else {
            display.value = e.target.id;
        }
    } else {
    display.value += e.target.id;
    }
    decimal.disabled = display.value.includes('.') ? true: false;
    if (display.value.length > displayLength) {
        digits.forEach(i => {
            i.disabled = true;
        })
    }
}

// Event listener for operators
operators.forEach(item => {
    item.addEventListener('click', (e) => {
        highlight(e);
        enable(buttons);
        cleanValues();

        // If nothing has been clicked yet
        if (!storer.number1) {
            storer.number1 = '0';
        }

        /*
            Check if storer.operator is empty 
            OR the last clicked operator was '=' 
            OR two operators that are not '=' are clicked successively. 
            If not call getResult 
        */
        if (!storer.operator || storer.operator === '=' || (storer.lastClicked.contains('operator') && e.target.id != '=')) {
            upperDisplay.value = storer.number1 +' '+ e.target.id;
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
        storer.result = Math.round(storer.result*10**displayLength)/10**displayLength;
        if (e.target.id === '=') {
            upperDisplay.value += ' '+ storer.number2 + ' ' + '=';
        } else{
            upperDisplay.value = storer.result + ' ' + e.target.id;
        }
        display.value = storer.result;
        storer.number1 = storer.result;
        storer.number2 = '';
        storer.operator = e.target.id;
    }
}

// Clearing unnecessary zeros and decimal

function cleanValues(){
    while (parseFloat(display.value) === parseFloat(display.value.slice(0, -1))) {
        display.value = display.value.slice(0, -1);
    }
    if (parseFloat(display.value) === parseFloat(storer.number1)) {
        storer.number1 = display.value;
    }
    if (parseFloat(display.value) === parseFloat(storer.number2)) {
        storer.number2 = display.value;
    }
}

// Highlighting and removing the hightlight

function highlight(e){
    removeHighlight(buttons);
    e.target.classList.add('highlight');
}

function removeHighlight(buttonList) {
    buttonList.forEach(i => {
        i.classList.remove('highlight');
    })
}

// Enabling buttons
function enable(buttonList) {
    buttonList.forEach(i => {
        i.disabled = false;
    })
}




