/* global document */

export default {
  get: (cookie) => {
    let r;
    let chk;
    if (typeof document !== 'undefined') {
      chk = `${cookie.trim()}=`;
      const cookies = document.cookie.split(';');
      r = cookies.find(c => c.trim().indexOf(chk) === 0);
    }
    if (!r) {
      return null;
    }

    const res = r.trim().substr(chk.length);
    return res;
  },

  set: (cookie, value) => {
    if (typeof document !== 'undefined') {
      document.cookie = `${cookie.trim()}=${value}; max-age=${60 * 60 * 24 * 7};`;
    }
  },

  clear: (cookie) => {
    if (typeof document !== 'undefined') {
      document.cookie = `${cookie.trim()}= ;expires=${(new Date(Date.now() - 1)).toUTCString()}`;
    }
  },
};
