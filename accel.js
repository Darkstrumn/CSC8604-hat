const led = require('sense-hat-led');
const nodeimu = require('nodeimu');
const IMU = new nodeimu.IMU();
const HatKeys = require('rpi-sense-hat-keys');
const fs = require('fs');

var interval = 1000;

var output = function (e, data) {
    if (e) {
        console.log(e);
        return;
    }
    save(data);
    var message = `X: ${data.accel.x}`;
	message += ` Y: ${data.accel.y}`;
	message += ` Z: ${data.accel.z}`;
    console.log(message);
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
