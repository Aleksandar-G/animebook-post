const rabbitmq = require("./rabbitmq");

const verifyJWT = (channel, rpcMessage) =>
  new Promise((resolve) => {
    rabbitmq
      .sendRPCRequest(channel, rpcMessage, rabbitmq.verifyQueue)
      .then((verified) => {
        const userData = JSON.parse(verified);
        resolve(userData);
      });
  });

exports.verifyJWT = verifyJWT;
