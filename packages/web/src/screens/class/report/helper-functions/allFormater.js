export default (arr, todoFunc) => {
  let dayFlag = arr[0].timeStamp;
  const finalArr = [];
  const tempArr = [];
  let count = 0;
  arr.forEach((e) => {
    const sameMonth = todoFunc(new Date(dayFlag), new Date(e.timeStamp));
    if (sameMonth) {
      tempArr.push({ ...e, sameValue: count });
    } else {
      count += 1;
      tempArr.push({ ...e, sameValue: count });
      dayFlag = e.timeStamp;
    }
  });

  for (let i = 0; i <= count; i += 1) {
    finalArr.push(tempArr.filter(e => e.sameValue === i));
  }
  return finalArr;
};
