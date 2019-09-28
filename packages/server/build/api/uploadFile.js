'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = record => {
  console.log('upload image api called', record);
  return record.image;
};