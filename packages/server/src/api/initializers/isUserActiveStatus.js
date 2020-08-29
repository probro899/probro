export default function isUserActiveStatus(boards, userList) {
  const finalUserList = userList.map((u) => {
    for (let i = 0; i < boards.length; i += 1) {
      if (boards[i].values.user.id === u.id) {
        return { ...u, activeStatus: true };
      }
    }
    return { ...u, activeStatus: false };
  });
  return finalUserList;
}
