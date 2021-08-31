// use the path of your model
const Post = require('../model/model_post');
const mongoose = require('mongoose');
const user = require('../model/model_user');

// use the new name of the database
const url = 'mongodb://localhost:27017/AnythingFinderTestDB';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});

// User SignUp
it('Test to register user', () => {
    const objUser = {
        'username': 'hello',
        'email': 'hello@gmail.com',
        'password': '123',
    };
    return user.create(objUser)
        .then((userData) => {
            expect(userData.username).toEqual('hello');
        });
});

// test('Test to login user', () => {
//     const customerlogin = {
//         'userName': "ujwal123",
//         'password': "123"
//     }
//     return axios({
//         method: 'post',
//         url: url + "/login",
//         customerlogin
//     })
//         .then(response => {
//             expect(response.success).toMatch(true)
//         })
//         .catch(err => { })
// })

// post route 
describe('Post Testing', () => {

    it('addPost', () => {
        const post = {
            'username': 'meezu2',
            'postCaption': 'This is a post',
            'latitude': '12345',
            'longitude': '12345',
            'contact': '9807654321'
        };
        return Post.create(post)
            .then((post) => {
                expect(post.username).toEqual('meezu2');
            });
    });

    // update
    it('Testing if post is being updated', async () => {
        return Post.findOneAndUpdate({ _id: Object('607e858bfab17111bc2569d3') },
            { $set: { postCaption: 'Hello' } })
            .then((postData) => {
                expect(postData.postCaption).toEqual('Hello')
            })
    });


    // delete
    it('Testing if post is being deleted', async () => {
        const status = await Post.deleteOne({ _id: Object('607e858bfab17111bc2569d3') });
        expect(status.ok).toBe(1);
    });
})