var SerialPort = require('serialport');
var port = new SerialPort('COM15', {
  baudRate: 115200
});
// callback approach
SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
port.pipe(parser);
parser.on('data', console.log);

// Switches the port into "flowing mode"
// port.on('data', function (data) {
  // console.log(data.toString('ascii'));
// });

// Read data that is available but keep the stream from entering "flowing mode"
port.on('readable', function () {
  console.log('Data:', port.read());
});
setInterval(function(){
    port.write('AT+PLCTML\r\n');
}, 1000);