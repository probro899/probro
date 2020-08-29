export default (text) => {
  const urlRegex = /(https?:\/\/|w{3}\.)\w+(\.\w+)+\S*/gi;
  if (text.match(urlRegex)) {
    text.match(urlRegex).map(o => {
      text = text.replace(o, `<a target="_blank" href=${o}>${o}</a>`);
    });
  }
  return text;
};
