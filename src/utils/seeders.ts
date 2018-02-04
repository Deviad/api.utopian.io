import * as faker from "Faker";
import * as mongoose from "mongoose";
import { User, Post } from "../server/models";

const counter = 500;

type CallbackFunction = (...args) => any;


const DBURL = "mongodb://localhost/utopian-test";
const connection = mongoose.connect(DBURL);
// mongoose.Promise = global.Promise;

const generateUsers = () => {
    let usersArray = Array();
    for(let index=1; index<= counter; index++) {
        const email = faker.Internet.email();
        let account =
            faker.Internet.userName() +
            String(Math.floor(Math.random() * 10000));
        account = account.replace(/[^a-zA-Z0-9]/g, "");
        usersArray[index] = {account,email};
    }
    return usersArray;
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
        .then(count => {
            for(let index=1; index<= count; index++) {
                const authorObject = User.findOne().skip(index);
                const title = faker.Lorem.sentence();
                const body = faker.Lorem.sentences();
                if (index !== counter) {
                    authorObject
                        .then(res => {
                            return {
                                id: index,
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
            }})
        .catch(err => console.error("error is ", err));
};
const addUsers = () =>
    User.insertMany(generateUsers())
        .then(docs =>
            console.log(`${docs.length} users were successfully stored.`)
        )
        .catch(err => {
            throw `User.insertMany generated an error \n>>>\n>>> ${err.message}\n>>>`;
        });


new Promise((resolve: CallbackFunction) => resolve())
    .then(() => addUsers())
    .then(() => handlePosts())
    .catch(err => console.error(err));
