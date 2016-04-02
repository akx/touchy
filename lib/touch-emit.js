var mts = require("./mts-ffi");
var lib = mts.MultitouchSupport;
module.exports = function TouchEmitter (emit) {
    if(!(this instanceof TouchEmitter)) {
        throw new Error("Call me with `new`");
    }
    const fingers = {};
    const sys2per = {};
    var persistentId = 1;
    emit = emit || function () {};

    function mapSystemIdToPersistentId(systemId, createNew) {
        if (createNew && !sys2per[systemId]) {
            sys2per[systemId] = (persistentId++);
        }
        return sys2per[systemId];
    }

    var cb = mts.MTContactCallbackFunction.toPointer(function mtcb(dev, dataBuf, nFingers, ts, frame) {
        const data = dataBuf.deref();
        var sysId = data.identifier;
        const isAlive = (data.size >= 0.01);
        const isNew = !fingers[sysId];

        const f = {
            frame: data.frame,
            timestamp: data.timestamp,
            state: data.state,
            pos: data.normalized.pos.toObject(),
            vel: data.normalized.vel.toObject(),
            size: data.size,
            angle: data.angle,
            minorAxis: data.minorAxis,
            majorAxis: data.majorAxis,
        };
        f.id = mapSystemIdToPersistentId(sysId, isNew && isAlive);
        if (!isNew && !isAlive) {
            emit("stop", f);
            fingers[sysId] = sys2per[sysId] = null;
            return;
        }
        if (!isAlive) return;
        emit((isNew ? "start" : "move"), f);
        fingers[sysId] = f;
    });
    const dev = lib.MTDeviceCreateDefault();
    lib.MTRegisterContactFrameCallback(dev, cb);
    lib.MTDeviceStart(dev, 0);
    this._callback = cb;
};
