import cacheDatabase from '../../../../cache/database/cache';

export default function getCallId(data) {
    try {
    const { userId } = data;
    const  databaseUser = cacheDatabase.get('User');
    const user = databaseUser.filter(u => u).find(u => u.id === userId);
    if (user) {
        const { callId } = user;
        return callId;
    }
    return null;
    } catch(e) {
        console.error('Error in getCallId', e);
    }
}