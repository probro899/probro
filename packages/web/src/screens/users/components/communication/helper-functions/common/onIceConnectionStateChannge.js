
export default function onIceConnectionStateChange(e, pc) {
  console.log('ICE state', pc.iceConnectionState);
}
