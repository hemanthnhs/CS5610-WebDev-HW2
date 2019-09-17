(function(window) {
	var calculatorObj = {}

	/**
	 * Update the display panel value and reset the state indicators
	 * @param  {Boolean} operationPerformed To reset state of decimal type when operation is performed.
	 */
	 calculatorObj.updateDisplay = function(operationPerformed = true) {
		// calculatorObj.display.value holds DOM object and is updating value in display
		calculatorObj.display.value = calculatorObj.d_state
		// If operator clicked display and decimal notation must be resetted
		if (operationPerformed) {
			calculatorObj.decimal_type = false
			calculatorObj.display.value = ""
		}
	}

	/**
	 * When number clicked store the number or append to the current number in display
	 * Append if last input is number
	 * Store if last input is Add/Equal which is a new operation
	 */
	 calculatorObj.numClick = function() {
	 	var presVal = this.value
		// If last click was add this will be an add operation hence making the display for it
		if (calculatorObj.lastPerformed == calculatorObj.actionEnum.ADD) {
			calculatorObj.p_state = calculatorObj.d_state
			calculatorObj.d_state = 0
		}
		//for decimal point
		if (presVal == ".") {
			//If already a dot is not entered then first number append case
			if (!calculatorObj.decimal_type) {
				calculatorObj.decimal_type = true
				calculatorObj.d_state = String(calculatorObj.d_state)+presVal
			}
		}
		//number continuation so append
		else if (calculatorObj.d_state != 0 || calculatorObj.decimal_type) {
			calculatorObj.d_state = String(calculatorObj.d_state)+presVal
		}
		//first number entry
		else{
			calculatorObj.d_state = presVal
		}
		//passing false as no operation performed
		calculatorObj.updateDisplay(false)
		//tracking last click
		calculatorObj.lastPerformed = calculatorObj.actionEnum.NUM
	}

	/**
	 * Clear panel and reset values
	 */
	 calculatorObj.clearPanel = function() {
	 	calculatorObj.d_state = 0
	 	calculatorObj.updateDisplay()
		//Displaying 0 in panel
		calculatorObj.display.value = 0
	}

	/**
	 * When a  operator button is clicked, perform corresponding action
	 */
	 calculatorObj.operationClicked = function() {
		// += button click
		if (this.value == "+=") {
			if (calculatorObj.operation == undefined) {
				// first operation selection i.e +
				calculatorObj.p_state = calculatorObj.d_state
				calculatorObj.operation = "+"
				calculatorObj.d_state = 0
				calculatorObj.updateDisplay()
			}
			else {
				// = operation and making + for next operation
				calculatorObj.lastPerformed = calculatorObj.actionEnum.ADD
				// adding ( ) to handle negative operations
				calculatorObj.d_state = eval(calculatorObj.p_state+calculatorObj.operation+"("+calculatorObj.d_state+")")
				calculatorObj.operation = "+"
				calculatorObj.p_state = 0
				if (!isFinite(calculatorObj.d_state)) {
					// For NaN, Infinity
					calculatorObj.d_state = "UNDEFINED"
				}
				calculatorObj.updateDisplay()
				calculatorObj.display.value = calculatorObj.d_state
			}
		}
		else{
			if (this.value == "-" && (calculatorObj.lastPerformed != calculatorObj.actionEnum.NUM || calculatorObj.d_state == 0)) {
				// for negative number operations
				calculatorObj.d_state = this.value
				calculatorObj.updateDisplay(false)
			}
			else{
				if (calculatorObj.p_state != null && calculatorObj.operation != "+") {
					// for consectuive operations before +=
					calculatorObj.d_state = eval(calculatorObj.p_state+calculatorObj.operation+"("+calculatorObj.d_state+")")
				}
				//storing operation values and setting display for next input
				calculatorObj.operation = this.value
				if (calculatorObj.lastPerformed != calculatorObj.actionEnum.OTHER){
					calculatorObj.p_state = calculatorObj.d_state
					calculatorObj.d_state = 0
					calculatorObj.updateDisplay()
				}
			}
			//storing last performed key
			calculatorObj.lastPerformed = calculatorObj.actionEnum.OTHER
		}
	}

	/* Attribution : Initialize all elements after load concept from lecture notes
	http://ccs.neu.edu/home/ntuck/courses/2019/09/cs5610/notes/02-browsers/page/code.js*/
	/**
	 * Initializing all states and attaching event handlers
	 */
	 calculatorObj.initialize = function() {
		//State and display values
		calculatorObj.d_state = 0
		calculatorObj.decimal_type = false
		//JS Element
		calculatorObj.display = document.getElementById('display')
		calculatorObj.display.value = calculatorObj.d_state
		//Enum for action
		calculatorObj.actionEnum = {
			NUM: 1,
			ADD: 2,
			OTHER: 3,
		};
		//Attaching event handlers
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

	/**
	 * Globalnamespace usage Attribution
	 * https://www.contentful.com/blog/2017/01/17/the-global-object-in-javascript/
	 */
	 window.calculatorObj = calculatorObj
	})(window)
//Attaching the load operation
window.addEventListener("load", window.calculatorObj.initialize)