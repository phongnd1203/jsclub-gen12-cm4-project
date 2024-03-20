const config = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      app: {
        env: "production",
      },
      logger: {
        morgan: {
          mode: "combined",
        },
      },
      session: {
        secret: process.env.APP_SESSION_SECRET,
        stores: {
          mongodb: {
            secret:
              process.env.MONGODB_SESSION_SECRET ||
              process.env.APP_SESSION_SECRET,
          },
        },
      },
    };
  }

  return {
    app: {
      env: process.env.NODE_ENV || "development",
    },
    logger: {
      morgan: {
        mode: "dev",
      },
    },
    session: {
      secret: process.env.APP_SESSION_SECRET,
      stores: {
        mongodb: {
          secret:
            process.env.MONGODB_SESSION_SECRET ||
            process.env.APP_SESSION_SECRET,
        },
      },
    },
  };
};

module.exports = config;
