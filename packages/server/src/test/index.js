// // const board = [{ id: 1, name: 'test' }, { id: 2, name: 'id 2 test' }, { id: 3, name: 'id 3 test' }, { id: 4, name: 'id 4 test' }];
// // const userList = [{ userId: 1 }, { userId: 4 }];

// // function presentorTestor(obj) {
// //   let p = false;
// //   userList.forEach((e) => {
// //     if (e.userId === obj.id) {
// //       p = true;
// //     }
// //   });
// //   return p;
// // }

// // const result = board.filter(e => presentorTestor(e));

// // console.log(result);

// // const arr = [{ id: 0, name: 'bhagya' }, { id: 1, name: 'rajiv' }];
// // const byId = arr.reduce((mainObj, obj) => {
// //   mainObj[obj.id] = obj;
// //   return mainObj;
// // }, {});
// // console.log(byId);

// // const allIds = arr.map(obj => obj.id);
// // console.log(allIds);
// const testArray = [{ id: 2,
//   firstName: 'Bhagya',
//   lastName: 'sah',
//   password:
//    '$2b$10$OengntTI.H46l.EVNBpjF.qYo/akXzzHwq87UvFdkTmetA.L4kepO',
//   middleName: 'kr',
//   email: 'bhagyasah4u@gmail.com',
//   verificationToken: '56b8bd9e-6ebc-4048-9f97-d9e1ba4df437',
//   verify: '0' },
// { id: 1,
//   firstName: 'Rajiv',
//   lastName: 'sah',
//   password:
//    '$2b$10$6U1M0PVOjoFysXk3g.06Ju5JQnfKeTvi4T8RiZEdVt7E4ak8avIBK',
//   middleName: 'kr',
//   email: 'bhagya_sah@yahoo.com',
//   verificationToken: '933d3403-8c51-420f-b3be-a23ea55b3606',
//   verify: '0' },
// { id: 2,
//   firstName: 'Bhagya',
//   lastName: 'sah',
//   password:
//    '$2b$10$OengntTI.H46l.EVNBpjF.qYo/akXzzHwq87UvFdkTmetA.L4kepO',
//   middleName: 'kr',
//   email: 'bhagyasah4u@gmail.com',
//   verificationToken: '56b8bd9e-6ebc-4048-9f97-d9e1ba4df437',
//   verify: '0' },
// { id: 1,
//   firstName: 'Rajiv',
//   lastName: 'sah',
//   password:
//    '$2b$10$6U1M0PVOjoFysXk3g.06Ju5JQnfKeTvi4T8RiZEdVt7E4ak8avIBK',
//   middleName: 'kr',
//   email: 'bhagya_sah@yahoo.com',
//   verificationToken: '933d3403-8c51-420f-b3be-a23ea55b3606',
//   verify: '0' },
// { id: 2,
//   firstName: 'Bhagya',
//   lastName: 'sah',
//   password:
//    '$2b$10$OengntTI.H46l.EVNBpjF.qYo/akXzzHwq87UvFdkTmetA.L4kepO',
//   middleName: 'kr',
//   email: 'bhagyasah4u@gmail.com',
//   verificationToken: '56b8bd9e-6ebc-4048-9f97-d9e1ba4df437',
//   verify: '0' },
// { id: 1,
//   firstName: 'Rajiv',
//   lastName: 'sah',
//   password:
//    '$2b$10$6U1M0PVOjoFysXk3g.06Ju5JQnfKeTvi4T8RiZEdVt7E4ak8avIBK',
//   middleName: 'kr',
//   email: 'bhagya_sah@yahoo.com',
//   verificationToken: '933d3403-8c51-420f-b3be-a23ea55b3606',
//   verify: '0' },
// { id: 2,
//   firstName: 'Bhagya',
//   lastName: 'sah',
//   password:
//    '$2b$10$OengntTI.H46l.EVNBpjF.qYo/akXzzHwq87UvFdkTmetA.L4kepO',
//   middleName: 'kr',
//   email: 'bhagyasah4u@gmail.com',
//   verificationToken: '56b8bd9e-6ebc-4048-9f97-d9e1ba4df437',
//   verify: '0' },
// { id: 1,
//   firstName: 'Rajiv',
//   lastName: 'sah',
//   password:
//    '$2b$10$6U1M0PVOjoFysXk3g.06Ju5JQnfKeTvi4T8RiZEdVt7E4ak8avIBK',
//   middleName: 'kr',
//   email: 'bhagya_sah@yahoo.com',
//   verificationToken: '933d3403-8c51-420f-b3be-a23ea55b3606',
//   verify: '0' }, {
//     id: 3,
//   }, {id: 1}]

// const uniqArray = [];

// testArray.forEach((obj) => {
//   if (uniqArray.length === 0) {
//     uniqArray.push(obj);
//   }
//   let av = false;
//   for (let i = 0; i < uniqArray.length; i += 1) {
//     if (obj.id === uniqArray[i].id) {
//       av = false;
//       break;
//     } else {
//       av = true;
//     }
//   }
//   if (av) {
//     uniqArray.push(obj);
//   }
// });

// console.log(uniqArray);

const arr = [ { id: 2,
  firstName: 'Bhagya',
  email: 'bhagyasah4u@gmail.com',
  activeStatus: null },
{ id: 1,
  firstName: 'Rajiv',
  email: 'bhagya_sah@yahoo.com',
  activeStatus: null } ];

  function checkUser(id) {
    for (let i = 0; i < arr.length; i += 1) {
      if(arr[i].id === id) {
        return true;
      }
    };
    return false;
  }
  console.log(checkUser(3));
