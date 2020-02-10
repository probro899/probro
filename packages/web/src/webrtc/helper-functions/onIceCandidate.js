
export default async function onICeCandidate(e, pc, apis, userList) {
  // console.log('onicecandidatedata local', e);
  try {
    await apis.addIceCandidate([JSON.stringify(e.candidate), userList]);
  } catch (err) {
    console.error('Error in add local iCe candidate', err);
  }
}
