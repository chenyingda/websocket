'use strict';
const util = require('util');
const EventEmitter = require('events').EventEmitter;
module.exports = () => {
  class A {
    constructor(name) {
      this.name = name;
    }
  }
  util.inherits(A, EventEmitter);
  return A;
};
