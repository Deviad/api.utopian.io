import * as faker from "Faker";
import * as mongoose from "mongoose";
import { UserSchema, PostSchema } from "../server/models";
import * as R from "ramda";
const Admin = mongoose.mongo.Admin;

const counter = 10;

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
const createUsers = () => {
    const User = mongoose.model("User", UserSchema);


    const UserBag = [...Array(counter)].map((_, i) => {
        const email = faker.Internet.email();
        let account = Math.floor(Math.random() * 1000);
        return {
            account: String(account),
            email
        };
    });
    return promise
    .then(() => User.insertMany(UserBag))
    .then((docs)=>console.log(`${docs.length} users were successfully stored.`))
    .catch((err) => {throw `User.insertMany generated an error ${err.message}`});
};

promise
    .then(() => createUsers())
    .then(msg => console.log(msg))
    .catch(err => console.log("shitHappens"));
