const led = require('sense-hat-led');
const nodeimu = require('nodeimu');
const IMU = new nodeimu.IMU();
const HatKeys = require('rpi-sense-hat-keys');
const fs = require('fs');

var interval = 1000;
var direction = '...Detecting...';
var arrow = '';
var th = 0.8; // high accel threshold
var tl = -0.8; // low accel threshold

var output = function (e, data) {
    if (e) {
        console.log(e);
        return;
    }
    
    if (data.accel.x > th) {
		direction = 'SD UP';
		arrow = '<';}
	else if (data.accel.x < tl) {
		direction = 'PORTS UP';
		arrow = '>';}
	else if (data.accel.y > th) {
		direction = 'GPIO UP';
		arrow = 'G';}
	else if (data.accel.y < tl) {
		direction = 'HD UP';
		arrow = 'v';}
	else if (data.accel.z > th) {
		direction = 'FLAT';
		arrow = '0';}
	else if (data.accel.z < tl) {
		direction = 'UPSIDE DOWN';
		arrow = 'X';}
	else {
		direction = '...Detecting...';
		arrow = '?';
		}
    
    
    save(data);
    console.log(direction);
    led.sync.showMessage(arrow)
    setTimeout(function() { IMU.getValue(output); } , interval);
}


function save(data) {
	let timestamp = new Date().toISOString().replace('T',' ').replace('Z','')
    var message = timestamp;
    message += "," + data.accel.x;
    message += "," + data.accel.y;
    message += "," + data.accel.z + "\n";
    fs.appendFile("accel-output.csv", message, "utf8", (err) => {
        if (err) throw err;
    });
}


IMU.getValue(output);
