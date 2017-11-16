const noble = require('noble');

const id = 'eaebb2ec9be5';
var UART_RX_CHARACTERISTIC_UUID = '6e400002b';
var UART_TX_CHARACTERISTIC_UUID = '6e400003b'; 

noble.on('stateChange', function(state) {
    if (state == 'poweredOn') {
        noble.startScanning();
    }
});

noble.on('discover', function(peripheral) {
    console.log(peripheral.id);
    if (peripheral.id == id) {
        console.log("Connecting: ", peripheral.id);
        peripheral.connect(function (err) {
            console.log("Connected: ", err);
            noble.stopScanning();
            peripheral.discoverAllServicesAndCharacteristics(
                function (err, services, characteristics) {
                    console.log("Discovered: ", err);

                    let rx = characteristics.find((x) => { return x.uuid.startsWith(UART_RX_CHARACTERISTIC_UUID); });
                    rx.subscribe();
                    rx.on('data', (data) => {
                        console.log("Received: ", data);    // 0x41='A', 0x42='B'
                    });

                    let tx = characteristics.find((x) => { return x.uuid.startsWith(UART_TX_CHARACTERISTIC_UUID); });
                    tx.write(Buffer.from([0x41, 0x0A]), false); // "A\n"
                }
            );
        }); 
    }
});
