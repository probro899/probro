const syllabusLectureManipulator = (type, currentSyllabus, item) => {
  let newSyllabus = null;
  switch (type) {
    case 'add':
      newSyllabus = currentSyllabus.map(o => {
        if (o.id === item.sectionId) { o.lectures.push(item); }
        return o;
      });
      return newSyllabus;
    case 'update':
      newSyllabus = currentSyllabus.map(obj => {
        if (obj.id === item[1].sectionId) {
          return { ...obj, lectures: obj.lectures.map(o => {
            if (o.id === item[1].id) {
              return { ...o, ...item[0] };
            }
            return o;
          })}
        }
        return obj;
      })
      return newSyllabus;
    case 'delete':
      return syllabusList.map(obj => {
        if (obj.id === deleteObject.sectionId) {
          return { ...obj, lectures: obj.lectures.filter(o => o.id !== item.id ) }
        }
        return obj;
      });
    case 'resourceAdd':
      let lectureObj = currentSyllabus.filter(o => o.id === item[1].sectionId)[0].lectures.find(o => o.id == item[1].id);
      if (lectureObj.resources) {
        lectureObj.resources.push(item[0]);
      } else {
        lectureObj.resources = [item[0]];
      }
      return syllabusLectureManipulator('update', currentSyllabus, [{ resources: lectureObj.resources }, { id: lectureObj.id, sectionId: item[1].sectionId }]);
    case 'resourceDelete':
      let resources = currentSyllabus.filter(o => o.id === item.sectionId)[0].lectures.find(o => o.id == item.lectureId).resources.filter(o => o.id !== item.id);
      return syllabusLectureManipulator('update', currentSyllabus, [{ resources }, { id: item.lectureId, sectionId: item.sectionId }]);
    case 'resourceUpdate':
      let allResources = currentSyllabus.filter(o => o.id === item[1].sectionId)[0].lectures.find(o => o.id == item[1].lectureId).resources;
      return syllabusLectureManipulator('update', currentSyllabus, [{ resources: [ ...allResources.filter(o => o.id !== item[1].id), { ...allResources.find(o => o.id === item[1].id), ...item[0] }] }, { id: item.lectureId, sectionId: item.sectionId }]);
    default:
      return currentSyllabus;
  }
}

export default syllabusLectureManipulator;
