const config = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      uri: process.env.MONGO_URI,
      session: {
        storage: {
          secret:
            process.env.MONGODB_SESSION_SECRET ||
            process.env.APP_SESSION_SECRET,
        },
      },
    };
  }

  return {
    uri: process.env.MONGO_URI || "mongodb://localhost:27017",
    session: {
      storage: {
        secret:
          process.env.MONGODB_SESSION_SECRET || process.env.APP_SESSION_SECRET,
      },
    },
  };
};

module.exports = config;
