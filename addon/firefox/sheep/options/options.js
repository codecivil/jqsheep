function restoreOptions() {

  function setCurrentChoice(result) {
	if ( typeof(result.graze) == "undefined" || result.graze == "" ) { saveOptions(); return false; }
    document.querySelector('#theinput').value = result.graze;
    var _grazeArray = JSON.parse(result.graze);
    var _addPeriod = false;
    _grazeArray.forEach(function(_grazingPeriod){
		if ( _addPeriod ) { addPeriod(); };
		_addPeriod = true;
		document.querySelector('.grazing .weekday').value = _grazingPeriod.weekday;
		document.querySelector('.grazing .grazingperiodbegin').value = _grazingPeriod.grazingperiodbegin;
		document.querySelector('.grazing .grazingperiodend').value = _grazingPeriod.grazingperiodend;
	});
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  document.querySelector(".addperiodBtn").addEventListener("click", addPeriod);
  document.querySelectorAll(".grazing select,.grazing input[type=time]").forEach(function(_input){ _input.addEventListener("change",updateInput); });document.querySelectorAll(".grazing select").forEach(function(_input){ _input.addEventListener("change",updateInput); });

  var getting = browser.storage.sync.get("graze");
  getting.then(setCurrentChoice, onError);
}

function saveOptions() {
	browser.storage.sync.set({graze: document.querySelector('#theinput').value});
}

function addPeriod() {
	var clone = document.querySelector('.grazing').cloneNode(true);
	clone.querySelector('.weekday').value = document.querySelector('.grazing .weekday').value;
	document.querySelector('form').appendChild(clone);
	document.querySelectorAll(".grazing + .grazing .deleteperiodBtn").forEach(function(deleteperiodBtn){ deleteperiodBtn.addEventListener("click", removePeriod); });
    document.querySelectorAll(".grazing select,.grazing input[type=time]").forEach(function(_input){ _input.addEventListener("change",updateInput); });document.querySelectorAll(".grazing select").forEach(function(_input){ _input.addEventListener("change",updateInput); });
}

function removePeriod(e) {
	e.target.closest('.grazing').remove();
	updateInput();
}

function updateInput() {
	var _inputArray = new Array();
	document.querySelectorAll(".grazing").forEach(function(_grazing){
		var _thisObj = new Object();
		_thisObj.weekday = _grazing.querySelector('.weekday').value;
		_thisObj.grazingperiodbegin = _grazing.querySelector('.grazingperiodbegin').value;
		_thisObj.grazingperiodend = _grazing.querySelector('.grazingperiodend').value;
		_inputArray.push(_thisObj);
	});
	document.querySelector('#theinput').value = JSON.stringify(_inputArray);
	saveOptions();
}

document.addEventListener("DOMContentLoaded", restoreOptions);
