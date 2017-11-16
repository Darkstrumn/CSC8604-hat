const noble = require('noble');

noble.on('stateChange', function(state) {
    if (state == 'poweredOn') {
        noble.startScanning([], true);  // true = all adverts from a device
    }
});

noble.on('discover', function(peripheral) { 
    console.log(peripheral.id + "," + peripheral.rssi);
});
