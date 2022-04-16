jest.mock('../services/postService')

const postService = require('../services/postService')


describe("post actions", () => {

    test("create a post", async() => {

        const res = await postService.createPost(1,"test_content");

        expect(res).toStrictEqual({})

    })

    test("get post per user", async() => {

        const res = await postService.postPerUser(1)

        expect(res).toStrictEqual([])

    })
})