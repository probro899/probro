export const sort = (users, asc) => {
   const sorted = users.sort((a, b) => {
        const isReversed = asc ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
    });
    return sorted;
};