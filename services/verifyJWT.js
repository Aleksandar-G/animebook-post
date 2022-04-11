const rabbitmq = require('./rabbitmq')


exports.modules = verifyJWT = rabbitmq.sendRPCRequest(channel, rpcMessage, rabbitmq.verifyQueue).then((verified) => {
    if (verified) {
        return true
    } else {
        return false
    }
})