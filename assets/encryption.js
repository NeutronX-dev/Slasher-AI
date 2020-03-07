const {
    readFileSync
} = require('fs');
function b(b) {
    b = b | 0;
    var c = 0;
    c = a[n + (b & 255) >> 0] | 0;
    if ((c | 0) < 8) return c | 0;
    c = a[n + (b >> 8 & 255) >> 0] | 0;
    if ((c | 0) < 8) return c + 8 | 0;
    c = a[n + (b >> 16 & 255) >> 0] | 0;
    if ((c | 0) < 8) return c + 16 | 0;
    return (a[n + (b >>> 24) >> 0] | 0) + 24 | 0
}
function _x(a, b) {
    a = a | 0;
    b = b | 0;
    var c = 0,
        d = 0,
        e = 0,
        f = 0;
    f = a & 65535;
    e = b & 65535;
    c = O(e, f) | 0;
    d = a >>> 16;
    a = (c >>> 16) + (O(e, d) | 0) | 0;
    e = b >>> 16;
    b = O(e, f) | 0;
    return (z = (a >>> 16) + (O(e, d) | 0) + (((a & 65535) + b | 0) >>> 16) | 0, a + b << 16 | c & 65535 | 0) | 0
}
console.log('                                Encryption Loaded!');
setTimeout(function () {
    console.clear();
}, 500);