function testfunc(p1) {
  if (p1) {
    const var1 = 'var1';
    console.log('var1 in if', var1);
  } else {
    const var1 = 'var1';
    console.log('var1 in else', var1);
  }
}
testfunc(false);
