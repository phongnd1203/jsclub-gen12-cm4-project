const { ref, getDownloadURL } = require("firebase/storage");

const FileModel = require("../../models/files/file.js");
const storage = require("../../libs/firebase/storage.js");

const defaultOptions = {
  limit: 30,
  page: 1,
  sort: { createdAt: -1 },
};

const getFileDocuments = async (options = defaultOptions) => {
  const _options = { ...defaultOptions, ...options };

  const limit = Math.min(30, Math.max(0, _options.limit));
  const skip = (Math.max(1, _options.page) - 1) * limit;

  const fileDocuments = FileModel.find()
    .skip(skip)
    .limit(limit)
    .sort(_options.sort)
    .exec();

  return fileDocuments;
};

const getFiles = async (_options = defaultOptions) => {
  const fileDocuments = await getFileDocuments(_options);

  const promises = fileDocuments.map(async (fileDocument) => {
    const fileRef = ref(storage, fileDocument.path);

    try {
      fileDocument.url = await getDownloadURL(fileRef);
    } catch (error) {
      throw new Error(error);
    }
  });

  await Promise.all(promises);

  return fileDocuments;
};

const getFileDocument = async (fileId) => {
  const fileDocument = await FileModel.findById(fileId).exec();

  const fileRef = ref(storage).child(fileDocument.path);

  try {
    fileDocument.url = await getDownloadURL(fileRef);
    return fileDocument;
  } catch (error) {
    throw new Error(error);
  }
};

const getFile = async (fileId) => {
  const fileDocument = await getFileDocument(fileId);

  const fileRef = ref(storage, fileDocument.path);

  try {
    const downloadUrl = await getDownloadURL(fileRef);
    fileDocument.url = downloadUrl;
  } catch (error) {
    throw new Error(error);
  }

  return fileDocument;
};

const getFileUrl = async (fileId) => {
  const fileDocument = await getFileDocument(fileId);

  const fileRef = ref(storage, fileDocument.path);

  const downloadUrl = await getDownloadURL(fileRef).catch((error) => {
    throw new Error(error);
  });

  return downloadUrl;
};

module.exports = {
  getFileDocument,
  getFileDocuments,
  getFiles,
  getFile,
  getFileUrl,
};
