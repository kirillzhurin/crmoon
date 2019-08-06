const multer = require('multer');
const format = require('date-fns/format');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const date = format(new Date(), 'DDMMYYYY-HHmmss_SSS');
    cb(null, `${date}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (mimetype === 'image/png' || mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5
}

module.exports = multer({ storage, fileFilter, limits});