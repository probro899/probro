
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
  const noOfCreateCard = boardActivities.filter(ba => ba.userId === user.id).filter(ua => ua.message === 'createCard').length;
  const noOfMoveCard = boardActivities.filter(ba => ba.userId === user.id).filter(ua => ua.message === 'outsideColumn').length;
  const noOfComment = boardActivities.filter(ba => ba.userId === user.id).filter(ua => ua.message === 'createComment').length;
  const noOfHours = hoursCalculator(boardCommunicationActivities.filter(bm => bm.userId === user.id));
  const noOfMessage = boardCommunicationActivities.filter(bm => bm.userId === user.id).length;
  const res = { userName, noOfCreateCard, noOfComment, noOfHours, noOfMessage, noOfMoveCard };
  return res;
};
