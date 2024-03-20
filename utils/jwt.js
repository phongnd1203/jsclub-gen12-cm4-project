const jwt = require("jsonwebtoken");

const { config } = require("../configs/app.config.js");

const sign = (payload, options) => {
  let signingKey;
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
    signingAlgorithm = config.jwt.encryption.asymmetric.algorithm;
  } else {
    signingKey = config.jwt.encryption.symmetric.secret;
    signingAlgorithm = config.jwt.encryption.symmetric.algorithm;
  }

  return jwt.sign(payload, signingKey, {
    algorithm: signingAlgorithm,
    ...config.jwt.options,
    ...options,
  });
};

const verify = (token, options) => {
  let verifyingKey;
  let verifyingAlgorithm;

  if (config.jwt.encryption.useAsymmetric) {
    verifyingKey = config.jwt.encryption.asymmetric.keyPair.publicKey;
    verifyingAlgorithm = config.jwt.encryption.asymmetric.algorithm;
  } else {
    verifyingKey = config.jwt.encryption.symmetric.secret;
    verifyingAlgorithm = config.jwt.encryption.symmetric.algorithm;
  }

  return jwt.verify(token, verifyingKey, {
    algorithm: verifyingAlgorithm,
    ...config.jwt.options,
    ...options,
  });
};

module.exports = {
  sign,
  verify,
};
