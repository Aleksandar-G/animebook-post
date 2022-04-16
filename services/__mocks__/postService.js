const postService = jest.createMockFromModule("../postService");

const postPerUser = async (userId) => {
    return Promise.resolve([])
}

const createPost = async (userId,content) => {
    return Promise.resolve({})
}

postService.postPerUser = postPerUser
postService.createPost = createPost

module.exports = postService