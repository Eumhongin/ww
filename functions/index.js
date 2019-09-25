const functions = require('firebase-functions');

const express = require('express');
const firebase = require("firebase-admin");


var serviceAccount = require("./workflow-9e1eb-firebase-adminsdk-6sht8-9081c58c39.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://workflow-9e1eb.firebaseio.com"
});

const db = firebase.firestore();
const Auth = firebase.auth()
// console.log(Auth)
const app = express();

// console.log(__dirname)
app.use('/views', express.static(__dirname + '/js/views'))
app.use('/common', express.static(__dirname + '/js/data'))
app.use('/img', express.static(__dirname + '/img'))

// const router = express.Router()


exports.api = functions.https.onRequest(app);
