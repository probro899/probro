/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
import uuid from 'uuid';
import add from '../../add';

async function addPackage(record) {
  try {
    const res = await add.call(this, 'Package', { ...record, timeStamp: Date.now() });
    return res;
  } catch (e) {
    console.error('Error in addPackage', e);
  }
}

async function addPackageDescription(record) {
  try {
    const res = await add.call(this, 'PackageDescription', { ...record, timeStamp: Date.now() });
    return res;
  } catch (e) {
    console.error('Error in addPackageDescription', e);
  }
}

async function addSellPackage(record) {
  // console.log('addSellPackage called', record);
  try {
    const referenceCode = await uuid();
    const res = await add.call(this, 'SellPackage', { ...record, timeStamp: Date.now(), referenceCode });
    return { res, referenceCode, status: 200, message: 'Subscription Successfull' };
  } catch (e) {
    console.error('Error in addSellPackage', e);
    return { status: 201, message: 'Subscription Faild' };
  }
}

export default [
  addPackage,
  addPackageDescription,
  addSellPackage,
];
