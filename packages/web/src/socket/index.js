
export default (remoteUrl) => {
  const Socket = WebSocket;
  const socket = new Socket(remoteUrl);
  socket.addEventListener('message', (event) => {
    console.log('message from server', event.data);
    socket.send('message', 'Hello server');
  });
  socket.onmessage = (event) => {
    console.log('data from server', event.data);
  };
};
