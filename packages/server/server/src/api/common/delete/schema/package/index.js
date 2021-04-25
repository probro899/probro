// eslint-disable-next-line import/no-cycle
import Delete from '../../delete';

async function deletePackage(record) {
  const res = await Delete.call(this, 'Package', record);
  return res;
}

function deletePackageDescription(record) {
  const res = Delete.call(this, 'PackageDescription', record);
  return res;
}
 
export default [
  deletePackage,
  deletePackageDescription,
];
