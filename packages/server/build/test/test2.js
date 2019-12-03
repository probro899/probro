"use strict";

const data = [{ id: 1, tuserId: 1, fuserId: 2, timeStamp: 1570949268214, message: "hi" }, { id: 2, tuserId: 2, fuserId: 1, timeStamp: 1570951426270, message: "hlw" }, { id: 3, tuserId: 1, fuserId: 2, timeStamp: 1570951431019, message: "k chha khabar" }, { id: 4, tuserId: 2, fuserId: 1, timeStamp: 1570951435368, message: "thik chha" }, { id: 5, tuserId: 1, fuserId: 2, timeStamp: 1570951439997, message: "ok " }, { id: 6, tuserId: 2, fuserId: 1, timeStamp: 1570951443851, message: "ok " }, { id: 7, tuserId: 1, fuserId: 2, timeStamp: 1570955543352, message: "btest1" }, { id: 8, tuserId: 2, fuserId: 1, timeStamp: 1570955550309, message: "rtest 2" }, { id: 9, tuserId: 2, fuserId: 1, timeStamp: 1570955561169, message: "bttest 2" }, { id: 10, tuserId: 1, fuserId: 2, timeStamp: 1570955566896, message: "b test 3" }, { id: 11, tuserId: 1, fuserId: 2, timeStamp: 1570956280382, message: "test1" }, { id: 12, tuserId: 2, fuserId: 1, timeStamp: 1570956313002, message: "test" }, { id: 13, tuserId: 2, fuserId: 1, timeStamp: 1570960399931, message: "hlw rajiv 1" }, { id: 14, tuserId: 1, fuserId: 2, timeStamp: 1570962193841, message: "hlw rahiv 2" }, { id: 15, tuserId: 2, fuserId: 1, timeStamp: 1570962501375, message: "bhagya msg 1" }, { id: 16, tuserId: 1, fuserId: 2, timeStamp: 1570962507197, message: "rajiv msg 2" }, { id: 17, tuserId: 1, fuserId: 3, timeStamp: 1570964439399, message: "hlw from nabin" }, { id: 19, tuserId: 1, fuserId: 3, timeStamp: 1570964468870, message: "k chha khabar" }, { id: 1570964457590, tuserId: 3, fuserId: 1, timeStamp: 1570964457590, message: "hi from bhagya" }];

// const expectedObj = { 1: [], 2: [], 3: [] };

const expectedObj = {};

data.forEach(obj => {
  if (expectedObj[obj.tuserId]) {
    expectedObj[obj.tuserId] = [...expectedObj[obj.tuserId], obj];
  } else {
    expectedObj[obj.tuserId] = [obj];
  }
  if (expectedObj[obj.fuserId]) {
    expectedObj[obj.fuserId] = [...expectedObj[obj.fuserId], obj];
  } else {
    expectedObj[obj.fuserId] = [obj];
  }
});

console.log(expectedObj);