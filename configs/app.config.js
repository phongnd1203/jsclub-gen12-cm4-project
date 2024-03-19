const crypto = require("crypto");

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || "development";
const isProduction = nodeEnv === "production";

const appConfig = () => ({
  app: {
    env: nodeEnv,
    session: {
      secret:
        process.env.SESSION_SECRET ||
        (isProduction
          ? undefined
          : crypto
              .generateKeySync("aes", { length: 256 })
              .export()
              .toString("base64url")),
    },
  },
  jwt: {
    encryption: {
      useAsymmetric: parseInt(process.env.JWT_USE_ASYMMETRIC, 10) || 0,
      symmetric: {
        algorithm: process.env.JWT_SYMMETRIC_ALGORITHM || "HS256",
        secret:
          process.env.JWT_SYMMETRIC_SECRET ||
          (isProduction
            ? undefined
            : crypto
                .generateKeySync("aes", { length: 256 })
                .export()
                .toString("base64url")),
      },
      asymmetric: {
        algorithm: process.env.JWT_ASYMMETRIC_ALGORITHM || "RS256",
        keyPair: (() => {
          const keyPair = {
            privateKey: process.env.JWT_ASYMMETRIC_PRIVATE_KEY,
            publicKey: process.env.JWT_ASYMMETRIC_PUBLIC_KEY,
          };

          if (keyPair.privateKey && keyPair.publicKey) {
            return keyPair;
          }

          if (isProduction) {
            return undefined;
          }

          return crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: { type: "spki", format: "pem" },
            privateKeyEncoding: { type: "pkcs8", format: "pem" },
          });
        })(),
      },
      options: {
        expiresIn: process.env.JWT_EXPIRES_IN || "10m",
        notBefore: process.env.JWT_NOT_BEFORE || "0s",
      },
    },
  },
  mongodb: {
    uri:
      process.env.MONGODB_URI ||
      (isProduction ? undefined : "mongodb://localhost:27017"),
    session: {
      storage: {
        secret:
          process.env.MONGODB_SESSION_STORAGE_SECRET ||
          (isProduction
            ? undefined
            : crypto
                .generateKeySync("aes", { length: 256 })
                .export()
                .toString("base64url")),
      },
    },
  },
  morgan: {
    format: process.env.MORGAN_FORMAT || (isProduction ? "combined" : "dev"),
  },
});

module.exports = {
  appConfig,
  config: appConfig(),
};
