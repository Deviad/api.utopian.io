import * as faker from "Faker";
import * as mongoose from "mongoose";
import { UserSchema, PostSchema } from "../server/models";
import * as R from "ramda";
const Admin = mongoose.mongo.Admin;

const counter = 3000;

const handleError = err => {
    console.log("ERROR", err);
};
type CallbackFunction = () => any;

let promise = new Promise(
    (resolve: CallbackFunction, reject?: CallbackFunction) => {
        resolve();
    }
);
const DBURL = 'mongodb://localhost/utopian-test';
const connection = mongoose.connect(DBURL);

const createUsers = () => {
    const User = mongoose.model("User", UserSchema);
    for (let i = 1; i <= counter; i++) {
        const email = faker.Internet.email();
        const account = Math.floor(Math.random()*1000);
        const userObject = {
            account: i + "",
            email
        };
        User.create({account: i +'', email}, function(err, small) {
            if (err) return handleError(err);
        });
    }
};

promise
    .then(() => createUsers())
    .catch(err => err);
