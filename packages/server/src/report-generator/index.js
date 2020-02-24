import fs from 'fs';
import path from 'path';
import pdf from 'html-pdf';
import htmlStringFormater from './htmlStringFormater';

export default async (reportData, session) => {
  console.log('main pdf generator called', reportData, session.values.user);
  try {
    const options = {
      format: 'Letter',
    };
    const reportName = `${reportData.boardDetail.name}-${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '..', 'public', 'user', `${10000000 + parseInt(session.values.user.id, 10)}`, 'report', reportName);
    console.log('filepath', filePath);
    let finalPdfRes = null;
    const result = await pdf.create(htmlStringFormater(reportData), options).toFile(filePath, (err, res) => {
      if (err) {
        console.log('Error in pdf generator', err);
        return false;
      }
      if (res) {
        console.log('response of pdf', res);
        return reportName;
      }
    });
    console.log('final pdf res', result);
    return reportName;
  } catch (e) {
    console.log('Error in generating pdf', e);
    return false;
  }
};
