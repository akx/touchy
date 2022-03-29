const FFI = require("ffi-napi");
const ref = require("ref-napi");
const ArrayType = require("ref-array-di")(ref);
const Struct = require("ref-struct-di")(ref);

const voidPtr = ref.refType(ref.types.void);

const MTDeviceRef = voidPtr;
const mtPoint = Struct({
  x: ref.types.float,
  y: ref.types.float,
});
const mtReadout = Struct({
  pos: mtPoint,
  vel: mtPoint,
});
const Finger = Struct({
  frame: ref.types.int32,
  timestamp: ref.types.double,
  identifier: ref.types.int32,
  state: ref.types.int32,
  foo3: ref.types.int32,
  foo4: ref.types.int32,
  normalized: mtReadout,
  size: ref.types.float,
  zero1: ref.types.int32,
  angle: ref.types.float,
  majorAxis: ref.types.float,
  minorAxis: ref.types.float,
  mm: mtReadout,
  zero2: ArrayType(ref.types.int32, 2),
  unk2: ref.types.float,
});

const MTContactCallbackFunction = FFI.Function(ref.types.int32, [
  ref.types.int32,
  voidPtr,
  ref.types.int32,
  ref.types.double,
  ref.types.int32,
]);

const MTContactCallbackFunctionPtr = ref.refType(MTContactCallbackFunction);

const MultitouchSupport = new FFI.Library("MultitouchSupport", {
  MTDeviceCreateDefault: [MTDeviceRef, []],
  MTRegisterContactFrameCallback: [
    ref.types.void,
    [MTDeviceRef, MTContactCallbackFunction],
  ],
  MTDeviceStart: [ref.types.void, [MTDeviceRef, ref.types.int32]],
});

exports.Finger = Finger;
exports.MTContactCallbackFunction = MTContactCallbackFunction;
exports.MTContactCallbackFunctionPtr = MTContactCallbackFunctionPtr;
exports.MTDeviceRef = MTDeviceRef;
exports.MultitouchSupport = MultitouchSupport;
exports.mtPoint = mtPoint;
exports.mtReadout = mtReadout;
