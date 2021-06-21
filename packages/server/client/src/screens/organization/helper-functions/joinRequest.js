export default async (data, props) => {
  try {
    const { apis } = props;
    const { addOrganizationMember } = apis;
    const addMemRes = await addOrganizationMember({ ...data });
    // console.log('addMember Res', addMemRes);
    if (addMemRes.status === 200) {
      if (data.action === 'request') {
        // addDatabaseSchema('OrganizationMember', { ...addMemRes.data, oId: orgObj.id, status: '' });
      }
      return { response: 200, message: 'Request Successfull' };
    }
    if (addMemRes.status === 201) {
      return { response: 400, message: 'Request Faild' };
    }
  } catch (e) {
    return { response: 400, message: 'Internal server error' };
  }
};
