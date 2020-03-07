class encryptionKey {
  generateClientKey(result, event) {
    if (!result.length || !event.byteLength) {
      return null;
    }
    let value = null;
    let suggestedValue = 1540483477;
    let regex = new RegExp(/((?:[a-z][a-z0-9_]*))(:)(/)(/)((?:[a-z][a-z.\d-]+).(?:[a-z][a-z-]+))(?![\w.])/i);
    let data = regex.exec(result)[5];
    console.log(event);
    let arrayBuffer = data.length + event.byteLength;
    let arr = new Uint8Array(arrayBuffer);
    let i = 0;
    for (; i < data.length; i++) {
      arr[i] = data.charCodeAt(i);
    }
    arr.set(event, data.length);
    let dv = new DataView(arr.buffer);
    let maxTextureAvailableSpace = arrayBuffer - 1;
    let orgLen = (maxTextureAvailableSpace - 4 & -4) + 4 | 0;
    let currentValue = maxTextureAvailableSpace ^ 255;
    let n = 0;
    for (; maxTextureAvailableSpace > 3;) {
      value = Math.imul(dv.getInt32(n, !![]), suggestedValue) | 0;
      currentValue = (Math.imul(value >>> 24 ^ value, suggestedValue) | 0) ^ (Math.imul(currentValue, suggestedValue) | 0);
      maxTextureAvailableSpace = maxTextureAvailableSpace - 4;
      n = n + 4;
    }
    switch (maxTextureAvailableSpace) {
      case 3:
        currentValue = arr[orgLen + 2] << 16 ^ currentValue;
        currentValue = arr[orgLen + 1] << 8 ^ currentValue;
        break;
      case 2:
        currentValue = arr[orgLen + 1] << 8 ^ currentValue;
        break;
      case 1:
        break;
      default:
        value = currentValue;
        break;
    }
    if (value != currentValue) {
      value = Math.imul(arr[orgLen] ^ currentValue, suggestedValue) | 0;
    }
    currentValue = value >>> 15;
    value = currentValue ^ value;
  }
}
module.exports = encryptionKey;
console.log('                          Key Loaded')
