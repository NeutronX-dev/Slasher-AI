let WebSocket = WebSocket('wss://' + host + '?SCode=' + SCodes);
const phantom = require('phantom');
const WebSocketServer = require('ws').Server;
//This file contain bot bypass, please do not touch it! You could mess whole code!
class PhantomServer {
	constructor() {
		this.driver = phantom.create().then(ph => ph.createPage());
		this.page = {};
		this.agarioURL = 'https://agar.one/';
		this.queue = {};
		this.webSocketServer = null;
		this.client = null;
		this.loadWebSocketServer();
	}
	loadWebSocketServer() {
		this.webSocketServer = new WebSocketServer({
			port: 8000
		});
		this.webSocketServer.on('connection', this.onWebSocketConnection.bind(this));
		this.loadDriver();
	}
	onWebSocketConnection(ws) {
		this.client = ws;
		if (this.onReady) this.onReady();
		ws.on('message', buf => {
			switch (buf.readUInt8(0)) {
				case 113:
					const botID = buf.readUInt16LE(buf.byteLength - 2);
					const packet113 = new Buffer(buf.byteLength - 2);
					for (let i = 0; i < buf.byteLength - 2; i++) packet113.writeUInt8(buf.readUInt8(i), i);
					this.queue[botID](packet113, botID);
					delete this.queue[botID];
					break;
				case 255:
					if (this.on255) this.on255(new Uint8Array(buf));
					break;
				case 254:
					if (this.onProtocolVersion) this.onProtocolVersion(buf.readUInt8(1));
					break;
			}
		});
	}
	prepare112(_112, botID) {
		const buf = new Buffer(_112);
		const packet112 = new Buffer(buf.byteLength + 2);
		for (let i = 0; i < buf.byteLength; i++) packet112.writeUInt8(buf.readUInt8(i), i);
		packet112.writeUInt16LE(botID, buf.byteLength);
		return packet112;
	}
	loadDriver() {
		let beforeLoad = Date.now();
		this.driver.then(page => {
			this.page = page;
			this.setPageProperties();
			return page.open(this.agarioURL);
		}).then(content => {
			console.log(`Phantom server loaded ${this.agarioURL} in ${Date.now() - beforeLoad} milliseconds.`);
			this.onAgarioLoaded();
		});
	}
	setPageProperties() {
		this.page.property('viewportSize', {
			width: 800,
			height: 600
		});
		this.page.property('onResourceRequested', function (requestData, networkRequest) {
			if (!/(agar\.bio|miniclip)/g.test(requestData.url)) networkRequest.abort();
		});
		this.page.property('onConsoleMessage', function (message) {
			console.log(message);
		});
	}
	onAgarioLoaded() {
		this.page.evaluate(function () {
			window.queue113 = [];
			window.encryptionKey = 0;
			window.realWebSocket = window.WebSocket;
			window.key255 = null;
			window.key254 = null;
			window.WebSocket = function (url, protocols) {
				window.encryptionKey = 0;
				window.ws = this;
				setTimeout(function () {
					this.readyState = 1;
					this.onopen();
				}.bind(this), 100);
			};
			window.communicationSocket = new window.realWebSocket('ws://localhost:8000');
			window.communicationSocket.binaryType = 'arraybuffer';
			window.communicationSocket.onmessage = function (message) {
				var buf = new DataView(message.data);
				var botID = buf.getUint16(buf.byteLength - 2, true);
				var packet112 = new DataView(new ArrayBuffer(buf.byteLength - 2));
				for (var i = 0; i < buf.byteLength - 2; i++) {
					packet112.setUint8(i, buf.getUint8(i));
				}
				window.ws.fake112(packet112, botID, function (buf, botID) {
					var packet113 = new DataView(new ArrayBuffer(buf.byteLength + 2));
					for (var _i = 0; _i < buf.byteLength; _i++) {
						packet113.setUint8(_i, buf[_i]);
					}
					packet113.setUint16(buf.byteLength, botID, true);
					window.communicationSocket.send(packet113.buffer);
				});
			};
			window.communicationSocket.onopen = function () {
				if (window.key254) window.communicationSocket.send(window.key254);
				if (window.key255) window.communicationSocket.send(window.key255);
			}
			window.WebSocket.prototype.send = function (data) {
				data = new Uint8Array(data);
				if (window.encryptionKey) data = window.decryptPacket(data);
				switch (data[0]) {
					case 113:
						if (window.queue113.length < 1) break;
						var callback = window.queue113[0];
						var botID = window.queue113[1];
						callback(new Uint8Array(data), botID);
						window.queue113.shift();
						window.queue113.shift();
						break;
					case 255:
						if (data.length !== 5) break;
						if (window.communicationSocket.readyState == window.realWebSocket.OPEN) window.communicationSocket.send(data);
						window.encryptionKey = 673720360 ^ (data[1] | data[2] << 8 | data[3] << 16 | data[4] << 24);
						window.key255 = data;
						break;
					case 254:
						if (data.length !== 5) break;
						if (window.communicationSocket.readyState == window.realWebSocket.OPEN) window.communicationSocket.send(data);
						window.key254 = data;
						break;
				}
			};
			WebSocket.prototype.fake112 = function (_112, botID, callback) {
				window.queue113.push(callback);
				window.queue113.push(botID);
				var fakeMessageEvent = new MessageEvent('message', {
					data: _112.buffer,
					returnValue: true
				});
				window.ws.onmessage.call(window.ws, fakeMessageEvent);
			};
			window.decryptPacket = function (data) {
				for (var i = 0; i < data.length; i++) {
					data[i] = data[i] ^ window.encryptionKey >>> i % 4 * 8 & 255;
				}
				window.encryptionKey = window.rotateKey(window.encryptionKey);
				return data;
			};
			window.rotateKey = function (key) {
				key = Math.imul(key, 1540483477) >> 0;
				key = (Math.imul(key >>> 24 ^ key, 1540483477) >> 0) ^ 114296087;
				key = Math.imul(key >>> 13 ^ key, 1540483477) >> 0;
				return key >>> 15 ^ key;
			};
			//core._connect = core.connect;
			//core.connect = function () {console.log(0)};
			//core._connect('ws://fakeservermeme');
		}).then(out => console.log(`Injected code to ${this.agarioURL}.`));
	}
	get113(_112, botID, callback) {
		this.queue[botID] = callback;
		const prepared112 = this.prepare112(_112, botID);
		this.client.send(prepared112);
	}
}
module.exports = new PhantomServer();