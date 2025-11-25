const { listFiles, getFile } = require('../clients/externalClient.js');
const { parseCsvContent } = require('../utils/csvParser');

async function getFilesData(fileName) {
  const files = await listFiles();

  const targetFiles = fileName ? files.filter((f) => f === fileName) : files;

  const result = [];

  const promises = targetFiles.map(async (file) => {
    try {
      const csvContent = await getFile(file);
      const lines = parseCsvContent(csvContent);

      result.push({ file, lines });
    } catch (err) {
      console.error(`Error fetching file ${file}:`, err.message);
    }
  });

  await Promise.all(promises);

  return result;
}

async function getFilesList() {
  const files = await listFiles();
  return files;
}

module.exports = {
  getFilesData,
  getFilesList,
};
