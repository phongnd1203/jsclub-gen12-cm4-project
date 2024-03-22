const path = require("path");

const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");

const FileModel = require("../../models/files/file.js");
const storage = require("../../libs/firebase/storage.js");

const uploadFile = async (file) => {
  const { originalname, mimetype, size, buffer } = file;

  const today = new Date();

  const filename = `${originalname}-${today.getTime()}`;

  const filePath = path.join(
    today.getFullYear().toString(),
    today.getMonth().toString(),
    today.getDate().toString(),
    filename,
  );

  const fileRef = ref(storage, filePath);

  const fileDocument = new FileModel({
    filename,
    originalname,
    path: filePath,
    mimetype,
    size,
  });

  await uploadBytesResumable(fileRef, buffer).on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);

      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }

      if (snapshot.totalBytes === snapshot.bytesTransferred) {
        console.log("Upload is complete");
        Promise.resolve(
          getDownloadURL(fileRef).then((url) => {
            fileDocument.url = url;
            fileDocument.save();
          }),
        );
      }
    },
  );

  return fileDocument;
};

const uploadFiles = async (files) => {
  const uploadedFiles = await Promise.all(
    files.map(async (file) => await uploadFile(file)),
  );

  return uploadedFiles;
};

module.exports = {
  uploadFile,
  uploadFiles,
};
