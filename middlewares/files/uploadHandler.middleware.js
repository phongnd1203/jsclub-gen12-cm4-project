const path = require("path");

const multer = require("multer");

const uploadHandler = (
  destination = "uploads/",
  limits = {
    files: 1,
    fileSize: 1024 * 1024 * 5,
  },
) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, destination);
      },
      filename: (req, file, cb) => {
        const fileParsed = path.parse(file.originalname);
        const fileName = `${fileParsed.name}-${Date.now()}${fileParsed.ext}`;
        cb(null, fileName);
      },
    }),
    limits: limits,
  });

  return upload;
};

module.exports = uploadHandler;
