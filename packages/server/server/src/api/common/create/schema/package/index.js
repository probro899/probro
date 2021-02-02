import uuid from 'uuid';
import add from '../../add';

async function addPackage(record) {
  const res = await add.call(this, 'Package', { ...record, timeStamp: Date.now() });
  return res;
}

async function addPackageDescription(record) {
  const res = await add.call('PackageDescription', { ...record, timeStamp: Date.now() });
  return res;
}

async function addSellPackage(record) {
  const referenceCode = await uuid();
  const res = await add.call('SellPakcage', { ...record, timeStamp: Date.now(), referenceCode });
  return { res, referenceCode };
}

export default [
  addPackage,
  addPackageDescription,
  addSellPackage,
];
