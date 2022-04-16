const {postPerUser, createPost} = require('../services/postService')
const rabbitmq = require('../services/rabbitmq')
const { verifyJWT } = require('../services/verifyJWT')

let channel;

rabbitmq.rabbitMQChannel()
    .then((ch) => {
        channel = ch
    })


const getPostsPerUser = async (userId,rpcMessage) => {

    //const verified = await verifyJWT(channel,rpcMessage)
    const verified = true
        if (!verified) {
            throw new Error("not authenticated")
        }else{
            const posts = await postPerUser(userId)
            console.log(posts);
            return posts
        }


}

const savePost = async (userId, content, rpcMessage) => {

    //const verified = await verifyJWT(channel,rpcMessage)
    const verified = true

    if (!verified) {
        throw new Error("not authenticated")
    } else {
        
        if (!content) throw new Error("no content")
        console.log(userId);
        const created = await createPost(userId,content)

        return created
       
    }   
}

exports.savePost = savePost
exports.getPostsPerUser = getPostsPerUser

