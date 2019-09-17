(function(window) {
	var calculatorObj = {}

	calculatorObj.updateDisplay = function(operationPerformed = true) {
		calculatorObj.display.value = calculatorObj.d_state
		if (operationPerformed) {
			//resetting decimal type
			calculatorObj.decimal_type = false
			calculatorObj.display.value = ""
		}
	}

	calculatorObj.numClick = function() {
		var presVal = this.value
		if (calculatorObj.lastPerformed == calculatorObj.actionEnum.ADD) {
			calculatorObj.p_state = calculatorObj.d_state
			calculatorObj.d_state = 0
		}
		if (presVal == ".") {
			if (!calculatorObj.decimal_type) {
				calculatorObj.decimal_type = true
				calculatorObj.d_state = String(calculatorObj.d_state)+presVal
			}
		}
		else if (calculatorObj.d_state != 0 || calculatorObj.decimal_type) {
			calculatorObj.d_state = String(calculatorObj.d_state)+presVal
		}
		else{
			calculatorObj.d_state = presVal
		}
		calculatorObj.updateDisplay(false)
		calculatorObj.lastPerformed = calculatorObj.actionEnum.NUM
	}

	calculatorObj.clearPanel = function() {
		calculatorObj.d_state = 0
		calculatorObj.updateDisplay()
		calculatorObj.display.value = 0
	}

	calculatorObj.operationClicked = function() {
		if (this.value == "+=") {
			if (calculatorObj.operation == undefined) {
				calculatorObj.p_state = calculatorObj.d_state
				calculatorObj.operation = "+"
				calculatorObj.d_state = 0
				calculatorObj.updateDisplay()
			}
			else {
				calculatorObj.lastPerformed = calculatorObj.actionEnum.ADD
				calculatorObj.d_state = eval(calculatorObj.p_state+calculatorObj.operation+"("+calculatorObj.d_state+")")
				calculatorObj.operation = "+"
				calculatorObj.p_state = 0
				if (!isFinite(calculatorObj.d_state)) {
					calculatorObj.d_state = "UNDEFINED"
				}
				calculatorObj.updateDisplay()
				calculatorObj.display.value = calculatorObj.d_state
			}
		}
		else{
			if (this.value == "-" && (calculatorObj.lastPerformed != calculatorObj.actionEnum.NUM || calculatorObj.d_state == 0)) {
				calculatorObj.d_state = this.value
				calculatorObj.updateDisplay(false)
			}
			else{
				if (calculatorObj.p_state != null && calculatorObj.operation != "+") {
					calculatorObj.d_state = eval(calculatorObj.p_state+calculatorObj.operation+"("+calculatorObj.d_state+")")
				}
				calculatorObj.operation = this.value
				if (calculatorObj.lastPerformed != calculatorObj.actionEnum.OTHER){
					calculatorObj.p_state = calculatorObj.d_state
					calculatorObj.d_state = 0
					calculatorObj.updateDisplay()
				}
			}
			calculatorObj.lastPerformed = calculatorObj.actionEnum.OTHER
		}
	}

	/* Attribution : Initialize all elements after load concept from lecture notes
	   http://ccs.neu.edu/home/ntuck/courses/2019/09/cs5610/notes/02-browsers/page/code.js
	   */
	   calculatorObj.initialize = function() {
	   	calculatorObj.d_state = 0
	   	calculatorObj.decimal_type = false
	   	calculatorObj.display = document.getElementById('display')
	   	calculatorObj.display.value = calculatorObj.d_state
	   	calculatorObj.actionEnum = {
	   		NUM: 1,
	   		ADD: 2,
	   		OTHER: 3,
	   	};
	   	var numBtns  = document.querySelectorAll(".num-btn")
	   	numBtns.forEach(function(numBtn) {
	   		numBtn.addEventListener("click",calculatorObj.numClick)
	   	})
	   	clearBtn = document.getElementById('clear-btn')
	   	clearBtn.addEventListener("click", calculatorObj.clearPanel)
	   	var operationBtns  = document.querySelectorAll(".oper-btn")
	   	operationBtns.forEach(function(operationBtn) {
	   		operationBtn.addEventListener("click", calculatorObj.operationClicked)
	   	})
	   }
	   window.calculatorObj = calculatorObj
	})(window)
	window.addEventListener("load", window.calculatorObj.initialize)