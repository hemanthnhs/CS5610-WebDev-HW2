(function() {
	// display state
	var d_state;
	var display;

	function numClick() {
		var presVal = this.value
		if (d_state == 0) {
			d_state = presVal
		}
		else{
			d_state = String(d_state)+presVal
		}
		display.value = d_state
	}

	function buttonsInitialize() {
		d_state = 0;
		display = document.getElementById('display')
		display.value = d_state
		var numBtns  = document.querySelectorAll(".num-btn");
		numBtns.forEach(function(numBtn) {
			numBtn.addEventListener("click", numClick)
		})
	}

	window.addEventListener("load", buttonsInitialize);
})();