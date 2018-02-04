import * as faker from "Faker";
import * as mongoose from "mongoose";
import { UserSchema, PostSchema } from "../server/models";
import * as R from "ramda";
const Admin = mongoose.mongo.Admin;

const counter = 3000;

const handleError = err => {
    throw `${err.message}`;
};
type CallbackFunction = () => any;

let promise = new Promise(
    (resolve: CallbackFunction, reject?: CallbackFunction) => {
        resolve();
    }
);
const DBURL = "mongodb://localhost/utopian-test";
const connection = mongoose.connect(DBURL);
mongoose.Promise = global.Promise;

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);


const generateUsers = () => {
    return [...Array(counter)].map((_, i) => {
        const email = faker.Internet.email();
        let account = Math.floor(Math.random() * 1000);
        return {
            account: String(account),
            email
        };
    });
};

const addUsers = () => 
 User.insertMany(generateUsers())
    .then(docs => console.log(`${docs.length} users were successfully stored.`))
    .catch(err => {
        throw `User.insertMany generated an error \n>>>\n>>> ${err.message}\n>>>`;
    })

promise
    .then(() => addUsers())
    .catch((err)=>console.error(err));
