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
    return a / b;
}

function operate(operator, num1, num2) {
    if(operator === '+'){
        return add(num1, num2);
    } else if(operator === '-'){
        return subtract(num1, num2);
    } else if(operator === '*'){
        return multiply(num1, num2);
    } else {
        return divide(num1, num2);
    }
}

const digits = document.querySelectorAll('.digit');
let display = document.getElementById('display');
digits.forEach(item => {
    item.addEventListener('click', (e) => {
        display.value += e.target.id;
        let storer = display.value;
        console.log(storer);
    })
})



// let x = document.getElementById("display").value;
