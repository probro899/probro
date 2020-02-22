const fs = require('fs');

const pdf = require('html-pdf');

const html = fs.readFileSync('report.html', 'utf-8');

console.log(html);

const options = {
  format: 'Letter',
};

pdf.create(html, options).toFile('./report.pdf', (err, res) => {
  if (err) {
    console.log('Error', err);
  }
  console.log(res);
});
