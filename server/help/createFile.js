import fs from 'fs';

export default async function createFileForBackUp(backUp) {
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  const dataToWrite = typeof backUp === 'object' ? JSON.stringify(backUp, null, 2) : backUp;

  // Write data to a file
  try {
    fs.writeFileSync('newfile.json', dataToWrite);

    // set file in read only function for all
    //fs.chmodSync('newfile.json', '444');

    console.log('Data is saved.');
  } catch (err) {
    console.error('Error writing file', err);
  };
};