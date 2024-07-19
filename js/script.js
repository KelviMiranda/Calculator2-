"use strict";
//Selecionar os elementos
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#button-container button");

/* console.log(button);

buttons.forEach(btn => {
    btn.addEventListener("click", (event) => console.log(event.target.textContent))
}) */

//Criar um mod de calculadora
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  //Add digit to calculator screen
  addDigit(digit) {
    //check if current operation already has a dot
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  //Process all calculator operation
  processOperation(operation) {
    //Check if current is empty
    if (this.currentOperationText.innerText === ""  && operation !== "C") {
      //change operation

      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }

      return;
    }
    //Get current and previous value
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = current + previous;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = current - previous;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = current * previous;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
        case "C":
        this.processClearOperation();
        break;
        case "=":
            this.processEqualOperator();
            break;
      default:
        return;
    }
  }

  //change Math operation
  changeOperation(operation) {
    const mathOperation = ["*", "/", "+", "-"];

    if (!mathOperation.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  //Change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    console.log(operationValue, operation, current, previous);
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      //check if value is zero, if it just add current value
      if (previous === 0) {
        operationValue = current;
      }

      //Add curent value previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  //Delete the last digit;

  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  //Clear current operation
  processClearCurrentOperation(){
    this.currentOperationText.innerText = "";
  }

  //clear all operation
  processClearOperation(){
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

    //process an operation 

    processEqualOperator(){
        const operation = previousOperationText.innerText.split(' ')[1];
        this.processOperation(operation);
      }
}

//instance calculator
const calculator = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const value = event.target.innerText;

    if (Number(value >= 0 || value === ".")) {
      calculator.addDigit(value);
    } else {
      calculator.processOperation(value);
    }
  });
});
