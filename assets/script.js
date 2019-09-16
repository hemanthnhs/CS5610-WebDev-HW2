(function() {
	// display state i.e display number in panel
	var d_state;
	var decimal_type;
	//previous state
	var p_state;
	var operation;
	var lastPerformed;
	//display panel js object
	var display;
	var actionEnum = {
	  NUM: 1,
	  ADD: 2,
	  OTHER: 3,
	};

	function updateDisplay(operationPerformed = true) {
		display.value = d_state
		if (operationPerformed) {
			//resetting decimal type
			decimal_type = false
			display.value = ""
		}
	}

	function numClick() {
		var presVal = this.value
		if (lastPerformed == actionEnum.ADD) {
			p_state = d_state
			d_state = 0
		}
		if (presVal == ".") {
			if (!decimal_type) {
				decimal_type = true
				d_state = String(d_state)+presVal
			}
		}
		else if (d_state != 0 || decimal_type) {
			d_state = String(d_state)+presVal
		}
		else{
			d_state = presVal
		}
		updateDisplay(false)
		lastPerformed = actionEnum.NUM
	}

	function clearPanel() {
		d_state = 0
		updateDisplay()
		display.value = 0
	}

	function operationClicked() {
		if (this.value == "+=") {
			if (operation == undefined) {
				p_state = d_state
				operation = "+"
				d_state = 0
				updateDisplay()
			}
			else {
				lastPerformed = actionEnum.ADD
				d_state = eval(p_state+operation+d_state)
				operation = "+"
				p_state = 0
				updateDisplay()
				display.value = d_state
			}
		}
		else{
			operation = this.value
			if (lastPerformed != actionEnum.OTHER){
				p_state = d_state
				d_state = 0
			}
			lastPerformed = actionEnum.OTHER
			updateDisplay()
		}
	}

	function buttonsInitialize() {
		d_state = 0
		decimal_type = false
		lastClickedOperation = false
		display = document.getElementById('display')
		display.value = d_state
		var numBtns  = document.querySelectorAll(".num-btn")
		numBtns.forEach(function(numBtn) {
			numBtn.addEventListener("click", numClick)
		})
		clearBtn = document.getElementById('clear-btn')
		clearBtn.addEventListener("click", clearPanel)
		var operationBtns  = document.querySelectorAll(".oper-btn")
		operationBtns.forEach(function(operationBtn) {
			operationBtn.addEventListener("click", operationClicked)
		})
	}

	window.addEventListener("load", buttonsInitialize);
})();