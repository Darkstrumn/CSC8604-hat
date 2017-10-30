const led = require('sense-hat-led');
const nodeimu = require('nodeimu');
const IMU = new nodeimu.IMU();

var output = function (e, data) {
    if (e) {
        console.log(e);
        return;
    }

    var message = `T: ${data.temperature.toFixed(2)}`;  // Temperature
    message += ` P: ${data.pressure.toFixed(2)}`;   // Pressure
    message += ` H: ${data.humidity.toFixed(2)}`;   // Humidity 
    console.log(message);

    led.sync.showMessage(message);
    led.sync.clear([0, 0, 255]);
}

IMU.getValue(output);
