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
upperDisplay.disabled = true;
display.disabled = true;

// Clicking Backspace button
deleter.addEventListener('click', backSpace);

function backSpace(e) {
    removeHighlight(buttons);
    if (!upperDisplay.value) {  
        display.value = display.value.slice(0, -1); 
        if(display.value.length == 0) {
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
        if(display.value.length == 0) {
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

// Keyboard binding

window.addEventListener('keydown',bindKeyboard);
 
// input'a clicklemeyi engelle
function bindKeyboard(e) {
    let clickedKey = e.key;
    clickedKey == 'Enter' ? clickedKey = '='
    : clickedKey == 'Delete' ? clickedKey = 'Escape'
    : clickedKey;
    for (let item of buttons) {
        if(item.id == clickedKey) {
            item.click();
            break;
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
  
    // If no operator is clicked yet or the last clicked button was = sign, store the value in number1, else in number2

    if (!storer.operator) {
        if (storer.lastClicked && storer.lastClicked.contains('operator')) {
            display.value = '0';
            upperDisplay.value = '';    
        }
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
        highlight(e);
        enable(buttons);

        if (!storer.lastClicked) {
            storer.number1 = '0';
        }

        // If there is a decimal  or a 0 after the decimal without any numbers following them, erase them
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




