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

const buttons = document.querySelectorAll('button');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const display = document.getElementById('display');
const upperDisplay = document.getElementById('upper-display');
const clearer = document.getElementById('Escape');
const decimal = document.getElementById('.');
const deleter = document.getElementById('Backspace');
let storer = {number1: '' , number2: '', operator:'', result:'', lastClicked:''};
display.value = '0';

// Clicking Backspace button
deleter.addEventListener('click', backSpace);

function backSpace() {
    buttons.forEach(i => {
        i.classList.remove('digit-highlight', 'operator-highlight');
    })

    if (!upperDisplay.value) {  
        display.value = display.value.slice(0, -1); 
        if(display.value.length == 0 || display.value == '0') {
            display.value = '0';
            storer.number1 = '';
        } else {
            storer.number1 = display.value;
        }
        decimal.disabled = display.value.includes('.') ? true: false;
    } else if (upperDisplay.value && upperDisplay.value.includes('=')) {
        upperDisplay.value = '';
        storer.number1 = display.value;
        deleter.disabled = true;
        decimal.disabled = false;
    } else {
        display.value = display.value.slice(0, -1);
        if(display.value.length == 0 || display.value == '0') {
            display.value = '0';
            storer.number2 = '';
        } else {
            storer.number2 = display.value;
        }
        decimal.disabled = display.value.includes('.') ? true: false;
    }
    
}

// Clicking 'C' and clearing all
clearer.addEventListener('click', () => {
    storer = {number1: '' , number2: '', operator:'', result:'', lastClicked:''};
    display.value = '0';
    upperDisplay.value = '';
    
    buttons.forEach(i => {
        i.disabled = false;
    })
    buttons.forEach(i => {
        i.classList.remove('digit-highlight', 'operator-highlight');
    })

})

// Keyboard binding

window.addEventListener('keydown',bindKeyboard);
 
// input'a clicklemeyi engelle
function bindKeyboard(e) {
    let clickedKey = e.key;
    clickedKey == 'Enter' ? clickedKey = '='
    : clickedKey == 'Delete' ? clickedKey = 'Escape'
    : clickedKey;
    buttons.forEach(item => {
        if(item.id == clickedKey) {
            item.click();
        }
    })

}

// Event listener for digits, including decimal

digits.forEach(item => {
    item.addEventListener('click', getNumbers);
})

function getNumbers(e) {
    
    highlightDigit(e);
    operators.forEach(i => {
        i.disabled = false;
    })
    deleter.disabled = false;
    // if a number is clicked after a calculation it should be stored in storer.number1
    if (storer.lastClicked != '' && storer.lastClicked.contains('operator')) {
        if (!storer.operator) {
            storer.number1 = '';
            display.value = '0';
        }      
    }

    if (!storer.operator) {
        display.value == '0' ? storer.number1 = '' : storer.number1;
        if (!storer.number1 && e.target.id != '.') {
        display.value = e.target.id;
        } else {
        display.value += e.target.id;
        }
        storer.number1 = display.value;
    } else {
        display.value == '0' ? storer.number2 = '' : storer.number2;
        if (!storer.number2) {
            if (e.target.id == '.') {
                display.value = '0.';
            } else {
                display.value = e.target.id;
            }
        } else {
        display.value += e.target.id;
        }
        storer.number2 = display.value;
    }
    

    decimal.disabled = display.value.includes('.') ? true: false;
    storer.lastClicked = e.target.classList;
    if (display.value.length == 16) {
        digits.forEach(i => {
            i.disabled = true;
        })
    }
}


// Event listener for operators
operators.forEach(item => {
    item.addEventListener('click', (e) => {
        highlightOperator(e);
        digits.forEach(i => {
            i.disabled = false;
        })
        deleter.disabled = false;

        if (!storer.lastClicked) {
            storer.number1 = '0';
        }
        while (parseFloat(display.value) == parseFloat(display.value.slice(0, -1))) {
            display.value = display.value.slice(0, -1);
        } 
        // Check if storer.operator is empty OR two operators that are not '=' are clicked successively. If not call getResult
        if (!storer.operator || (storer.lastClicked.contains('operator') && e.target.id != '=')) {
            upperDisplay.value = display.value +' '+ e.target.id;
            storer.operator = e.target.id;
            if (e.target.id == '=') {
                storer.operator = '';
            }
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
    




