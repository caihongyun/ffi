var assert = require('assert')

var bindings = require('./bindings')

var ffiPrepCif = bindings.ffi_prep_cif

/**
 *
 * @param {string} retType
 * @param {string[]} argsTypes
 * @param {number} abi
 */
function CIF (retType, argsTypes, abi) {
  assert(typeof retType === 'string')
  assert(Array.isArray(argsTypes))
  argsTypes.forEach((it, idx) => assert(typeof it === 'string', 'item ' + idx + ' of argsTypes shall be a string, got' + typeof it))

  var numOfArgs = this.numOfArgs = argsTypes.length
  this.retType = retType
  this.argsTypes = argsTypes

  var cifPtr = Buffer.alloc(8, 0)
  var status = ffiPrepCif(cifPtr, numOfArgs, retType, argsTypes)
  if (status !== 0) {
    throw new Error('Prepare CIF failed for errno ' + status)
  }
  this._cifPtr = cifPtr
}

module.exports = CIF
