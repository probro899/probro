const client = require('./index');

let c1 = 0;
function client1() {
  setInterval(() => client().setData(`C1Channel-${c1}`), 5000);
  c1 += 1;
}

function client2() {
  setInterval(() => {
    client().setData(`C2Channel-${c1}`);
    c1 += 1;
  }, 10000);
}

client1();
client2();
// test comment for git
