const sortAppointmentDes = (a, b) => {
    if (a.startDate < b.startDate) return 1;
    return -1;
}

const sortAppointmentAsc = (a, b) => {
    if (a.startDate > b.startDate) return 1;
    return -1;
}

export { sortAppointmentDes, sortAppointmentAsc };
