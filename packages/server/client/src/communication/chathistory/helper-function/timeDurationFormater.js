export default (duration) => {
  const mins = Math.floor(parseInt(duration, 10) / (60 * 1000));
  const secs = Math.floor((parseInt(duration, 10) - (mins * 60 * 1000)) / 1000);
  return `(${mins} : ${secs})  `;
};
