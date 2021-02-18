/* eslint-disable import/no-cycle */
import update from '../../update';

async function updatePackage(records) {
  const record = records[0];
  const res = await update.call(this, 'Package', record, records[1]);
  return res;
}

async function updatePackageDescription(records) {
  const record = records[0];
  const res = await update.call(this, 'PackageDescription', record, records[1]);
  return res;
}

async function updateSellPackage(records) {
  const record = records[0];
  const res = await update.call(this, 'SellPackage', record, records[1]);
  return res;
}

export default [
  updatePackage,
  updatePackageDescription,
  updateSellPackage,
];
