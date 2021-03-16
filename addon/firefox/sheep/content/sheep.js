var _graze = browser.storage.sync.get('graze');
_graze.then(jsonParse,onError);

function jsonParse(result) {
	if ( typeof(result.graze) == "undefined" || result.graze == "" ) { return onError(); }
	var grazeArray = JSON.parse(result.graze);
	sheepify(grazeArray);
}

function onError() {
	var grazeArray = new Array();
	var _onErrorObj = new Object();
	_onErrorObj.weekday = -1;
	_onErrorObj.grazingperiodbegin = "00:00";
	_onErrorObj.grazingperiodend = "23:59";
	grazeArray.push(_onErrorObj);
	sheepify(grazeArray);
}

function sheepify(grazeArray) {
	var _now = new Date();
	var _thisDay = _now.getDay();
	var _thisTime = new Array(_now.getHours(),_now.getMinutes());
	var sheepified = false;
	grazeArray.forEach(function(grazingPeriod){
		if ( grazingPeriod.grazingperiodbegin == "" ) { grazingPeriod.grazingperiodbegin = "00:00"; }
		if ( grazingPeriod.grazingperiodend == "" ) { grazingPeriod.grazingperiodend = "23:59"; }
		var _grazeDay = grazingPeriod.weekday;
		var _grazeBegin = grazingPeriod.grazingperiodbegin.split(':');
		var _grazeEnd = grazingPeriod.grazingperiodend.split(':');
		if ( ! sheepified && 
			( _thisDay == _grazeDay || _grazeDay == -1 ) &&
			parseInt(_thisTime[0])*60+parseInt(_thisTime[1]) >= parseInt(_grazeBegin[0]*60)+parseInt(_grazeBegin[1]) &&
			parseInt(_thisTime[0])*60+parseInt(_thisTime[1]) <= parseInt(_grazeEnd[0])*60+parseInt(_grazeEnd[1])
			) {
			var countSheep = 0;
			document.querySelectorAll('div').forEach(function(_div){countSheep += 1; if ( countSheep < 100 ) { _div.classList.add('sheepified'); } });
			$('.sheepified').sheep();
			sheepified = true;
		}
	});
}
