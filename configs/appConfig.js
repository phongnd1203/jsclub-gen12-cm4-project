const crypto = require("crypto");

const nodeEnv = process.env.NODE_ENV?.toLowerCase() || "development";
const isProduction = nodeEnv === "production";

const appConfig = () => ({
  app: {
    env: nodeEnv,
    isProduction,
    secret:
      process.env.APP_SECRET ||
      (isProduction
        ? undefined
        : crypto
            .generateKeySync("aes", { length: 256 })
            .export()
            .toString("base64url")),
    session: {
      secret:
        process.env.SESSION_SECRET ||
        process.env.APP_SECRET ||
        (isProduction
          ? undefined
          : crypto
              .generateKeySync("aes", { length: 256 })
              .export()
              .toString("base64url")),
    },
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
  jwt: {
    encryption: {
      useAsymmetric: parseInt(process.env.JWT_USE_ASYMMETRIC, 10) || 0,
      symmetric: {
        algorithm: process.env.JWT_SYMMETRIC_ALGORITHM || "HS256",
        secret:
          process.env.JWT_SYMMETRIC_SECRET ||
          process.env.APP_SECRET ||
          (isProduction
            ? undefined
            : crypto
                .generateKeySync("aes", { length: 256 })
                .export()
                .toString("base64url")),
      },
      asymmetric: {
        algorithm: process.env.JWT_ASYMMETRIC_ALGORITHM || "RS256",
        passphrase: process.env.JWT_ASYMMETRIC_PASSPHRASE,
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
    },
    options: {
      sign: {
        expiresIn: process.env.JWT_EXPIRES_IN || "10m",
        notBefore: process.env.JWT_NOT_BEFORE || "0s",
      },
      verify: {
        maxAge: process.env.JWT_MAX_AGE || "7d",
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
          process.env.SESSION_SECRET ||
          process.env.APP_SECRET ||
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
  nodemailer: {
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: parseInt(process.env.NODEMAILER_SECURE, 10) || 0,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  },
  google: {
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
    maps: {
      apiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
});
module.exports = { appConfig, config: appConfig() };
