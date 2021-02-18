const osFinder = () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)) {
    return 'Mobile';
  }
  return 'Desktop';
};

export default osFinder;
