const args = require("minimist")(process.argv);
const port = (0 | args.p) || 34576;
const WebSocketServer = require("ws").Server;
const TouchEmitter = require("./lib/touch-emit");
console.log(`listening on port ${port}`);
const wss = new WebSocketServer({port: port});
wss.on("connection", function connection(ws) {
    console.log("Connection GET.");
});
const emit = function emit(type, payload) {
    const msg = Object.assign({type}, payload);
    const j = JSON.stringify(msg);
    wss.clients.forEach(function each(client) {
        try {
            client.send(j);
        } catch(e) {

        }
    });
};
const emitter = new TouchEmitter(emit);
global.emitter = emitter;  // stash reference to avoid GC
