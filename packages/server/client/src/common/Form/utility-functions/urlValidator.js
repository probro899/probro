const URL_REGEX = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;

export default (value) => {
    if (URL_REGEX.test(value)) {
      return true;
    }
    return false;
  };