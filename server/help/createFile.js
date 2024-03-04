import fs from 'fs';
import path from 'path';

export default async function createFileForBackup(backupData, fileName, folderName) {
  const dataToWrite = typeof backupData === 'object' ? JSON.stringify(backupData, null, 2) : backupData;

  const formattedDate = setTimeDate();

  const namefile = `${fileName}_${formattedDate}.json`; 

  const directoryPath = path.join('backups', folderName);
  const filePath = path.join(directoryPath, namefile);

  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    fs.writeFileSync(filePath, dataToWrite);
  } catch (err) {
    console.error('Error writing file', err);
  };
};


function setTimeDate(){
  const date = new Date();
  
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}_${month}_${day}_${hours}_${minutes}`;
};