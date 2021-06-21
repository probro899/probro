export const getUrlParams = () => {
  if (typeof document === 'object') {
    const urlParams = new URLSearchParams(window.location.search);
    let allParams = {};
      for (let key of urlParams.keys()) {
        allParams[key] = urlParams.get(key);
      }
    return allParams;
  }
  return {};
}

export const setUrlParams = (obj) => {
  if (typeof document === 'object') {
    var url = new URL(window.location.href);
    var search_params = url.searchParams;
    Object.keys(obj).map(o => {
      search_params.set(o, obj[o]);
    });
    window.history.replaceState(null, null, `?${search_params.toString()}`);
    return true;
  }
}
