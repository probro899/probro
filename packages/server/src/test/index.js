const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlainTextpasswoed = 'bidhaco199201';
let hashPassword = '';
// $2b$10$Frnme2D8d2HyB3.kgx2AVefi.VWrOXrsW0EeqvgToMrSbH9dmkcyK
bcrypt.hash(myPlainTextpasswoed, saltRounds).then((hash) => {
  hashPassword = hash;
  bcrypt.compare(myPlainTextpasswoed, "$2b$10$Frnme2D8d2HyB3.kgx2AVefi.VWrOXrsW0EeqvgToMrSbH9dmkcyK").then((res) => {
    console.log(myPlainTextpasswoed, hashPassword);
    console.log(res);
  });
});
