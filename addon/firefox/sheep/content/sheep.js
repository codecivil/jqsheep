var _now = new Date();
var countSheep = 0;
document.querySelectorAll('div').forEach(function(_div){countSheep += 1; if ( countSheep < 100 ) { _div.classList.add('sheepified'); } });
$('.sheepified').sheep();
