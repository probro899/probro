export default async (data, props) => {
  try {
    const { apis, orgObj, addDatabaseSchema } = props;
    const { addOrganizationMember } = apis;
    const addMemRes = await addOrganizationMember({ ...data, oId: orgObj.id });
    if (addMemRes.status === 200) {
      if (data.action === 'invitation') {
        addDatabaseSchema('OrganizationMember', { ...addMemRes.data, oId: orgObj.id, status: 'invitation' });
      }
      return { response: 200, message: addMemRes.message };
    }
    if (addMemRes.status === 201) {
      return { response: 400, error: addMemRes.message };
    }
  } catch (e) {
    return { response: 400, error: 'Internal server error' };
  }
};
