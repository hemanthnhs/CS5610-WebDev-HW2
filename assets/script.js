(function() {
	// display state i.e display number in panel
	var d_state;
	var decimal_type;
	//previous state
	var p_state;
	var operation;
	//display panel js object
	var display;

	function updateDisplay(operationPerformed = true) {
		display.value = d_state
		if (operationPerformed) {
			//resetting decimal type
			decimal_type = false
		}
	}

	function numClick() {
		var presVal = this.value
		if (presVal == ".") {
			decimal_type = true
			d_state = String(d_state)+presVal
		}
		else if (d_state != 0 || decimal_type) {
			d_state = String(d_state)+presVal
		}
		else{
			d_state = presVal
		}
		updateDisplay(false)
	}

	function clearPanel() {
		d_state = 0
		updateDisplay()
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
				d_state = eval(p_state+operation+d_state)
				operation = undefined
				updateDisplay()
			}
		}
		else{
			p_state = d_state
			operation = this.value
			d_state = 0
			updateDisplay()
		}
	}

	function buttonsInitialize() {
		d_state = 0
		decimal_type = false
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