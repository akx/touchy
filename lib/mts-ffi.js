var FFI = require('ffi-napi'),
    ref = require('ref-napi'),
    ArrayType = require('ref-array-di')(ref),
    Struct = require('ref-struct-di')(ref);

var voidPtr = ref.refType(ref.types.void);

var MTDeviceRef = exports.MTDeviceRef = voidPtr;
var mtPoint = exports.mtPoint = Struct({
  x: ref.types.float,
  y: ref.types.float,
});
var mtReadout = exports.mtReadout = Struct({
  pos: mtPoint,
  vel: mtPoint,
});
var Finger = exports.Finger = Struct({
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

var MTContactCallbackFunction = exports.MTContactCallbackFunction = FFI.Function(ref.types.int32, [
  ref.types.int32,
  voidPtr,
  ref.types.int32,
  ref.types.double,
  ref.types.int32,
]);
var MTContactCallbackFunctionPtr = exports.MTContactCallbackFunctionPtr = ref.refType(MTContactCallbackFunction);

exports.MultitouchSupport = new FFI.Library('MultitouchSupport', {
  MTDeviceCreateDefault: [MTDeviceRef, [
  ]],
  MTRegisterContactFrameCallback: [ref.types.void, [
    MTDeviceRef,
    MTContactCallbackFunction,
  ]],
  MTDeviceStart: [ref.types.void, [
    MTDeviceRef,
    ref.types.int32,
  ]],
});

