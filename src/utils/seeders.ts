import Faker from "Faker";
import * as mongoose from "mongoose";
import { UserSchema, PostSchema } from "../server/models";
import config from "../config/config";
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

const connection = mongoose.createConnection(config.mongo);

const dbExists = (connection, dbName) => {
     connection.on("open", function() {
        // connection established
         new Admin(connection.db).listDatabases(function(err, result) {
            console.log("listDatabases succeeded");
            // database list stored in result.databases
            
            const dbNames = R.pluck('name')(result.databases);
    
            if (dbNames.indexOf(dbName) === -1) {
                
            }
        });
    });
};

const createUsers = () => {
    const User = mongoose.model("User", UserSchema);
    for (let i = 1; i++; i === counter) {
        const email = Faker.Internet.email;
        const userObject = {
            account: { type: "Whatever" },
            email
        };
        User.create({ size: "small" }, function(err, small) {
            if (err) return handleError(err);
            // saved!
        });
    }
};

promise
    .then(() => dbExists(connection, "utopian-io"))
    .then(list => console.log("whatever", list))
    .catch(err => err);
