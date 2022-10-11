const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  uploadFile: multer({
    storage: multer.diskStorage({
      filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
          if (err) return cb(err);

          cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
      }
    }),
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
