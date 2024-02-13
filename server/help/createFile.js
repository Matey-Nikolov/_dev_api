import fs from 'fs';

export default async function createFileForBackup(backupData, fileName) {
  const dataToWrite = typeof backupData === 'object' ? JSON.stringify(backupData, null, 2) : backupData;

  const namefile = `${fileName}.json`;

  try {
    fs.writeFileSync(namefile, dataToWrite);

    // set file in read only function for all
    //fs.chmodSync('newfile.json', '444');

    console.log('Data is saved.');
  } catch (err) {
    console.error('Error writing file', err);
  };
};