// function keepAlive() {
//   const channel = [];
//   setInterval(() => console.log('i am alive'), 20000);
//   return {
//     setChannel: (id) => {
//       channel.push(id);
//       console.log('current channel value', channel);
//     },
//     getChannel: () => {
//       return channel;
//     },
//   };
// }

// let i = 0;
// const mainKeepAlive = keepAlive();
// function client() {
//   return {
//     setData: data => mainKeepAlive.setChannel(data),
//     getData: () => mainKeepAlive.getChannel(),
//   };
// }

// module.exports = client;
