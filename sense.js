const led = require('sense-hat-led');
const nodeimu = require('nodeimu');
const IMU = new nodeimu.IMU();
const HatKeys = require('rpi-sense-hat-keys');

// initialise active sensor to Temperature
var activesensor = 'T';


var output = function (e, data) {
    if (e) {
        console.log(e);
        return;
    }
    var message = '';
	if (activesensor == 'T'){
		message = `T: ${data.temperature.toFixed(2)}`;  // Temperature
	} else if (activesensor == 'P'){
		message = `P: ${data.pressure.toFixed(2)}`;   // Pressure
	} else if (activesensor == 'H'){
		message = `H: ${data.humidity.toFixed(2)}`;   // Humidity
	} else {
	 message = 'no sensor selected';
	}
    console.log(message);

    led.sync.showMessage(message);
    led.sync.clear([0, 0, 255]);
}


// Handle standard input
const stdin = process.stdin;
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', function(input) {
    if (input == '\n') {
        IMU.getValue(output);
    }
});

// Set active sensor to directional choice and display choice on screen
function keyEvent(event) {
    console.log("KEY: " + event.name + "=" + event.isPressed);
    if (event.name == 'UP'){
		activesensor = 'T';
		led.sync.showMessage(activesensor);
	} else if (event.name == 'LEFT'){
		activesensor = 'P';
		led.sync.showMessage(activesensor);
	} else if (event.name == 'RIGHT'){
		activesensor = 'H';
		led.sync.showMessage(activesensor);
	}
};

let hatKeys = new HatKeys();
hatKeys.setKeyEventHandler(keyEvent);

