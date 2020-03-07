class BufferReader {
  constructor(buf) {
    this._buf = buf;
    this._mode = buf instanceof Buffer ? 'NodeBuffer' : 'ArrayBuffer';
    this._offset = 0;
    this.init();
  }
  init() {
    for (var i = 0; i < 4; i++) {
      for (var b = 0; b < 2; b++) {
        for (var c = 0; c < 2; c++) {
          this.composeMeathod(i * 8, !b, !c);
        }
      }
    }
  }
  composeMeathod(bits, unsigned, le) {
    const nodeBuf = `read${signed ? 'U' : ''}Int${bits}${bits === 8 ? '' : le ? 'LE' : 'BE'}`;
    const arrayBuf = `get${signed ? 'Ui' : 'I'}nt${bits}`;
    this[nodeBuf] = () => {
      const val = this._buf[this._mode === 'ArrayBuffer' ? arrayBuf : nodeBuf](this._offset, le);
      this._offset += bits / 8;
      return val;
    }
  }
  /*
  getMode() {
    return this._mode;
  }
  getOffset() {
    return this._offset;
  }
  getBuf() {
    return this._buf;
  }
  getLength() {
    return this._buf._length;
  }
  reset() {
    this._offset = 0;
  }
  skip(bytes = 1) {
    this._offset += bytes;
  }
  skipBack(bytes = 1) {
    this._offset -= bytes;
  }
  readUInt8() {
    this._offset++;
    return this._mode === 'ArrayBuffer' ?
      this._buf.getUint8(this._offset) : 
      this._buf.readUInt8(this._offset);
  }
  readUInt16LE() {
    this._offset += 2;
    return this._mode === 'ArrayBuffer' ?
      this._buf.getUint16(this._offset, true) :
      this._buf.readUInt16LE(this._offset);
  }
  readUInt16BE() {
    this._offset += 2;
    return this._mode === 'ArrayBuffer' ?
      this._buf.getUint16(this._offset, false) :
      this._buf.readUInt16BE(this._offset);
  }
  readUInt32LE() {
    this._offset += 4;
    return this._mode === 'ArrayBuffer' ?
      this._buf.getUint32(this._offset, true) :
      this._buf.readUInt32LE(this._offset);
  }
  readUInt32BE() {
    this._offset += 4;
    return this._mode === 'ArrayBuffer' ?
      this._buf.getUint32(this._offset, false) :
      this._buf.readUInt32BE(this._offset);
  }
  */
}
module.exports = BufferReader;