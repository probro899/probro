import path from 'path';
import pdf from 'html-pdf';
import htmlStringFormater from './htmlStringFormater';

export default async (reportData, session) => {
  const phantomPath = path.join(process.cwd(), '..', '..', 'node_modules', 'phantomjs-prebuilt', 'bin', 'phantomjs');
  const scriptPath = path.join(process.cwd(), '..', '..', 'node_modules', 'html-pdf', 'lib', 'scripts', 'pdf_a4_portrait.js');
  try {
    const options = {
      format: 'Letter',
      phantomPath: `${phantomPath}`,
      script: `${scriptPath}`,
    };

    const reportName = `${reportData.boardDetail.name}-${Date.now()}.pdf`;
    const filePath = path.join(process.cwd(), 'build', 'public', 'assets', 'user', `${10000000 + parseInt(session.values.user.id, 10)}`, 'report', reportName);
    let finalPdfRes = null;

    const result = await new Promise((resolve, reject) => {
      pdf.create(htmlStringFormater(reportData, session), options).toFile(filePath, (err, res) => {
        if (err) {
          console.log('Error in pdf generator', err);
          reject();
          return;
        }
        if (res) {
          resolve(reportName);
        }
      });
    });
    return reportName;
  } catch (e) {
    console.log('Error in generating pdf', e);
    return false;
  }
};
