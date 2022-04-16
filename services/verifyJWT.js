const rabbitmq = require('./rabbitmq')


const verifyJWT = (channel,rpcMessage) => {
    rabbitmq.sendRPCRequest(channel, rpcMessage, rabbitmq.verifyQueue).then((verified) => {
        if (verified) {
            return true
        } else {
            return false
        }
    })
}

exports.modules = verifyJWT