const EddystoneBeaconScanner = require('eddystone-beacon-scanner');
const led = require('sense-hat-led');

var id = 'eaebb2ec9be5'
var _ = [0,0,0];        // RGB fully off (=black)
var X = [255,255,255];  // RGB fully on  (=white)
 

EddystoneBeaconScanner.on('found', function(beacon) {
	if (beacon.id != id) return;
    console.log("Found: ", beacon);
    });

EddystoneBeaconScanner.on('updated', function(beacon) {
	if (beacon.id != id) return;
    console.log("Updated: ", beacon);
    if (beacon.rssi > -25){
		var pixels = [
		_,_,_,_,_,_,_,_,
		_,X,X,_,_,X,X,_,
		_,X,X,_,_,X,X,_,
		_,_,_,X,X,_,_,_,
		_,_,_,X,X,_,_,_,
		X,_,_,_,_,_,_,X,
		_,X,_,_,_,_,X,_,
		_,_,X,X,X,X,_,_,
	];} else if (beacon.rssi > -35){
		var pixels = [
		_,_,_,_,_,_,_,_,
		_,X,X,_,_,X,X,_,
		_,X,X,_,_,X,X,_,
		_,_,_,X,X,_,_,_,
		_,_,_,X,X,_,_,_,
		_,_,_,_,_,_,_,_,
		_,X,X,X,X,X,X,_,
		_,_,_,_,_,_,_,_,
	];}
	else if (beacon.rssi <= -35){
		var pixels = [
		_,_,_,_,_,_,_,_,
		_,X,X,_,_,X,X,_,
		_,X,X,_,_,X,X,_,
		_,_,_,X,X,_,_,_,
		_,_,_,X,X,_,_,_,
		_,_,_,_,_,_,_,_,
		_,_,X,X,X,X,_,_,
		_,X,_,_,_,_,X,_,
	];}
		
	led.sync.setPixels(pixels);
});

EddystoneBeaconScanner.on('lost', function(beacon) {
	if (beacon.id != id) return;
    console.log("Lost: ", beacon);
});

EddystoneBeaconScanner.startScanning(true)



