import uuid from 'uuid';
import add from '../../add';

async function addPackage(record) {
  try {
    const res = await add.call(this, 'Package', { ...record, timeStamp: Date.now() });
    return res;
  } catch (e) {
    console.error('Error in addPackage', e)
  }
}

async function addPackageDescription(record) {
  try {
    const res = await add.call('PackageDescription', { ...record, timeStamp: Date.now() });
    return res;
  } catch (e) {
    console.error('Error in addPackageDescription', e);
  }
}

async function addSellPackage(record) {
  try {
    const referenceCode = await uuid();
    const res = await add.call('SellPakcage', { ...record, timeStamp: Date.now(), referenceCode });
    return { res, referenceCode };
  } catch (e) {
    console.error('Error in addSellPackage', e)
  }
}

export default [
  addPackage,
  addPackageDescription,
  addSellPackage,
];
