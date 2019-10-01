const TYPE = 'LOGIN';

const login = (user) => {
  return ({
    type: TYPE,
    payload: user,
  });
};

login.TYPE = TYPE;
export default login;
