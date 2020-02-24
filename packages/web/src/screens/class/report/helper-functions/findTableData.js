
const hoursCalculator = (arr) => {
  const value = arr.reduce((t, n) => {
    if (n.type) {
      t += n.duration;
    }
    return t;
  }, 0);
  return (value / (1000 * 60 * 60)).toFixed(2);
};

export default (user, boardActivities, boardCommunicationActivities) => {
  const userName = user.firstName;
  const noOfCreateCard = boardActivities.filter(ba => ba.userId === user.id).filter(ua => ua.message === 'Create Card').length;
  const noOfMoveCard = 'No Of Move Cards';
  const noOfComment = boardActivities.filter(ba => ba.userId === user.id).filter(ua => ua.message === 'Create Comment').length;
  const noOfHours = hoursCalculator(boardCommunicationActivities.filter(bm => bm.userId === user.id));
  const noOfMessage = boardCommunicationActivities.filter(bm => bm.userId === user.id).length;
  const res = { userName, noOfCreateCard, noOfComment, noOfHours, noOfMessage };
  return res;
};
