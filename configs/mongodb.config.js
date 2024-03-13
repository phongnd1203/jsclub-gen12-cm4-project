const config = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      uri: process.env.MONGO_URI,
    };
  }

  return {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017",
  };
};

module.exports = config;
