import fs from 'fs';
import path from 'path';
import pdf from 'html-pdf';
import htmlStringFormater from './htmlStringFormater';

export default async (reportData, session) => {
  // console.log('main pdf generator called', reportData, session.values.user, __dirname);

  try {
    const options = {
      format: 'Letter',
    };
    const reportName = `${reportData.boardDetail.name}-${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '..', 'public', 'user', `${10000000 + parseInt(session.values.user.id, 10)}`, 'report', reportName);
    let finalPdfRes = null;

    const result = await new Promise((resolve, reject) => {
      pdf.create(htmlStringFormater(reportData, session), options).toFile(filePath, (err, res) => {
        if (err) {
          console.log('Error in pdf generator', err);
          reject();
          return;
        }
        if (res) {
          console.log('response of pdf', res);
          resolve(reportName);
        }
      });
    });
    console.log('final pdf res', result);
    return reportName;
  } catch (e) {
    console.log('Error in generating pdf', e);
    return false;
  }
};
