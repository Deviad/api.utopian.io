import * as faker from "Faker";
import * as mongoose from "mongoose";
import { UserSchema, PostSchema } from "../server/models";

const counter = 500;

type CallbackFunction = (...args) => any;

let promise = new Promise(
    (resolve: CallbackFunction, reject?: CallbackFunction) => {
        resolve();
    }
);
const DBURL = "mongodb://localhost/utopian-test";
const connection = mongoose.connect(DBURL);
// mongoose.Promise = global.Promise;

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);

const generateUsers = () => {
    return [...Array(counter)].map((_, i) => {
        const email = faker.Internet.email();
        let account =
            faker.Internet.userName() +
            String(Math.floor(Math.random() * 10000));
        account = account.replace(/[^a-zA-Z0-9]/g, "");
        return {
            account,
            email
        };
    });
};

let postsAdded = 0;

const addPosts = arr =>
    Post.insertMany(arr)
        .then(docs => {
            postsAdded = postsAdded + docs.length;
            if(postsAdded = counter) {
                console.log(`${postsAdded} posts were successfully stored.`)
                process.exit(0);
            };    
        })
        .catch(err => {
            throw `Post.insertMany generated an error \n>>>\n>>> ${err.message}\n>>>`;
        });

const handlePosts = () => {
    let postArray = Array();
    return User.count({})
        .then(count =>
            [...Array(counter)].map((_, index) => {
                const authorObject = User.findOne().skip(index);
                const title = faker.Lorem.sentence();
                const body = faker.Lorem.sentences();
                if (index !== counter) {
                    authorObject
                        .then(res => {
                            return {
                                id: index + 1,
                                author: res.account,
                                title,
                                body
                            };
                        })
                        .then(res => (postArray[index] = res))
                        .then(arr => addPosts(arr))
                        .catch(err => {
                            throw `authorObject generated an error \n>>>\n>>> ${err.message}\n>>>`;
                        });
                } else {
                    return;
                }
            })
        )
        .catch(err => console.error("error is ", err));
};
const addUsers = () =>
    User.insertMany(generateUsers())
        .then(docs =>
            console.log(`${docs.length} users were successfully stored.`)
        )
        .catch(err => {
            throw `User.insertMany generated an error \n>>>\n>>> ${
                err.message
            }\n>>>`;
        });

promise
    .then(() => addUsers())
    .then(() => handlePosts())
    .catch(err => console.error(err));
