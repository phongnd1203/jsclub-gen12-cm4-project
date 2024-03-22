const path = require("path");
const fs = require("fs");

const multer = require("multer");

const defaultOptions = {
  destination: "uploads/",
  limits: {
    extensions: [],
    size: 1024 * 1024 * 5,
  },
};

const fileHandler = (options = defaultOptions) => {
  const memoryStorage = multer.memoryStorage();

  const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = path.join(
        process.cwd(),
        options.destination,
        file.fieldname,
      );

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const fileName = `${file.originalname}-${Date.now()}${fileExtension}`;
      cb(null, fileName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (!options.limits.extensions.length) {
      return cb(null, true);
    }

    const fileExtension = path.extname(file.originalname).slice(1);
    if (!options.limits.extensions.includes(fileExtension)) {
      return cb(new Error("File extension is not allowed"));
    }
    cb(null, true);
  };

  const limits = {
    fileSize: options.limits.size,
  };

  const upload = multer({ memoryStorage, fileFilter, limits });

  return upload;
};

module.exports = fileHandler;
