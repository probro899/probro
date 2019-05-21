const detelet = () => {
  console.log(this);
};

const testObj = { session: 'some value' };
const testFunc = detelet.bind(testObj);

testFunc();
