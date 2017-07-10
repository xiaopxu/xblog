const os = require('os');

function getLocalIp() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        if (ifaces[dev][0].address) {
            return ifaces[dev][0].address;
        }
    }
}
module.exports = getLocalIp
