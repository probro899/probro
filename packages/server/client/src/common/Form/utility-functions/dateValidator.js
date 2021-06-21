export default (e) => {
    if (e) {
        if (e._isAMomentObject) return true;
        return false;
    }
    return true;
}
