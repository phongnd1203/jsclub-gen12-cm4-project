const { ref, deleteObject } = require("firebase/storage");

const FileModel = require("../../models/files/file.js");
const storage = require("../../libs/firebase/storage.js");

const deleteFile = async (fileId) => {
  const fileDocument = await FileModel.findById(fileId).exec();

  const fileRef = ref(storage).child(fileDocument.path);

  await deleteObject(fileRef).catch((error) => {
    throw new Error(error);
  });

  await FileModel.findByIdAndDelete(fileId).exec();

  return;
};

const deleteFiles = async (fileIds) => {
  for (const fileId of fileIds) {
    await deleteFile(fileId);
  }

  return;
};

module.exports = {
  deleteFile,
  deleteFiles,
};
