const multer = require('multer');
const path = require('path');

module.exports = {
  uploadFile: multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== '.pdf' && ext !== '.docx' && ext !== '.txt') {
        cb(new Error('File Type not Supported'), false);
        return;
      }
      cb(null, true);
    }
  }),
  uploadImg: multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (
        ext !== '.png' &&
        ext !== '.jpg' &&
        ext !== '.jpeg' &&
        ext !== '.heic' &&
        ext !== '.HEIC'
      ) {
        cb(new Error('File Type not Supported'), false);
        return;
      }
      cb(null, true);
    }
  })
};
