export default (type, apppointmentList, data) => {
    switch (type) {
        case "create":
            return [...apppointmentList, { ...data }];
        case "delete":
            return [...apppointmentList.filter(o => o.id !== data.id)];
        case "update":
            return [...apppointmentList.filter(o => o.id !== data[1].id), { ...apppointmentList.find(o => o.id === data[1].id), ...data[0] }];
        default:
            break;
    }
}
