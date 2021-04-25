export default (text) => {
  const urlRegex = /(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gi;
  if (text.match(urlRegex)) {
    text.match(urlRegex).map(o => {
      text = text.replace(o, `<a target="_blank" href=${o}>${o}</a>`);
    });
  }
  return text;
};
