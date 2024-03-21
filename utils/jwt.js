const jwt = require("jsonwebtoken");

const { config } = require("../configs/appConfig.js");

let signingKey;
let verifyingKey;
let signingAlgorithm;

if (config.jwt.encryption.useAsymmetric) {
  if (!config.jwt.encryption.asymmetric.passphrase) {
    signingKey = {
      key: config.jwt.encryption.asymmetric.keyPair.privateKey,
      passphrase: config.jwt.encryption.asymmetric.passphrase,
    };
  } else {
    signingKey = config.jwt.encryption.asymmetric.keyPair.privateKey;
  }
  verifyingKey = config.jwt.encryption.asymmetric.keyPair.publicKey;
  signingAlgorithm = config.jwt.encryption.asymmetric.algorithm;
} else {
  signingKey = config.jwt.encryption.symmetric.secret;
  verifyingKey = config.jwt.encryption.symmetric.secret;
  signingAlgorithm = config.jwt.encryption.symmetric.algorithm;
}

const sign = (payload, options) => {
  return jwt.sign(payload, signingKey, {
    ...config.jwt.options.sign,
    ...options,
    algorithm: signingAlgorithm,
  });
};

const verify = (token) => {
  try {
    return jwt.verify(token, verifyingKey, {
      ...config.jwt.options.verify,
      algorithms: [signingAlgorithm],
    });
  } catch (error) {
    return null;
  }
};

module.exports = {
  sign,
  verify,
};
