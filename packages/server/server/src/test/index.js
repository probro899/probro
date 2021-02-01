const header = { id: 'Id', name: 'Name', address: 'Address', phoneNo: 'Phone' };

const data = [{ id: 1, phoneNo: 19190, address: 'alsjfdalkj', name: 'bhagya' }, { id: 2, address: 'khutauna', phoneNo: 12984, name: 'ranjit' }];

const values = Object.values(header);
const keys = Object.keys(header);

const newArray = data.map((row) => {
  keys.map(k => row[k]);
});
