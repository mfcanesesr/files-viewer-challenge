const fileService = require('../services/fileService');

async function getFilesData(req, res, next) {
  try {
    const { fileName } = req.query;
    const data = await fileService.getFilesData(fileName);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getFilesList(_req, res, next) {
  try {
    const files = await fileService.getFilesList();
    res.json({ files });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getFilesData,
  getFilesList,
};
